import React, { useState, useEffect, useCallback } from 'react';
import bridge from '@vkontakte/vk-bridge';
// import bridge from '@vkontakte/vk-bridge-mock';

import '@vkontakte/vkui/dist/vkui.css';

import {
	Epic, Tabbar, TabbarItem,
	ScreenSpinner, Root,
} from "@vkontakte/vkui/dist";

import Main from "./views/Main";
import WhatIsKBM from "./views/WhatIsKBM";
import Osago from "./views/Osago";
import History from "./views/History";
import Profile from "./views/Profile";

import Icon28NewsfeedOutline from "@vkontakte/icons/dist/28/newsfeed_outline";
import Icon28ServicesOutline from "@vkontakte/icons/dist/28/services_outline";
import Icon28MessageOutline from "@vkontakte/icons/dist/28/message_outline";
import Icon28ClipOutline from "@vkontakte/icons/dist/28/clip_outline";
import Icon28UserCircleOutline from "@vkontakte/icons/dist/28/user_circle_outline";



const ROUTES = {
	main: "main",
	whatIsKBM: "whatIsKBM",
	osago: "osago",
	history: "history",
	profile: "profile"
};

const PAID_KEYS = {
	discoverKBM: false,
	restoreKBM: false,
	transferKBM: false,
	result: false
}



const App = () => {
	const [ activeView, setActiveView ] = useState(null);
	const [ fetchedUser, setFetchedUser ] = useState({});
	const [ popout, setPopout ] = useState(<ScreenSpinner size='large' />);
	const [responses, setResponses] = useState({});
	const [fetchedData, setFetchedData] = useState([])

	const [successURL, setSuccessURL] = useState(null)
	const [hasHash, setHasHash] = useState(PAID_KEYS);

	useEffect(() => {
		function hasURLHash() {
			let url = new URL(window.location.href)
			if (url.hash) {
				switch (url.hash) {
					case "#discoverKBM":
						setHasHash({...hasHash, discoverKBM: true })
						break;
					case "#restoreKBM":
						setHasHash({...hasHash, restoreKBM: true })
						break;
					case "#transferKBM":
						setHasHash({...hasHash, transferKBM: true })
						break;
				}
				url.hash = "";
				setActiveView(ROUTES.whatIsKBM)
			} else {
				return setHasHash({...hasHash, result: false});
			}
			return setHasHash({...hasHash, result: true});
		}

		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});

		async function fetchData() {
			await bridge.send('VKWebAppGetUserInfo').then(user => {
				setFetchedUser(user)
				setPopout(null);
				goPanel(ROUTES.main);
			})
		}
		fetchData().then(() => {
			hasURLHash()
		})

	}, []);



	const goPanel = useCallback((view) => {
		setActiveView(view)
	}, [activeView])



	return (
		<Root activeView="epic" popout={popout}>
			<Epic id="epic" activeStory={activeView} tabbar={
				<Tabbar itemsLayout="vertical">
					<TabbarItem
						onClick={() => goPanel(ROUTES.main)}
						selected={activeView === ROUTES.main}
						data-story={ROUTES.main}
						text="Главная"
					><Icon28NewsfeedOutline /></TabbarItem>
					<TabbarItem
						onClick={() => goPanel(ROUTES.whatIsKBM)}
						selected={activeView === ROUTES.whatIsKBM}
						data-story={ROUTES.whatIsKBM}
						text="Услуги"
					><Icon28ServicesOutline/></TabbarItem>
					<TabbarItem
						onClick={() => goPanel(ROUTES.osago)}
						selected={activeView === ROUTES.osago}
						data-story={ROUTES.osago}
						text="ОСАГО"
					><Icon28MessageOutline /></TabbarItem>
					<TabbarItem
						onClick={() => goPanel(ROUTES.history)}
						selected={activeView === ROUTES.history}
						data-story={ROUTES.history}
						label="2"
						text="История"
					><Icon28ClipOutline /></TabbarItem>
					<TabbarItem
						onClick={() => goPanel(ROUTES.profile)}
						selected={activeView === ROUTES.profile}
						data-story={ROUTES.profile}
						text="Профиль"
					><Icon28UserCircleOutline /></TabbarItem>
				</Tabbar>
			}>
			<Main id={ROUTES.main} fetchedUser={fetchedUser}/>
			<WhatIsKBM id={ROUTES.whatIsKBM} res={responses} setRes={setResponses} fetchedData={fetchedData} setFetchedData={setFetchedData} hasHash={hasHash} successURL={successURL} setSuccessURL ={setSuccessURL}/>
			<Osago id={ROUTES.osago} actViw={activeView} />
			<History id={ROUTES.history} fetchedData={fetchedData} />
			<Profile id={ROUTES.profile} fetchedUser={fetchedUser} setFetchedUser={setFetchedUser} />
		</Epic>
	</Root>
	)
}




export default App;


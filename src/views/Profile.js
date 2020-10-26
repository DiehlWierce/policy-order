import React, {useState} from "react";
import '@vkontakte/vkui/dist/vkui.css';

import {
    View, Group,
    Panel, PanelHeader,
    Header,
    Cell, InfoRow,
    SimpleCell, Switch, PopoutWrapper, Input, FormLayout, Button, CardGrid, Card
} from "@vkontakte/vkui";


import Icon28UserOutline from "@vkontakte/icons/dist/28/user_outline";
import Icon28Users3Outline from "@vkontakte/icons/dist/28/users_3_outline";
import Icon24Camera from "@vkontakte/icons/dist/24/camera";
import bridge from "@vkontakte/vk-bridge";
// import bridge from "@vkontakte/vk-bridge-mock";


const Profile = ({ id, fetchedUser, setFetchedUser }) => {

    const [popout, setPopout] = useState(null)


    async function notifsInit(e) {
        if (e.target.checked) {
            await bridge.send("VKWebAppDenyNotifications").then(res => {
                if (res.hasOwnProperty('result')) {
                    e.target.removeAttribute('defaultChecked');
                }
            })
        }else{
            await bridge.send("VKWebAppAllowNotifications").then(res => {
                if (res.hasOwnProperty('result')) {
                    e.target.setAttribute('defaultChecked');
                }
            })
        }
    }

    function inputGetter(event) {
        setFetchedUser({...fetchedUser, phone_number: event.target.value})
    }

    function submit() {
        setPopout(null)
    }

    const goPopout = () => {
        setPopout(
            <PopoutWrapper alignY="center" alignX="center">
                <Group separator="hide">
                    <CardGrid>
                        <Card size="l" mode="shadow">
                            <FormLayout onSubmit={submit}>
                                <Input
                                    top="Введите новый номер телефона"
                                    name="regNumber"
                                    onChange={inputGetter}
                                />
                                <Button before={<Icon24Camera/>} size="l">Сохранить</Button>
                            </FormLayout>
                        </Card>
                    </CardGrid>
                </Group>
            </PopoutWrapper>
        )
    }

    return (
        <View id={id} activePanel={id} popout={popout}>
            <Panel id={id}>
                <PanelHeader>
                    Профиль
                </PanelHeader>
                <Group>
                    <Header mode="secondary">Информация о пользователе</Header>
                    <Cell before={<Icon28UserOutline />}>
                        <SimpleCell multiline >
                            <InfoRow header="Ваше имя и фамилия">
                                {fetchedUser.first_name} {fetchedUser.last_name}
                            </InfoRow>
                        </SimpleCell>
                    </Cell>
                    <Cell expandable before={<Icon28Users3Outline />} onClick={() => goPopout()}>
                        <SimpleCell>
                            <InfoRow header="Телефон">
                                {fetchedUser.phone_number}
                            </InfoRow>
                        </SimpleCell>
                    </Cell>
                    <Cell>
                        <SimpleCell after={<Switch onClick={notifsInit} />}> Разрешить уведомления </SimpleCell>
                    </Cell>
                </Group>
            </Panel>
        </View>
    )
}

export default Profile;
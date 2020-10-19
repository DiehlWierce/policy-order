import {View, Panel, PanelHeader, Group, Header, Gallery, Separator} from "@vkontakte/vkui";
import React from "react";


const Main = ({ id, fetchedUser }) => {

    return (
        <View id={id} activePanel="hello">
            <Panel id="hello">
                <PanelHeader>
                    Hello, {fetchedUser.first_name}!
                </PanelHeader>
                <Separator/>
                <Group header={<Header mode="secondary">Новости</Header>}>
                    <Gallery
                        slideWidth="100%"
                        style={{ height: 150 }}
                        bullets="dark"
                    >
                        <div>
                            <h1>Новость #1</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Ab consectetur cumque earum incidunt ipsum nobis pariatur,
                                rerum tenetur! Aliquid aperiam consequatur consequuntur dolore,
                                dolorum earum ipsum necessitatibus quas rem temporibus.
                            </p>
                        </div>
                        <div>
                            <h1>Новость #2</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Ab consectetur cumque earum incidunt ipsum nobis pariatur,
                                rerum tenetur! Aliquid aperiam consequatur consequuntur dolore,
                                dolorum earum ipsum necessitatibus quas rem temporibus.
                            </p>
                        </div>
                        <div>
                            <h1>Новость #3</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Ab consectetur cumque earum incidunt ipsum nobis pariatur,
                                rerum tenetur! Aliquid aperiam consequatur consequuntur dolore,
                                dolorum earum ipsum necessitatibus quas rem temporibus.
                            </p>
                        </div>
                    </Gallery>
                </Group>
                <Group header={<Header mode="secondary">Что такое ОСАГО?</Header>}>
                    <Gallery
                        slideWidth="90%"
                        style={{ height: 150 }}
                        bullets="dark"
                    >
                        <div style={{ backgroundColor: 'var(--destructive)' }} />
                        <div style={{ backgroundColor: 'var(--button_commerce_background)' }} />
                        <div style={{ backgroundColor: 'var(--accent)' }} />
                    </Gallery>
                </Group>
                <Group header={<Header mode="secondary">Что такое Коэффицент бонус-малус (КБМ)?</Header>}>
                    <Gallery
                        slideWidth="90%"
                        style={{ height: 150 }}
                        bullets="dark"
                    >
                        <div style={{ backgroundColor: 'var(--destructive)' }} />
                        <div style={{ backgroundColor: 'var(--button_commerce_background)' }} />
                        <div style={{ backgroundColor: 'var(--accent)' }} />
                    </Gallery>
                </Group>
            </Panel>
        </View>
    )
}

export default React.memo(Main);
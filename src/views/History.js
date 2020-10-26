import React from "react";
import {
    View,
    Panel,
    PanelHeader,
    Group,
    CardGrid, Card,
    PopoutWrapper
} from "@vkontakte/vkui";


const History = ({ id, fetchedData }) => {

    return (
        <View id={id} activePanel="requests">
            <Panel id="requests">
                <PanelHeader separator={true}>
                    История заявок
                </PanelHeader>
                <PopoutWrapper alignY="center" alignX="center">
                    <Group separator="hide">
                        <CardGrid>
                            {Object.keys(fetchedData).map(item => (
                                <Card size="l" mode="shadow">
                                    {Object.keys(fetchedData[item]).map( key => (
                                        <p>{key}: {fetchedData[item][key]}</p>
                                    ))}
                                </Card>
                            ))}
                        </CardGrid>
                    </Group>
                </PopoutWrapper>
            </Panel>
        </View>
    )
}

export default History;
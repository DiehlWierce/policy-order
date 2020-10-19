import React from "react";
import {
    View,
    Panel,
    PanelHeader,
    Group,
    CardGrid, Card,
    PopoutWrapper
} from "@vkontakte/vkui";


const History = ({ id }) => {
    return (
        <View id={id} activePanel="requests">
            <Panel id="requests">
                <PanelHeader separator={true}>
                    История заявок
                </PanelHeader>
                <PopoutWrapper alignY="center" alignX="center">
                    <Group separator="hide">
                        <CardGrid>
                            <Card size="l" mode="shadow">
                                <div style={{ height: 100 }}>Первая заявка</div>
                            </Card>
                            <Card size="l" mode="shadow">
                                <div style={{ height: 100 }}>Вторая заявка</div>
                            </Card>
                        </CardGrid>
                    </Group>
                </PopoutWrapper>
            </Panel>
        </View>
    )
}

export default History;
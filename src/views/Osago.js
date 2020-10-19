import {
    View,
    Panel,
    PanelHeader
} from "@vkontakte/vkui";
import React from "react";
import "../cdn/calc_style.css"

const Osago = ({ id }) => {
    const script = document.createElement('script');
    script.src = '../cdn/frame_calc.js';
    script.type = "text/javascript";
    script.id = "osago_script";
    document.body.appendChild(script);


    return (
        <View id={id} activePanel="calc">
            <Panel id="calc">
                <PanelHeader>Оформление ОСАГО</PanelHeader>
                    <div id="frame-calculator_wrap"
                         data-id="a2d4e3ca4ca10f07f5a24989c996e30d"
                         data-static="true"
                         data-type="OSAGO"
                         data-order="true"
                         data-one="true">
                        <iframe frameBorder="0" width="100%" id="frame-calculator"
                                src="https://partners.inguru.ru/calc_iframe" name="frameCalculator"
                                scrolling="yes">
                        </iframe>
                    </div>
            </Panel>
        </View>
    )
}

export default Osago;
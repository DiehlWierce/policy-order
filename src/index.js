import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
// import bridge from "@vkontakte/vk-bridge-mock";
import App from "./App";

// Init VK  Mini App
async function Init () {
    await bridge.send("VKWebAppInit");
}
Init()


ReactDOM.render(<App />, document.getElementById("root"));
// if (process.env.NODE_ENV === "development") {
//   import("./eruda").then(({ default: eruda }) => {}); //runtime download
// }

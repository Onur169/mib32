let devServer = 'https://localhost:3000/dist';
let liveServer = 'https://github.com/Onur169/mib32/raw/main/userscripts/dist';

function isDevModeOn() {
    return localStorage.getItem("mib32_is_dev_mode_on") == "true";
}

function injectScript(server, scriptName) {

    console.log("Inject-Infos!!!!!", server, scriptName);

    var jsTag = document.createElement('script');
    jsTag.type = "text/javascript";
    jsTag.src = `${server}/${scriptName}.js`;

    document.getElementsByTagName('head')[0].appendChild(jsTag);

}

// ==UserScript==
// @name         klima-streik.org (social)
// @namespace    https://www.klima-streik.org/social
// @version      0.1
// @description  try to take over the world!
// @author       Onur Sahin, Christian Knoth, Dustin Bastke, Anna Glomb, Stefanie Roddeck
// @match        https://www.klima-streik.org/*
// @grant        none
// ==/UserScript==

let server = isDevModeOn() ? devServer : liveServer;
let scriptName = 'web-and-development-1.user';

console.log("Tach ihr Luschen!!!");
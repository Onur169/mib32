// ==UserScript==
// @name         klima-streik.org/
// @namespace    https://www.klima-streik.org/
// @version      0.1
// @description  try to take over the world!
// @author       Onur Sahin, Christian Knoth, Dustin Bastke, Anna Glomb, Stefanie Roddeck
// @match        https://www.klima-streik.org/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let devServer = 'https://localhost:9001';
    let liveServer = 'https://github.com/Onur169/mib32/raw/main/userscripts/dist';
    
    let devScriptName = 'web-and-development-1';
    let liveScriptName = devScriptName + '.user.';

    function isLocalhost() {
        return location.hostname === "localhost" || location.hostname === "127.0.0.1";
    }

    function injectScript() {

        let server = isLocalhost() ? devServer : liveServer;
        let scriptName = isLocalhost() ? devScriptName : liveScriptName;

        console.log("Inject-Infos", server, scriptName);

        var jsTag = document.createElement('script');
        jsTag.type = "text/javascript";
        jsTag.src = `${server}/${scriptName}.js`;

        document.getElementsByTagName('head')[0].appendChild(jsTag);


    }

    function init() {
        injectScript();
    }

    init();

})();
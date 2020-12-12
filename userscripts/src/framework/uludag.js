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
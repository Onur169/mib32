class Uludag {

    constructor() {
        this.devServer = 'https://localhost:3000/dist';
        this.liveServer = 'https://github.com/Onur169/mib32/raw/main/userscripts/dist';
    }

    info() {
        console.info(this.devServer, this.liveServer);
    }

    isDevModeOn() {
        return localStorage.getItem("mib32_is_dev_mode_on") == "true";
    }
    
    injectScript(server, scriptName) {
    
        var jsTag = document.createElement('script');
        jsTag.type = "text/javascript";
        jsTag.src = `${server}/${scriptName}.js`;
    
        document.getElementsByTagName('head')[0].appendChild(jsTag);
    
    }

}
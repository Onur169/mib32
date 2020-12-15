class Uludag {

    constructor() {
        this.devServer = 'https://localhost:3000/dist';
        this.liveServer = 'https://github.com/Onur169/mib32/raw/main/userscripts/dist';
        this.storageKey = 'uludag_';
    }

    info() {
        console.info(this.devServer, this.liveServer);
    }

    isDevModeOn() {
        return localStorage.getItem(this.storageKey + "is_dev_mode_on") == "true";
    }

    injectScript(server, scriptName) {

        let jsTag = document.createElement('script');
        jsTag.type = "text/javascript";
        jsTag.src = `${server}/${scriptName}.js`;

        document.getElementsByTagName('head')[0].appendChild(jsTag);

    }

    capitalizeWord(s) {
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    getCookie(name) {
        return JSON.parse(localStorage.getItem(this.storageKey + name));
    }

    setCookie(name, _val) {

        let valObj = {
            val: _val,
            created_at: new Date()
        };

        localStorage.setItem(this.storageKey + name, JSON.stringify(valObj));

    }

    elem(waitFor, callback, timeout, self, time) {

        var _self = this || self,
            _time = time || Date.now(),
            _status = false,
            _result;

        if (Date.now() - _time > 10000) {

            callback(false);

            return false;
        }

        if (typeof waitFor === "string") {

            _result = document.querySelectorAll(waitFor);
            _status = _result.length > 0;
            
        } else {

            _result = waitFor() || false;
            _status = !!_result;
        }

        return _status === true ? callback(_result) : setTimeout(_self.elem.bind(null, waitFor, callback, timeout, _self, _time), timeout || 20);

    }


}
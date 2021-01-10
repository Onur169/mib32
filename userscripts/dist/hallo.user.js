"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Uludag = /*#__PURE__*/function () {
  function Uludag() {
    _classCallCheck(this, Uludag);

    this.devServer = 'https://localhost:3000/dist';
    this.liveServer = 'https://github.com/Onur169/mib32/raw/main/userscripts/dist';
    this.storageKey = 'uludag_';
  }

  _createClass(Uludag, [{
    key: "info",
    value: function info() {
      console.info(this.devServer, this.liveServer);
    }
  }, {
    key: "isDevModeOn",
    value: function isDevModeOn() {
      return localStorage.getItem(this.storageKey + "is_dev_mode_on") == "true";
    }
  }, {
    key: "injectScript",
    value: function injectScript(server, scriptName) {
      var jsTag = document.createElement('script');
      jsTag.type = "text/javascript";
      jsTag.src = "".concat(server, "/").concat(scriptName, ".js");
      document.getElementsByTagName('head')[0].appendChild(jsTag);
    }
  }, {
    key: "capitalizeWord",
    value: function capitalizeWord(s) {
      if (typeof s !== 'string') return '';
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
  }, {
    key: "getCookie",
    value: function getCookie(name) {
      return JSON.parse(localStorage.getItem(this.storageKey + name));
    }
  }, {
    key: "setCookie",
    value: function setCookie(name, _val) {
      var valObj = {
        val: _val,
        created_at: new Date()
      };
      localStorage.setItem(this.storageKey + name, JSON.stringify(valObj));
    }
  }, {
    key: "elem",
    value: function elem(waitFor, callback, timeout, self, time) {
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
  }]);

  return Uludag;
}();

console.log("test");
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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
}(); // ==UserScript==
// @name         klima-streik.org (social)
// @namespace    https://www.klima-streik.org/social
// @version      0.1
// @description  Dieses Script
// @author       Onur Sahin, Christian Knoth, Dustin Bastke, Anna Glomb, Stefanie Roddeck
// @match        https://www.klima-streik.org/*
// @grant        none
// ==/UserScript==


var UserScript = /*#__PURE__*/function (_Uludag) {
  _inherits(UserScript, _Uludag);

  var _super = _createSuper(UserScript);

  function UserScript() {
    var _this;

    _classCallCheck(this, UserScript);

    _this = _super.call(this);
    _this.socialMediaTypes = ["facebook", "twitter", "instagram"];
    _this.socialMediaImageUrl = 'https://raw.githubusercontent.com/Onur169/mib32/main/userscripts/assets/social-media.png';
    return _this;
  }

  _createClass(UserScript, [{
    key: "supportedSocialMedia",
    value: function supportedSocialMedia() {
      return this.socialMediaTypes;
    }
  }, {
    key: "isSocialMediaSupported",
    value: function isSocialMediaSupported(socialMediaType) {
      return supportedSocialMedia().includes(socialMediaType);
    }
  }, {
    key: "getOffsetForSocialMediaSprite",
    value: function getOffsetForSocialMediaSprite(socialMediaType) {
      var offset = -109;

      if (socialMediaType == "facebook") {
        return 0;
      } else if (socialMediaType == "instagram") {
        return offset;
      } else if (socialMediaType == "twitter") {
        return offset * 2;
      } else {
        return 0;
      }
    }
  }, {
    key: "getTemplate",
    value: function getTemplate(socialMediaType) {
      var offset = this.getOffsetForSocialMediaSprite(socialMediaType);
      var template = "\n        \n            <div id=\"social-media-box\">\n\n                <hr />\n\n                <div id=\"social-media-logo\" style=\"width: 90px; height: 90px; margin: 1.5rem 0; background: url(".concat(this.socialMediaImageUrl, ") ").concat(offset, "px; background-size: 307px; background-repeat: no-repeat;\"></div>\n\n                <h2>Was geht auf ").concat(_get(_getPrototypeOf(UserScript.prototype), "capitalizeWord", this).call(this, socialMediaType), "?</h2>\n\n                <p>\n                    84.006 Personen sind gerade flei\xDFig am Posten! <span>\uD83D\uDC97</span>\n                </p>\n\n                <p>\n                    Zur Zeit sind folgende Hashtags auf Facebook angesagt:\n                </p>\n\n                <p>\n                    <nav>\n                        <a href=\"#RetteWaldGr%C3%BCneHoffnung\" target=\"_blank\">#RetteWaldGr&uuml;neHoffnung</a>\n                        <a href=\"#ArtenvielfaltSch%C3%BCtzenGr%C3%BCneHoffnung\" rel=\"noopener noreferrer\" target=\"_blank\">#ArtenvielfaltSch&uuml;tzenGr&uuml;neHoffnung</a>\n                    </nav>\n                </p>\n\n                <p style=\"font-size: .9rem\">\n                    Wenn du wissen m\xF6chtest, was auf den anderen Socialmedia-Kan\xE4len so passiert, dann klicke doch <a href=\"#test\">hier!</a>\n                </p>\n\n            </div>\n\n        ");
      return template;
    }
  }, {
    key: "injectBox",
    value: function injectBox() {
      var _this2 = this;

      var socialMediaTypeByCookie = _get(_getPrototypeOf(UserScript.prototype), "getCookie", this).call(this, "social_media_type");

      var socialMediaType = socialMediaTypeByCookie ? socialMediaTypeByCookie.val : this.supportedSocialMedia()[0];

      _get(_getPrototypeOf(UserScript.prototype), "elem", this).call(this, "#c510 .frame-container .frame-inner", function (el) {
        if (el) {
          el[0].insertAdjacentHTML('beforeend', _this2.getTemplate(socialMediaType));
        }
      });
    }
  }, {
    key: "init",
    value: function init() {
      window.userscript = this; //super.setCookie("social_media_type", "facebook");

      this.injectBox();
    }
  }]);

  return UserScript;
}(Uludag);

var userScript = new UserScript();
userScript.init();
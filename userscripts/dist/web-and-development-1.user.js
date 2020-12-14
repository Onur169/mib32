"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
  }

  _createClass(Uludag, [{
    key: "info",
    value: function info() {
      console.info(this.devServer, this.liveServer);
    }
  }, {
    key: "isDevModeOn",
    value: function isDevModeOn() {
      return localStorage.getItem("mib32_is_dev_mode_on") == "true";
    }
  }, {
    key: "injectScript",
    value: function injectScript(server, scriptName) {
      var jsTag = document.createElement('script');
      jsTag.type = "text/javascript";
      jsTag.src = "".concat(server, "/").concat(scriptName, ".js");
      document.getElementsByTagName('head')[0].appendChild(jsTag);
    }
  }]);

  return Uludag;
}(); // ==UserScript==
// @name         klima-streik.org (social)
// @namespace    https://www.klima-streik.org/social
// @version      0.1
// @description  try to take over the world!
// @author       Onur Sahin, Christian Knoth, Dustin Bastke, Anna Glomb, Stefanie Roddeck
// @match        https://www.klima-streik.org/*
// @grant        none
// ==/UserScript==


var UserScript = /*#__PURE__*/function (_Uludag) {
  _inherits(UserScript, _Uludag);

  var _super = _createSuper(UserScript);

  function UserScript() {
    _classCallCheck(this, UserScript);

    return _super.call(this);
  }

  _createClass(UserScript, [{
    key: "init",
    value: function init() {//super.info();
    }
  }]);

  return UserScript;
}(Uludag);

var userScript = new UserScript();
userScript.init();
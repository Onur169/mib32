// ==UserScript==
// @name         klima-streik.org (helloworld)
// @namespace    https://www.klima-streik.org/helloworld
// @version      0.1
// @description  try to take over the world!
// @author       Onur Sahin, Christian Knoth, Dustin Bastke, Anna Glomb, Stefanie Roddeck
// @match        https://www.klima-streik.org/*
// @grant        none
// ==/UserScript==

let server = isDevModeOn() ? devServer : liveServer;
let scriptName = 'web-and-development-1.user';


console.log("Hello World!");
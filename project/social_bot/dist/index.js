"use strict";
//const puppeteer = require('puppeteer');
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
const fs = require('fs');
const cookiesPath = './cookies.json';
const configPath = './config.json';
const debug = true;
const SLEEP_24_HOURS = 1000 * 60 * 24;
const FacebookBot_1 = require("./FacebookBot");
/*
    networkidle0 comes handy for SPAs that load resources with fetch requests.
    networkidle2 comes handy for pages that do long-polling or any other side activity.
*/
(() => __awaiter(void 0, void 0, void 0, function* () {
    let socialBot = null;
    try {
        let browser = yield puppeteer.launch({
            headless: false
        });
        let page = yield browser.newPage();
        let cookies = null;
        let config = null;
        try {
            cookies = require(cookiesPath);
            config = require(configPath);
        }
        catch (error) {
            fs.writeFileSync(cookiesPath, '{}');
            cookies = require(cookiesPath);
            config = require(configPath);
        }
        socialBot = new FacebookBot_1.default(page, cookies, config);
        console.clear();
        socialBot.successLog("Starte den Bot!");
        if (Object.keys(cookies).length) {
            let count = yield socialBot.scrapeAfterLogin();
            socialBot.successLog(`Der Hashtagcount für ${socialBot.getHashtagToSearch()} lautet: ${count}`);
        }
        else {
            let count = yield socialBot.loginAndScrape(fs, cookiesPath);
            socialBot.successLog(`Der Hashtagcount für ${socialBot.getHashtagToSearch()} lautet: ${count}`);
        }
    }
    catch (error) {
        socialBot.errorLog(error);
        process.exit(1);
    }
    finally {
        if (debug) {
            socialBot.warningLog("Script wird angehalten. Strg+C um Script zu beenden.");
            yield socialBot.sleep(SLEEP_24_HOURS);
        }
        process.exit(0);
    }
}))();

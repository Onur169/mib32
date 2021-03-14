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
const config = require(configPath);
const debug = false;
const SLEEP_24_HOURS = 1000 * 60 * 24;
const hashtagToSearch = 'Klima';
const actionDelay = 10;
const facebookUrl = 'https://www.facebook.com';
const facebookLoginUrl = `${facebookUrl}/login/`;
const facebookHashtagSearchPage = `${facebookUrl}/hashtag/${hashtagToSearch}`;
const facebookEmailSelector = '#email';
const facebookPasswordSelector = '#pass';
const facebookLoginButtonSelector = '#loginbutton';
const facebookCookieAcceptButtonSelector = '[title*="akzeptieren"]';
const hasLoggedInSelector = 'form[action*="logout.php"]';
/*
    networkidle0 comes handy for SPAs that load resources with fetch requests.
    networkidle2 comes handy for pages that do long-polling or any other side activity.
*/
const functions_1 = require("./functions");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.clear();
        functions_1.successLog("Starte den Bot!");
        let browser = yield puppeteer.launch({
            headless: false
        });
        let page = yield browser.newPage();
        let acceptCookies = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let result = yield page.waitForSelector(facebookCookieAcceptButtonSelector, {
                    timeout: actionDelay
                });
                yield result.click();
                Promise.resolve(result);
            }
            catch (error) {
                Promise.reject(error);
            }
        });
        let cookies = null;
        try {
            cookies = require(cookiesPath);
        }
        catch (error) {
            fs.writeFileSync(cookiesPath, '{}');
            cookies = require(cookiesPath);
        }
        if (Object.keys(cookies).length) {
            functions_1.warningLog("Du hast dich vorher schonmal eingeloggt! Gehe direkt zur Hashtag-Suchseite!");
            yield page.setCookie(...cookies);
            yield page.goto(facebookHashtagSearchPage, {
                waitUntil: 'networkidle2'
            });
            let hashtagCount = yield functions_1.getHashtagCountForFacebook(page);
            functions_1.successLog(`Der Hashtagcount für ${hashtagToSearch} lautet: ${hashtagCount}`);
        }
        else {
            functions_1.warningLog("Du bist nicht eingeloggt! Wir loggen uns jetzt ein.");
            yield page.goto(facebookLoginUrl, {
                waitUntil: 'networkidle0'
            });
            yield acceptCookies().then(result => {
                functions_1.successLog("Cookie erfolgreich akzeptiert!");
            }).catch(error => {
                throw new Error("Cookie konnte nicht akzeptiert werden!");
            });
            yield page.type(facebookEmailSelector, config.username, {
                delay: actionDelay
            });
            functions_1.successLog("Usernamen eingegeben!");
            yield page.type(facebookPasswordSelector, config.password, {
                delay: actionDelay
            });
            functions_1.successLog("Passwort eingegeben!");
            yield page.click(facebookLoginButtonSelector);
            functions_1.successLog("Formular abgesendet!");
            yield page.waitForNavigation({
                waitUntil: 'networkidle0',
                timeout: actionDelay
            });
            functions_1.successLog("Gehe jetzt auf die Hashtag-Suchseite!");
            yield page.goto(facebookHashtagSearchPage, {
                waitUntil: 'networkidle2'
            });
            try {
                yield page.waitForSelector(hasLoggedInSelector);
                functions_1.successLog("Erfolgreich eingeloggt!");
                let currentCookies = yield page.cookies();
                functions_1.successLog("Cookies ausgelesen!");
                fs.writeFileSync(cookiesPath, JSON.stringify(currentCookies));
                functions_1.successLog("Cookies gespeichert!");
                let hashtagCount = yield functions_1.getHashtagCountForFacebook(page);
                functions_1.successLog(`Der Hashtagcount für ${hashtagToSearch} lautet: ${hashtagCount}`);
            }
            catch (error) {
                throw new Error("Der Bot konnte sich nicht in Facebook einloggen!");
            }
        }
    }
    catch (error) {
        functions_1.errorLog(error);
        process.exit(1);
    }
    finally {
        if (debug) {
            functions_1.warningLog("Script wird angehalten. Strg+C um Script zu beenden.");
            yield functions_1.sleep(SLEEP_24_HOURS);
        }
        process.exit(0);
    }
}))();

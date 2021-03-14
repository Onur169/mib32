//const puppeteer = require('puppeteer');

import * as puppeteer from 'puppeteer';

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

import { sleep, successLog, errorLog, warningLog, getHashtagCountForFacebook } from './functions';

(async () => {

    try {

        console.clear();
        successLog("Starte den Bot!");

        let browser = await puppeteer.launch({
            headless: false
        });
        let page = await browser.newPage();

        let acceptCookies = async () => {

            try {

                let result = await page.waitForSelector(facebookCookieAcceptButtonSelector, {
                    timeout: actionDelay
                });

                await result.click();

                Promise.resolve(result);

            } catch (error) {

                Promise.reject(error);

            }

        };

        let cookies = null;

        try {
            cookies = require(cookiesPath);
        } catch (error) {
            fs.writeFileSync(cookiesPath, '{}');
            cookies = require(cookiesPath);
        }

        if (Object.keys(cookies).length) {

            warningLog("Du hast dich vorher schonmal eingeloggt! Gehe direkt zur Hashtag-Suchseite!");

            await page.setCookie(...cookies);

            await page.goto(facebookHashtagSearchPage, {
                waitUntil: 'networkidle2'
            });

            let hashtagCount = await getHashtagCountForFacebook(page);

            successLog(`Der Hashtagcount für ${hashtagToSearch} lautet: ${hashtagCount}`);

        } else {

            warningLog("Du bist nicht eingeloggt! Wir loggen uns jetzt ein.");

            await page.goto(facebookLoginUrl, {
                waitUntil: 'networkidle0'
            });

            await acceptCookies().then(result => {
                successLog("Cookie erfolgreich akzeptiert!");
            }).catch(error => {
                throw new Error("Cookie konnte nicht akzeptiert werden!")
            });

            await page.type(facebookEmailSelector, config.username, {
                delay: actionDelay
            });

            successLog("Usernamen eingegeben!");

            await page.type(facebookPasswordSelector, config.password, {
                delay: actionDelay
            });

            successLog("Passwort eingegeben!");

            await page.click(facebookLoginButtonSelector);

            successLog("Formular abgesendet!");

            await page.waitForNavigation({
                waitUntil: 'networkidle0',
                timeout: actionDelay
            });

            successLog("Gehe jetzt auf die Hashtag-Suchseite!");
            await page.goto(facebookHashtagSearchPage, {
                waitUntil: 'networkidle2'
            });

            try {

                await page.waitForSelector(hasLoggedInSelector);

                successLog("Erfolgreich eingeloggt!");

                let currentCookies = await page.cookies();

                successLog("Cookies ausgelesen!");

                fs.writeFileSync(cookiesPath, JSON.stringify(currentCookies));

                successLog("Cookies gespeichert!");

                let hashtagCount = await getHashtagCountForFacebook(page);

                successLog(`Der Hashtagcount für ${hashtagToSearch} lautet: ${hashtagCount}`);

            } catch (error) {

                throw new Error("Der Bot konnte sich nicht in Facebook einloggen!");

            }

        }

    } catch (error) {

        errorLog(error);

        process.exit(1);

    } finally {

        if (debug) {
            warningLog("Script wird angehalten. Strg+C um Script zu beenden.")
            await sleep(SLEEP_24_HOURS);
        }

        process.exit(0);

    }

})();
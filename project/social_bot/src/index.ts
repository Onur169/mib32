//const puppeteer = require('puppeteer');

import * as puppeteer from 'puppeteer';

const fs = require('fs');

const cookiesPath = './cookies.json';
const configPath = './config.json';

const debug = true;
const SLEEP_24_HOURS = 1000 * 60 * 24;

import FacebookBot from './FacebookBot';

/*
    networkidle0 comes handy for SPAs that load resources with fetch requests.
    networkidle2 comes handy for pages that do long-polling or any other side activity.
*/

(async () => {

    let socialBot = null;

    try {

        let browser = await puppeteer.launch({
            headless: false
        });

        let page = await browser.newPage();

        let cookies = null;
        let config = null;

        try {

            cookies = require(cookiesPath);
            config = require(configPath);

        } catch (error) {

            fs.writeFileSync(cookiesPath, '{}');

            cookies = require(cookiesPath);
            config = require(configPath);

        }

        socialBot = new FacebookBot(page, cookies, config);

        console.clear();
        socialBot.successLog("Starte den Bot!");

        if (Object.keys(cookies).length) {

            let count = await socialBot.scrapeAfterLogin();

            socialBot.successLog(`Der Hashtagcount für ${socialBot.getHashtagToSearch()} lautet: ${count}`);

        } else {

            let count = await socialBot.loginAndScrape(fs, cookiesPath);

            socialBot.successLog(`Der Hashtagcount für ${socialBot.getHashtagToSearch()} lautet: ${count}`);

        }

    } catch (error) {

        socialBot.errorLog(error);

        process.exit(1);

    } finally {

        if (debug) {
            socialBot.warningLog("Script wird angehalten. Strg+C um Script zu beenden.")
            await socialBot.sleep(SLEEP_24_HOURS);
        }

        process.exit(0);

    }

})();
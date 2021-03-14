const path = require("path");
const fs = require('fs');
const cliSelect = require('cli-select');
const chalk = require('chalk');

import * as puppeteer from 'puppeteer';
import Api from './Api';
import { Response } from './enums/Response';

const cookiesPath = path.join(__dirname) + '/cookies.json';
const configPath = path.join(__dirname) + '/config.json';
const debug = true;
const SLEEP_24_HOURS = 1000 * 60 * 24;

import FacebookBot from './FacebookBot';
import { HashtagStat } from './interfaces/HashtagStat';

/*
    networkidle0 comes handy for SPAs that load resources with fetch requests.
    networkidle2 comes handy for pages that do long-polling or any other side activity.
*/

(async () => {

    let socialBot = null;
    let api = new Api();
    let selectedId = null;
    let selectedSocialMediaType = null;
    let selectedHashtag = null;
    let allowedSocialMediaTypes = ["facebook", "twitter"];

    try {

        let list = await api.fetch("socialmedia/hashtagstat?page=1", Response.GET);

        if(list.ack === Response.AckSuccess) {

            let data = list.data as HashtagStat[];
            let options = [];

            for(let currentHashtagStat of data) {
                options.push(`#${currentHashtagStat.hashtag} - ${currentHashtagStat.name}`); 
            }

            await cliSelect({
                values: options,
                valueRenderer: (value, selected) => {
                    if (selected) {
                        return chalk.underline(value);
                    }
                    return value;
                },
            }).then((response) => {

                selectedId = data[response.id].id;
                selectedSocialMediaType = data[response.id].name;
                selectedHashtag = data[response.id].hashtag;

            }).catch(() => {

                throw new Error("Cancelled");

            });

        } else {

            throw new Error("Api fail");

        }

        if(allowedSocialMediaTypes.includes(selectedSocialMediaType)) {

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

            switch (selectedSocialMediaType) {
                case 'facebook':
                    socialBot = new FacebookBot(page, cookies, config, selectedHashtag);
                    break;
                /*
                case 'twitter':
                    socialBot = new TwitterBot(page, cookies, config);
                    break;
                */
                default:
                    throw new Error("Unknown social media type");
                    break;
            }

            console.clear();
            socialBot.successLog(`Starte den Bot für den Hashtag #${selectedHashtag} - ${selectedSocialMediaType}!`);

            if (Object.keys(cookies).length) {
    
                let count = await socialBot.scrapeAfterLogin();

                socialBot.successLog(`Der Hashtagcount für ${socialBot.getHashtagToSearch()} lautet: ${count}`);

                let list = await api.fetch(`socialmedia/${selectedId}/hashtagstat?counter=${count}`, Response.PUT);

                if(list.ack == Response.AckSuccess) {
                    socialBot.successLog(`Der Hashtagcount von ${count} wurde durch die API geupdated!`);
                } else {
                    socialBot.errorLog(`Der Hashtagcount von ${count} wurde NICHT durch die API geupdated!`);
                }
    
            } else {
    
                let count = await socialBot.loginAndScrape(fs, cookiesPath);
    
                let list = await api.fetch(`socialmedia/${selectedId}/hashtagstat?counter=${count}`, Response.PUT);
                
                if(list.ack == Response.AckSuccess) {
                    socialBot.successLog(`Der Hashtagcount von ${count} wurde durch die API geupdated!`);
                } else {
                    socialBot.errorLog(`Der Hashtagcount von ${count} wurde NICHT durch die API geupdated!`);
                }
    
            }

        } else {

            throw new Error("Not supported social media type");
                
        }

    } catch (error) {

        //socialBot.errorLog(error);

        process.exit(1);

    } finally {

        /*
        if (debug) {
            socialBot.warningLog("Script wird angehalten. Strg+C um Script zu beenden.")
            await socialBot.sleep(SLEEP_24_HOURS);
        }*/

        process.exit(0);

    }

})();
const path = require("path");
const fs = require('fs');
const cliSelect = require('cli-select');
const chalk = require('chalk');

const debug = false;
const SLEEP_24_HOURS = 1000 * 60 * 24;

import * as puppeteer from 'puppeteer';
import Api from './Api';
import { Response } from './enums/Response';
import { SocialType } from './enums/SocialType';
import FacebookBot from './FacebookBot';
import InstagramBot from './InstagramBot';
import { HashtagStat } from './interfaces/HashtagStat';
import Log from './Log';

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
    let allowedSocialMediaTypes = [SocialType.Facebook, SocialType.Instagram];
    let log = new Log();

    try {

        let list = await api.fetch("socialmedias/hashtagstats?page=1", Response.GET);

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
                headless: false,
                args: [
                    '--disable-web-security',
                ]
            });
    
            let page = await browser.newPage();
    
            let cookies = null;
            let config = null;
    
            const configPath = path.join(__dirname) + '/config.json';
            const cookiesPath = `${path.join(__dirname)}/${selectedSocialMediaType}_cookies.json`;

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
                case 'instagram':
                    socialBot = new InstagramBot(page, cookies, config, selectedHashtag);
                    break;
                default:
                    throw new Error("Unknown social media type");
                    break;
            }

            console.clear();
            log.successLog(`Starte den Bot für den Hashtag #${selectedHashtag} - ${selectedSocialMediaType}!`);

            if (Object.keys(cookies).length || socialBot.isWithoutLogin()) {

                let count = await socialBot.scrapeAfterLogin();

                log.successLog(`Der Hashtagcount für ${socialBot.getHashtagToSearch()} lautet: ${count}`);

                let list = await api.fetch(`socialmedia/${selectedId}/hashtagstat?counter=${count}`, Response.PUT);

                if(list.ack == Response.AckSuccess) {

                    log.successLog(`Der Hashtagcount von ${count} wurde durch die API geupdated!`);

                } else {

                    log.errorLog(`Der Hashtagcount von ${count} wurde NICHT durch die API geupdated!`);

                    let errorMsg = list.data["msg"].toLocaleLowerCase();

                    if(errorMsg.includes("auth")) {
                        log.errorLog(`Hinweiß: Api-Token ist nicht gültig!`);
                    }

                }
    
            } else {

                let count = await socialBot.loginAndScrape(fs, cookiesPath);

                let list = await api.fetch(`socialmedia/${selectedId}/hashtagstat?counter=${count}`, Response.PUT);
                
                if(list.ack == Response.AckSuccess) {

                    log.successLog(`Der Hashtagcount von ${count} wurde durch die API geupdated!`);

                } else {

                    log.errorLog(`Der Hashtagcount von ${count} wurde NICHT durch die API geupdated!`);

                    let errorMsg = list.data["msg"].toLocaleLowerCase();
                    console.log(errorMsg);

                    if(errorMsg.includes("auth")) {
                        log.errorLog(`Hinweiß: Api-Token ist nicht gültig!`);
                    }

                }
    
            }

        } else {

            throw new Error("Not supported social media type");
                
        }

    } catch (error) {

        log.errorLog(error);

        process.exit(1);

    } finally {

        if (debug) {
            log.warningLog("Script wird angehalten. Strg+C um Script zu beenden.")
            await socialBot.sleep(SLEEP_24_HOURS);
        }

        process.exit(0);

    }

})();
"use strict";
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
const path = require("path");
const fs = require('fs');
const cliSelect = require('cli-select');
const chalk = require('chalk');
const debug = false;
const SLEEP_24_HOURS = 1000 * 60 * 24;
const puppeteer = require("puppeteer");
const Api_1 = require("./Api");
const Response_1 = require("./enums/Response");
const SocialType_1 = require("./enums/SocialType");
const FacebookBot_1 = require("./FacebookBot");
const InstagramBot_1 = require("./InstagramBot");
const Log_1 = require("./Log");
/*
    networkidle0 comes handy for SPAs that load resources with fetch requests.
    networkidle2 comes handy for pages that do long-polling or any other side activity.
*/
(() => __awaiter(void 0, void 0, void 0, function* () {
    let socialBot = null;
    let api = new Api_1.default();
    let selectedId = null;
    let selectedSocialMediaType = null;
    let selectedHashtag = null;
    let allowedSocialMediaTypes = [SocialType_1.SocialType.Facebook, SocialType_1.SocialType.Instagram];
    let log = new Log_1.default();
    try {
        let list = yield api.fetch("socialmedia/hashtagstat?page=1", Response_1.Response.GET);
        if (list.ack === Response_1.Response.AckSuccess) {
            let data = list.data;
            let options = [];
            for (let currentHashtagStat of data) {
                options.push(`#${currentHashtagStat.hashtag} - ${currentHashtagStat.name}`);
            }
            yield cliSelect({
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
        }
        else {
            throw new Error("Api fail");
        }
        if (allowedSocialMediaTypes.includes(selectedSocialMediaType)) {
            let browser = yield puppeteer.launch({
                headless: false,
                args: [
                    '--disable-web-security',
                ]
            });
            let page = yield browser.newPage();
            let cookies = null;
            let config = null;
            const configPath = path.join(__dirname) + '/config.json';
            const cookiesPath = `${path.join(__dirname)}/${selectedSocialMediaType}_cookies.json`;
            try {
                cookies = require(cookiesPath);
                config = require(configPath);
            }
            catch (error) {
                fs.writeFileSync(cookiesPath, '{}');
                cookies = require(cookiesPath);
                config = require(configPath);
            }
            switch (selectedSocialMediaType) {
                case 'facebook':
                    socialBot = new FacebookBot_1.default(page, cookies, config, selectedHashtag);
                    break;
                case 'instagram':
                    socialBot = new InstagramBot_1.default(page, cookies, config, selectedHashtag);
                    break;
                default:
                    throw new Error("Unknown social media type");
                    break;
            }
            console.clear();
            log.successLog(`Starte den Bot für den Hashtag #${selectedHashtag} - ${selectedSocialMediaType}!`);
            if (Object.keys(cookies).length || socialBot.isWithoutLogin()) {
                let count = yield socialBot.scrapeAfterLogin();
                log.successLog(`Der Hashtagcount für ${socialBot.getHashtagToSearch()} lautet: ${count}`);
                let list = yield api.fetch(`socialmedia/${selectedId}/hashtagstat?counter=${count}`, Response_1.Response.PUT);
                if (list.ack == Response_1.Response.AckSuccess) {
                    log.successLog(`Der Hashtagcount von ${count} wurde durch die API geupdated!`);
                }
                else {
                    log.errorLog(`Der Hashtagcount von ${count} wurde NICHT durch die API geupdated!`);
                }
            }
            else {
                let count = yield socialBot.loginAndScrape(fs, cookiesPath);
                let list = yield api.fetch(`socialmedia/${selectedId}/hashtagstat?counter=${count}`, Response_1.Response.PUT);
                if (list.ack == Response_1.Response.AckSuccess) {
                    log.successLog(`Der Hashtagcount von ${count} wurde durch die API geupdated!`);
                }
                else {
                    log.errorLog(`Der Hashtagcount von ${count} wurde NICHT durch die API geupdated!`);
                }
            }
        }
        else {
            throw new Error("Not supported social media type");
        }
    }
    catch (error) {
        log.errorLog(error);
        process.exit(1);
    }
    finally {
        if (debug) {
            log.warningLog("Script wird angehalten. Strg+C um Script zu beenden.");
            yield socialBot.sleep(SLEEP_24_HOURS);
        }
        process.exit(0);
    }
}))();

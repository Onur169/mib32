const emoji = require('node-emoji');

import * as puppeteer from 'puppeteer';

function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function successLog(str, headline = null) {

    let _headline = headline ? `${headline}` : "";

    console.log(`${emoji.get('heavy_check_mark')}  ${_headline}: ${str}`);

}

async function errorLog(str, headline = null) {

    let _headline = headline ? `${headline}` : "";

    console.log(`${emoji.get('skull_and_crossbones')}  ${_headline}: ${str}`);

}

async function warningLog(str, headline = null) {

    let _headline = headline ? `${headline}` : "";

    console.log(`${emoji.get('warning')}  ${_headline}: ${str}`);

}

async function getHashtagCountForFacebook(page: puppeteer.Page) {

    try {

        let result = await page.evaluate(() => {

            let indicatorString = 'gepostet';
            let items = Array.from(document.querySelectorAll("span"));
            
            for (let item of items) {

                let itemContent = item.textContent;
                console.log(itemContent, itemContent.includes(indicatorString));

                if (itemContent.includes(indicatorString)) {

                    let onlyNumbers = parseFloat(itemContent.replace(/\D/g, ''));

                    if (Number.isFinite(onlyNumbers)) {

                        return new Promise(resolve => {
                            resolve(onlyNumbers);
                        });

                    } else {

                        return new Promise(reject => {
                            reject(null);
                        });

                    }

                }

            }

            return new Promise(reject => {
                reject(null);
            });

        });

        return new Promise(resolve => {
            resolve(result);
        });

    } catch (error) {

        return new Promise(resolve => {
            resolve(error);
        });

    }

}

export { sleep, successLog, errorLog, warningLog, getHashtagCountForFacebook };
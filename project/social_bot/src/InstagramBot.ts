import SocialBot from "./SocialBot";
import * as puppeteer from 'puppeteer';
import { SocialType } from "./enums/SocialType";

class InstagramBot extends SocialBot {

    url: string;
    loginUrl: string;
    hashtagSearchPageUrl: string;
    emailSelector: string;
    passwordSelector: string;
    loginButtonSelector: string;
    acceptButtonSelector: string;
    hasLoggedInSelector: string;
    hashtagToSearch: string;
    actionDelay: number;
    type: SocialType;

    page: puppeteer.Page;
    cookies: any;
    config: any;

    constructor(page: puppeteer.Page, cookies: any, config: any, hashTagToSearch: string) {

        super(page, cookies, config);

        this.type = SocialType.Instagram;

        this.page = page;
        this.cookies = cookies;
        this.config = config;

        this.url = 'https://www.instagram.com';
        this.loginUrl = null;
        this.hashtagToSearch = hashTagToSearch;
        this.hashtagSearchPageUrl = `${this.url}/explore/tags/${this.hashtagToSearch}`;
        this.emailSelector = null;
        this.passwordSelector = null;
        this.loginButtonSelector = null;
        this.acceptButtonSelector = null;
        this.hasLoggedInSelector = null;
        
    }

    async getHashtagCount(): Promise<number> {

        try {
    
            let result = await this.page.evaluate(() => {
    
                let indicatorString = 'gepostet';
                let items = Array.from(document.querySelectorAll("span"));

                return new Promise(resolve => {
                    resolve(99999);
                });
                
                /*
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
                */
    
                return new Promise(reject => {
                    reject(null);
                });
    
            });
    
            return new Promise(resolve => {
                resolve(+(result));
            });
    
        } catch (error) {
    
            return new Promise(resolve => {
                resolve(error);
            });
    
        }
        
    }

}


export default InstagramBot;
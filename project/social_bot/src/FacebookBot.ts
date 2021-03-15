import SocialBot from "./SocialBot";
import * as puppeteer from 'puppeteer';
import { SocialType } from "./enums/SocialType";

class FacebookBot extends SocialBot {

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

        this.type = SocialType.Facebook;

        this.page = page;
        this.cookies = cookies;
        this.config = config;

        this.url = 'https://www.facebook.com';
        this.loginUrl = `${this.url}/login/`;
        this.hashtagToSearch = hashTagToSearch;
        this.hashtagSearchPageUrl = `${this.url}/hashtag/${this.hashtagToSearch}`;
        this.emailSelector = '#email';
        this.passwordSelector = '#pass';
        this.loginButtonSelector = '#loginbutton';
        this.acceptButtonSelector = '[title*="akzeptieren"]';
        this.hasLoggedInSelector = 'form[action*="logout.php"]';
        
    }

    async getHashtagCount(): Promise<number> {

        try {
    
            let result = await this.page.evaluate(() => {
    
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
                resolve(+(result));
            });
    
        } catch (error) {
    
            return new Promise(resolve => {
                resolve(error);
            });
    
        }
        
    }

}


export default FacebookBot;
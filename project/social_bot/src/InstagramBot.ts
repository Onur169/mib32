import SocialBot from "./SocialBot";
import * as puppeteer from 'puppeteer';
import { SocialType } from "./enums/SocialType";
import { SocialBotOption } from "./enums/SocialBotOption";

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
    socialBotOption: SocialBotOption;

    page: puppeteer.Page;
    cookies: any;
    config: any;

    constructor(page: puppeteer.Page, cookies: any, config: any, hashTagToSearch: string) {

        super(page, cookies, config);

        this.page = page;
        this.cookies = cookies;
        this.config = config;

        this.url = 'https://www.instagram.com';
        this.loginUrl = `${this.url}/accounts/login/`;
        this.hashtagToSearch = hashTagToSearch;
        this.hashtagSearchPageUrl = `${this.url}/explore/tags/${this.hashtagToSearch}`;
        this.emailSelector = '[name=username]';
        this.passwordSelector = '[name=password]';
        this.loginButtonSelector = 'button[type=submit]';
        this.hasLoggedInSelector = '[action*="logout.php"]';
        this.type = SocialType.Instagram;
        this.socialBotOption = SocialBotOption.WaitForSelectorViaFunction;
        this.acceptButtonSelector = 'Array.from(document.querySelectorAll("button")).filter(el => el.innerText.toString().includes("Akzeptieren"))[0]';
        
    }

    async getHashtagCount(): Promise<number> {

        try {
    
            let result = await this.page.evaluate(() => {
    
                let item = document.querySelector("span > span") as HTMLElement;

                let onlyNumbers = parseFloat(item.innerText.replace(/\D/g, ''));

                if (Number.isFinite(onlyNumbers)) {

                    return new Promise(resolve => {
                        resolve(onlyNumbers);
                    });

                } else {

                    return new Promise(reject => {
                        reject(null);
                    });

                }

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
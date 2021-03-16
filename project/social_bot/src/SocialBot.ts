
import { SocialMedia } from "./interfaces/SocialMedia";
import * as puppeteer from 'puppeteer';
import { SocialType } from "./enums/SocialType";
import { SocialBotOption } from "./enums/SocialBotOption";

import Log from "./Log";

class SocialBot implements SocialMedia {

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

    log: Log;

    protected page: puppeteer.Page = null;
    protected cookies: any = null;
    protected config: any = null;

    constructor(page: puppeteer.Page, cookies: any, config: any) {
        this.page = page;
        this.cookies = cookies;
        this.config = config;
        this.log = new Log();
    }

    public getHashtagCount(): Promise<number>{
        return new Promise(resolve => {
            resolve(-1);
        });
    };

    public getUrl() {
        return this.url;
    }

    public getLoginUrl() {
        return this.loginUrl;
    }

    public getHashtagSearchPageUrl() {
        return this.hashtagSearchPageUrl;
    }

    public getEmailSelector() {
        return this.emailSelector;
    }

    public getPasswordSelector() {
        return this.passwordSelector;
    }

    public getLoginButtonSelector() {
        return this.loginButtonSelector;
    }

    public getAcceptButtonSelector() {
        return this.acceptButtonSelector;
    }

    public getHasLoggedInButtonSelector() {
        return this.hasLoggedInSelector;
    }

    public getHashtagToSearch() {
        return this.hashtagToSearch;
    }

    public getActionDelay() {
        return this.actionDelay;
    }
    
    public sleep(ms: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    public isWithoutLogin() {
        return typeof(this.hasLoggedInSelector) === 'undefined' || this.hasLoggedInSelector == null;
    }

    public isCookiesEmpty() {
        return Object.keys(this.cookies).length == 0;
    }

    public async scrapeAfterLogin(): Promise<number> {

        try {

            this.log.warningLog("Du hast dich vorher schonmal eingeloggt! Gehe direkt zur Hashtag-Suchseite!");

            if(!this.isCookiesEmpty()) {
                await this.page.setCookie(...this.cookies);
            }

            // An dieser Stelle können Videos zu einem Timeout unter "networkidle2" führen
            // Mit domcontentloaded können wir den Wert abgreifen unabhängig welche weiteren Ressourcen geladen werden
            await this.page.goto(this.hashtagSearchPageUrl, {
                waitUntil: 'domcontentloaded'
            });

            await this.page.waitForSelector(this.hasLoggedInSelector);

            this.log.successLog("Erfolgreich eingeloggt!");
    
            let hashtagCount = await this.getHashtagCount();

            return new Promise(resolve => {
                resolve(hashtagCount);
            });

        } catch (error) {

            this.log.errorLog(error);

            return new Promise(reject => {
                reject(-1);
            });

        }

    }

    public async loginAndScrape(fs: any, cookiesPath: string): Promise<number> {

        try {
            
            this.log.warningLog("Du bist nicht eingeloggt! Wir loggen uns jetzt ein.");

            await this.page.goto(this.loginUrl, {
                waitUntil: 'networkidle0'
            });
    
            await this.acceptCookies().then(result => {
                this.log.successLog("Cookie erfolgreich akzeptiert!");
            }).catch(error => {
                throw new Error("Cookie konnte nicht akzeptiert werden!")
            });
    
            await this.page.type(this.emailSelector, this.config[this.type].username, {
                delay: this.actionDelay
            });
    
            this.log.successLog("Usernamen eingegeben!");
    
            await this.page.type(this.passwordSelector, this.config[this.type].password, {
                delay: this.actionDelay
            });
    
            this.log.successLog("Passwort eingegeben!");
    
            await this.page.click(this.loginButtonSelector);
    
            this.log.successLog("Formular abgesendet!");
    
            await this.page.waitForNavigation({
                waitUntil: 'networkidle0',
                timeout: this.actionDelay
            });

            let currentCookies = await this.page.cookies();

            this.log.successLog("Cookies ausgelesen!");

            fs.writeFileSync(cookiesPath, JSON.stringify(currentCookies));

            this.log.successLog("Cookies gespeichert!");
    
            this.log.successLog("Gehe zur Hashtagsuch Seite!");
    
            // An dieser Stelle können Videos zu einem Timeout unter "networkidle2" führen
            // Mit domcontentloaded können wir den Wert abgreifen unabhängig welche weiteren Ressourcen geladen werden
            await this.page.goto(this.hashtagSearchPageUrl, {
                waitUntil: 'domcontentloaded'
            });
    
            let hashtagCount = await this.getHashtagCount();

            return new Promise(resolve => {
                resolve(hashtagCount);
            });

        } catch (error) {
            
            return new Promise(reject => {
                reject(error);
            });

        }

    }

    public async getCookies(): Promise<puppeteer.Protocol.Network.Cookie[]> {
        return this.page.cookies();
    }

    public async acceptCookies() {

        try {

            let result = null;

            switch (this.socialBotOption) {
                case SocialBotOption.WaitForSelectorViaSelector:
                    result = await this.page.waitForSelector(this.acceptButtonSelector, {
                        timeout: this.actionDelay
                    });
                    break;
                case SocialBotOption.WaitForSelectorViaFunction:
                    result = await this.page.waitForFunction(this.acceptButtonSelector, {
                        timeout: this.actionDelay
                    });
                    break;
                default:
                    result = await this.page.waitForSelector(this.acceptButtonSelector, {
                        timeout: this.actionDelay
                    });
                    break;
            }

            await result.click();

            Promise.resolve(result);

        } catch (error) {

            Promise.reject(error);

        }

    }

}

export default SocialBot;
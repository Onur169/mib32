
import { SocialMedia } from "./interfaces/SocialMedia";
import * as emoji from 'node-emoji';
import * as puppeteer from 'puppeteer';
import { SocialType } from "./enums/SocialType";

class SocialBot implements SocialMedia{

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

    protected page: puppeteer.Page = null;
    protected cookies: any = null;
    protected config: any = null;

    constructor(page: puppeteer.Page, cookies: any, config: any) {
        this.page = page;
        this.cookies = cookies;
        this.config = config;
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

    public async scrapeAfterLogin(): Promise<number> {

        try {

            this.warningLog("Du hast dich vorher schonmal eingeloggt! Gehe direkt zur Hashtag-Suchseite!");
            await this.page.setCookie(...this.cookies);

            // An dieser Stelle können Videos zu einem Timeout unter "networkidle2" führen
            // Mit domcontentloaded können wir den Wert abgreifen unabhängig welche weiteren Ressourcen geladen werden
            await this.page.goto(this.hashtagSearchPageUrl, {
                waitUntil: 'domcontentloaded'
            });

            await this.page.waitForSelector(this.hasLoggedInSelector);

            this.successLog("Erfolgreich eingeloggt!");
    
            let hashtagCount = await this.getHashtagCount();

            return new Promise(resolve => {
                resolve(hashtagCount);
            });

        } catch (error) {

            this.errorLog(error);

            return new Promise(reject => {
                reject(-1);
            });

        }

    }

    public async loginAndScrape(fs, cookiesPath): Promise<number> {

        try {
            
            this.warningLog("Du bist nicht eingeloggt! Wir loggen uns jetzt ein.");

            await this.page.goto(this.loginUrl, {
                waitUntil: 'networkidle0'
            });
    
            await this.acceptCookies().then(result => {
                this.successLog("Cookie erfolgreich akzeptiert!");
            }).catch(error => {
                throw new Error("Cookie konnte nicht akzeptiert werden!")
            });
    
            await this.page.type(this.emailSelector, this.config[this.type].username, {
                delay: this.actionDelay
            });
    
            this.successLog("Usernamen eingegeben!");
    
            await this.page.type(this.passwordSelector, this.config[this.type].password, {
                delay: this.actionDelay
            });
    
            this.successLog("Passwort eingegeben!");
    
            await this.page.click(this.loginButtonSelector);
    
            this.successLog("Formular abgesendet!");
    
            await this.page.waitForNavigation({
                waitUntil: 'networkidle0',
                timeout: this.actionDelay
            });

            let currentCookies = await this.page.cookies();

            this.successLog("Cookies ausgelesen!");

            fs.writeFileSync(cookiesPath, JSON.stringify(currentCookies));

            this.successLog("Cookies gespeichert!");
    
            this.successLog("Gehe zur Hashtagsuch Seite!");
    
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
    
    public async successLog(str: string, headline?: string) {
    
        let _headline = headline ? `${headline}` : "";
    
        console.log(`${emoji.get('heavy_check_mark')}  ${_headline}: ${str}`);
    
    }
    
    public async errorLog(str: string, headline?: string) {
    
        let _headline = headline ? `${headline}` : "";
    
        console.log(`${emoji.get('skull_and_crossbones')}  ${_headline}: ${str}`);
    
    }
    
    public async warningLog(str: string, headline?: string) {
    
        let _headline = headline ? `${headline}` : "";
    
        console.log(`${emoji.get('warning')}  ${_headline}: ${str}`);
    
    }

    public async getCookies(): Promise<puppeteer.Protocol.Network.Cookie[]> {
        return this.page.cookies();
    }
    
    /*
    async getHashtagCountForFacebook() {
 
    }
    */

    public async acceptCookies() {

        try {

            let result = await this.page.waitForSelector(this.acceptButtonSelector, {
                timeout: this.actionDelay
            });

            await result.click();

            Promise.resolve(result);

        } catch (error) {

            Promise.reject(error);

        }

    }


}

export default SocialBot;
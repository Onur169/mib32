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
const SocialBotOption_1 = require("./enums/SocialBotOption");
const Log_1 = require("./Log");
class SocialBot {
    constructor(page, cookies, config) {
        this.page = null;
        this.cookies = null;
        this.config = null;
        this.page = page;
        this.cookies = cookies;
        this.config = config;
        this.log = new Log_1.default();
    }
    getHashtagCount() {
        return new Promise(resolve => {
            resolve(-1);
        });
    }
    ;
    getUrl() {
        return this.url;
    }
    getLoginUrl() {
        return this.loginUrl;
    }
    getHashtagSearchPageUrl() {
        return this.hashtagSearchPageUrl;
    }
    getEmailSelector() {
        return this.emailSelector;
    }
    getPasswordSelector() {
        return this.passwordSelector;
    }
    getLoginButtonSelector() {
        return this.loginButtonSelector;
    }
    getAcceptButtonSelector() {
        return this.acceptButtonSelector;
    }
    getHasLoggedInButtonSelector() {
        return this.hasLoggedInSelector;
    }
    getHashtagToSearch() {
        return this.hashtagToSearch;
    }
    getActionDelay() {
        return this.actionDelay;
    }
    sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
    isWithoutLogin() {
        return typeof (this.hasLoggedInSelector) === 'undefined' || this.hasLoggedInSelector == null;
    }
    isCookiesEmpty() {
        return Object.keys(this.cookies).length == 0;
    }
    scrapeAfterLogin() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.log.warningLog("Du hast dich vorher schonmal eingeloggt! Gehe direkt zur Hashtag-Suchseite!");
                if (!this.isCookiesEmpty()) {
                    yield this.page.setCookie(...this.cookies);
                }
                // An dieser Stelle können Videos zu einem Timeout unter "networkidle2" führen
                // Mit domcontentloaded können wir den Wert abgreifen unabhängig welche weiteren Ressourcen geladen werden
                yield this.page.goto(this.hashtagSearchPageUrl, {
                    waitUntil: 'domcontentloaded'
                });
                yield this.page.waitForSelector(this.hasLoggedInSelector);
                this.log.successLog("Erfolgreich eingeloggt!");
                let hashtagCount = yield this.getHashtagCount();
                return new Promise(resolve => {
                    resolve(hashtagCount);
                });
            }
            catch (error) {
                this.log.errorLog(error);
                return new Promise(reject => {
                    reject(-1);
                });
            }
        });
    }
    loginAndScrape(fs, cookiesPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.log.warningLog("Du bist nicht eingeloggt! Wir loggen uns jetzt ein.");
                yield this.page.goto(this.loginUrl, {
                    waitUntil: 'networkidle0'
                });
                yield this.acceptCookies().then(result => {
                    this.log.successLog("Cookie erfolgreich akzeptiert!");
                }).catch(error => {
                    throw new Error("Cookie konnte nicht akzeptiert werden!");
                });
                yield this.page.type(this.emailSelector, this.config[this.type].username, {
                    delay: this.actionDelay
                });
                this.log.successLog("Usernamen eingegeben!");
                yield this.page.type(this.passwordSelector, this.config[this.type].password, {
                    delay: this.actionDelay
                });
                this.log.successLog("Passwort eingegeben!");
                yield this.page.click(this.loginButtonSelector);
                this.log.successLog("Formular abgesendet!");
                yield this.page.waitForNavigation({
                    waitUntil: 'networkidle0',
                    timeout: this.actionDelay
                });
                let currentCookies = yield this.page.cookies();
                this.log.successLog("Cookies ausgelesen!");
                fs.writeFileSync(cookiesPath, JSON.stringify(currentCookies));
                this.log.successLog("Cookies gespeichert!");
                this.log.successLog("Gehe zur Hashtagsuch Seite!");
                // An dieser Stelle können Videos zu einem Timeout unter "networkidle2" führen
                // Mit domcontentloaded können wir den Wert abgreifen unabhängig welche weiteren Ressourcen geladen werden
                yield this.page.goto(this.hashtagSearchPageUrl, {
                    waitUntil: 'domcontentloaded'
                });
                let hashtagCount = yield this.getHashtagCount();
                return new Promise(resolve => {
                    resolve(hashtagCount);
                });
            }
            catch (error) {
                return new Promise(reject => {
                    reject(error);
                });
            }
        });
    }
    getCookies() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.page.cookies();
        });
    }
    acceptCookies() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = null;
                switch (this.socialBotOption) {
                    case SocialBotOption_1.SocialBotOption.WaitForSelectorViaSelector:
                        result = yield this.page.waitForSelector(this.acceptButtonSelector, {
                            timeout: this.actionDelay
                        });
                        break;
                    case SocialBotOption_1.SocialBotOption.WaitForSelectorViaFunction:
                        result = yield this.page.waitForFunction(this.acceptButtonSelector, {
                            timeout: this.actionDelay
                        });
                        break;
                    default:
                        result = yield this.page.waitForSelector(this.acceptButtonSelector, {
                            timeout: this.actionDelay
                        });
                        break;
                }
                yield result.click();
                Promise.resolve(result);
            }
            catch (error) {
                Promise.reject(error);
            }
        });
    }
}
exports.default = SocialBot;

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
const SocialBot_1 = require("./SocialBot");
const SocialType_1 = require("./enums/SocialType");
const SocialBotOption_1 = require("./enums/SocialBotOption");
class InstagramBot extends SocialBot_1.default {
    constructor(page, cookies, config, hashTagToSearch) {
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
        this.hasLoggedInSelector = 'img[alt*="Profilbild"]';
        this.type = SocialType_1.SocialType.Instagram;
        this.socialBotOption = SocialBotOption_1.SocialBotOption.WaitForSelectorViaFunction;
        this.acceptButtonSelector = 'Array.from(document.querySelectorAll("button")).filter(el => el.innerText.toString().includes("Akzeptieren"))[0]';
        //this.actionDelay = 1;
    }
    getHashtagCount() {
        const _super = Object.create(null, {
            isCookiesEmpty: { get: () => super.isCookiesEmpty }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (_super.isCookiesEmpty.call(this)) {
                    // Nur nicht-eingeloggt anwenden
                    yield this.page.waitForNavigation({
                        waitUntil: 'domcontentloaded'
                    });
                }
                let result = yield this.page.evaluate(() => {
                    let item = document.querySelector("span > span");
                    let onlyNumbers = parseFloat(item.innerHTML.replace(/\D/g, ''));
                    if (Number.isFinite(onlyNumbers)) {
                        return new Promise(resolve => {
                            resolve(onlyNumbers);
                        });
                    }
                    else {
                        return new Promise(reject => {
                            reject(null);
                        });
                    }
                });
                return new Promise(resolve => {
                    resolve(+(result));
                });
            }
            catch (error) {
                return new Promise(resolve => {
                    resolve(error);
                });
            }
        });
    }
}
exports.default = InstagramBot;

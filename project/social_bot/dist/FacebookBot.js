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
class FacebookBot extends SocialBot_1.default {
    constructor(page, cookies, config) {
        super(page, cookies, config);
        this.page = page;
        this.cookies = cookies;
        this.config = config;
        this.url = 'https://www.facebook.com';
        this.loginUrl = `${this.url}/login/`;
        this.hashtagToSearch = 'Klima';
        this.hashtagSearchPageUrl = `${this.url}/hashtag/${this.hashtagToSearch}`;
        this.emailSelector = '#email';
        this.passwordSelector = '#pass';
        this.loginButtonSelector = '#loginbutton';
        this.acceptButtonSelector = '[title*="akzeptieren"]';
        this.hasLoggedInSelector = 'form[action*="logout.php"]';
    }
    getHashtagCount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield this.page.evaluate(() => {
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
                            }
                            else {
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
            }
            catch (error) {
                return new Promise(resolve => {
                    resolve(error);
                });
            }
        });
    }
}
exports.default = FacebookBot;

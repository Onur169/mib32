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
exports.getHashtagCountForFacebook = exports.warningLog = exports.errorLog = exports.successLog = exports.sleep = void 0;
const emoji = require('node-emoji');
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
exports.sleep = sleep;
function successLog(str, headline = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let _headline = headline ? `${headline}` : "";
        console.log(`${emoji.get('heavy_check_mark')}  ${_headline}: ${str}`);
    });
}
exports.successLog = successLog;
function errorLog(str, headline = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let _headline = headline ? `${headline}` : "";
        console.log(`${emoji.get('skull_and_crossbones')}  ${_headline}: ${str}`);
    });
}
exports.errorLog = errorLog;
function warningLog(str, headline = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let _headline = headline ? `${headline}` : "";
        console.log(`${emoji.get('warning')}  ${_headline}: ${str}`);
    });
}
exports.warningLog = warningLog;
function getHashtagCountForFacebook(page) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield page.evaluate(() => {
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
                resolve(result);
            });
        }
        catch (error) {
            return new Promise(resolve => {
                resolve(error);
            });
        }
    });
}
exports.getHashtagCountForFacebook = getHashtagCountForFacebook;

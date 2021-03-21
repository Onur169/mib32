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
const fetch = require('node-fetch');
const { Headers } = require('node-fetch');
class Api {
    constructor() {
        this.apiUrl = 'https://api.judoclub-rockenberg.de/climatestrike';
        this.xAuthToken = 'f6593626f871c3a479106ba4c770d41d42eee68e';
    }
    fetch(endpoint, method) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let response = null;
            try {
                let meta = {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': this.xAuthToken
                };
                let headers = new Headers(meta);
                response = yield fetch(`${this.apiUrl}/${endpoint}`, {
                    method,
                    headers
                }).then(response => response.json());
                resolve(response);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
}
exports.default = Api;

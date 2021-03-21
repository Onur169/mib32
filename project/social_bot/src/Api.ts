import { ApiResponse } from "./interfaces/Response";
import { Response } from './enums/Response';

const fetch = require('node-fetch');
const {Headers} = require('node-fetch');

class Api {

    private apiUrl: string;
    private xAuthToken: string;

    constructor() {
        this.apiUrl = 'https://api.judoclub-rockenberg.de/climatestrike';
        this.xAuthToken = 'f6593626f871c3a479106ba4c770d41d42eee68e';
    }

    fetch(endpoint: string, method: Response): Promise<ApiResponse>{

        return new Promise(async (resolve, reject) => {

            let response = null;

            try {

                let meta = {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': this.xAuthToken
                };

                let headers = new Headers(meta);

                response = await fetch(`${this.apiUrl}/${endpoint}`, {
                    method,
                    headers
                  }).then(response => response.json());

                resolve(response);

            } catch (error) {

                reject(error);

            }

        });

    }

}

export default Api;
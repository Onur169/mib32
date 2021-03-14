import { ApiResponse } from "./interfaces/Response";
import { Response } from './enums/Response';

const fetch = require('node-fetch');

class Api {

    private apiUrl = 'https://api.judoclub-rockenberg.de/climatestrike';

    constructor() {

    }

    fetch(endpoint: string, method: Response): Promise<ApiResponse>{

        return new Promise(async (resolve, reject) => {

            let response = null;

            try {

                response = await fetch(`${this.apiUrl}/${endpoint}`, {
                    method
                  }).then(response => response.json());

                resolve(response);

            } catch (error) {

                reject(error);

            }

        });

    }

}

export default Api;
/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Der API-Service übergibt die ihm gegebenen Anfragen an das Backend
 * und übernimmt die grundsätzliche Validitätsüberprüfung der ankommenden Daten.
 */


import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstants } from '../helpers/constants/ApiConstants';
import { ApiResponse } from '../helpers/interfaces/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }

  fetch(url: string, params: HttpParams){
    return new Promise<ApiResponse>(async (resolve, reject) => {

      try{
        const RequestUrl=ApiConstants.API_ENDPOINT+url;

        let response= await this.http.get<ApiResponse>(RequestUrl, {params:params}).toPromise();

        if(response.ack=="success"){
          resolve(response);
        }
        else reject("ungültige Rückgabe des Datenobjekts");

      }catch (error){
        reject(error)
      }
    })

  }

}


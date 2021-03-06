import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstants } from '../helpers/constants/ApiConstants';
import { ApiResponse } from '../helpers/interfaces/ApiResponse';
import { Demonstration } from '../helpers/interfaces/Demonstration';
import { Throwback } from '../helpers/interfaces/Throwback';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {

  }

  fetch(url: string, params: HttpParams){
    return new Promise<Demonstration[]|Throwback[]>(async (resolve, reject) => {
      try{

        const RequestUrl=ApiConstants.API_ENDPOINT+url;

        let response= await this.http.get<ApiResponse>(RequestUrl, {params:params}).toPromise();



        resolve(response.data);

      }catch (error){
        reject(error)
      }
    })

  }

}


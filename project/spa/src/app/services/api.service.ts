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

  fetch(page: number, url: string){
    return new Promise(async (resolve, reject) => {
      try{
        let params= new HttpParams()
        .set('page', page.toString());

        const RequestUrl=ApiConstants.API_ENDPOINT+url;

        let response= await this.http.get<ApiResponse>(RequestUrl, {params:params}).toPromise();



        resolve(response);

      }catch (error){
        reject(error)
      }
    })

  }

}


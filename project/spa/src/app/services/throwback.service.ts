import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ThrowbackManager } from '../helpers/classes/ThrowbackManager';
import { ApiConstants } from '../helpers/constants/APIConstants';
import { ThrowbacksResponse } from '../helpers/interfaces/ThrowbacksResponse';

@Injectable({
  providedIn: 'root'
})
export class ThrowbackService {
  throwbackmanager: ThrowbackManager;

  constructor(private http: HttpClient) {
    this.throwbackmanager=new ThrowbackManager();

  }

  fetch(page: number){
    return new Promise(async (resolve, reject) => {
      try{
        let params= new HttpParams()
        .set('page', page.toString());

        const RequestUrl=ApiConstants.API_ENDPOINT+'throwbacks';

        let response= await this.http.get<ThrowbacksResponse>(RequestUrl, {params:params}).toPromise();

        this.throwbackmanager.setnewPage(response.current_page,response.data);
        this.throwbackmanager.setMaxPages(response.max_pages);
        this.throwbackmanager.setCurrentPage(response.current_page);

        resolve(response);

      }catch (error){
        reject(error)
      }
    })

  }

}

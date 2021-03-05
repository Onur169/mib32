import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ThrowbackManager } from '../helpers/classes/ThrowbackManager';
import { ThrowbacksResponse } from '../helpers/interfaces/ThrowbacksResponse';

@Injectable({
  providedIn: 'root'
})
export class ThrowbackService {
  private url: string;
  throwbackmanager: ThrowbackManager;

  constructor(private http: HttpClient) {
    this.url='https://api.judoclub-rockenberg.de/climatestrike/throwbacks';
    this.throwbackmanager=new ThrowbackManager();

  }

  fetch(page: number){
    return new Promise(async (resolve, reject) => {
      try{
        let params= new HttpParams()
        .set('page', page.toString());

        const RequestUrl=this.url;

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

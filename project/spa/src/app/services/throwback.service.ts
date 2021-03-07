import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ThrowbackClass } from '../helpers/classes/ThrowbackClass';
import { ThrowbackManager } from '../helpers/classes/ThrowbackManager';
import { Demonstration } from '../helpers/interfaces/Demonstration';
import { Throwback } from '../helpers/interfaces/Throwback';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ThrowbackService {
  throwbackmanager: ThrowbackManager;

  constructor(private http: HttpClient, private api: ApiService) {
    this.throwbackmanager=new ThrowbackManager();

  }

  async getThrowbacks(){
    return new Promise(async (resolve, reject) => {
      try{
        let params= new HttpParams()
        .set('page', this.throwbackmanager.getCurrentPage().toString());

        const Url='throwbacks';

        let response= await this.api.fetch(Url, params);

        let newThrowbacks: ThrowbackClass[]=[];

        (response.data as Throwback[]).forEach((value: Throwback) => {
          let newThrowback=new ThrowbackClass(
            value.id,
            value.name,
            value.description,
            value.social_media_video_url,
            value.start_at,
            value.end_at,
            value.lat,
            value.lng
          );
          newThrowbacks.push(newThrowback);
        });
        this.throwbackmanager.setnewPage(response.current_page, response.max_pages,newThrowbacks);

        resolve(response);

      }catch (error){
        reject(error)
      }
    })

  }

}

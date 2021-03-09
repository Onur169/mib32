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

  async getThrowbacks(page?: number){
    return new Promise<ThrowbackClass[]>(async (resolve, reject) => {
      try{
        if(page && (this.throwbackmanager.getPageValue(page)!=undefined)){
          this.throwbackmanager.setCurrentPage(page);
          return resolve(this.throwbackmanager.getPageValue(page)!);
        }
        let params= new HttpParams()
        .set('page', this.throwbackmanager.getCurrentPage().toString());

        if(page){
          params=params.set('page', page.toString());//.set reicht nicht, muss neu zugewiesen werden
        }

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
            value.lng,
            value.location_name
          );
          newThrowbacks.push(newThrowback);
        });
        this.throwbackmanager.setnewPage(response.current_page, response.max_pages,newThrowbacks);

        resolve(newThrowbacks);

      }catch (error){
        reject(error)
      }
    })

  }

}

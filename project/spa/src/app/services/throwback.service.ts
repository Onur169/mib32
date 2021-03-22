/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Der alliance-Service beantragt für die alliance-Komponente die Daten zu den Bündnissen vom api-Service.
 *
 */

import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ThrowbackClass } from '../helpers/classes/ThrowbackClass';
import { ThrowbackManager } from '../helpers/classes/ThrowbackManager';
import { Throwback } from '../helpers/interfaces/Throwback';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ThrowbackService {
  throwbackmanager: ThrowbackManager;

  limit=false;

  constructor(private api: ApiService) {
    this.throwbackmanager=new ThrowbackManager();

  }

  async getNecessaryThrowbacks(page?: number){

    return new Promise<ThrowbackClass[]>(async (resolve, reject)=>  {
      try{


        let current=this.throwbackmanager.getCurrentPage();
        if(page){
          current=page;
          this.throwbackmanager.setCurrentPage(current);
        }


        console.log("currentPage",current, "maxPage", this.throwbackmanager.getMaxPages());
        if(!this.throwbackmanager.getPageValue(current)){
          await this.getThrowbacks(current);
        }


        if(!this.limit && this.throwbackmanager.hasNextPage() && !this.throwbackmanager.getPageValue(current+1)){
          console.log("hasNextPage",this.throwbackmanager.hasNextPage());
          await this.getThrowbacks(current+1);
        }
        if(this.throwbackmanager.hasPreviousPage() && !this.throwbackmanager.getPageValue(current-1)){
          console.log("hasPreviousPage",this.throwbackmanager.hasPreviousPage());
          await this.getThrowbacks(current-1);
        }



        resolve(this.throwbackmanager.getPageValue(current));

      }catch (error){
        reject(error)
      }
    })

  }

  async getThrowbacks(page?: number){
    return new Promise<ThrowbackClass[]>(async (resolve, reject) => {
      try{

        console.log("request");

        let params= new HttpParams()
        .set('page', this.throwbackmanager.getCurrentPage().toString());

        if(page){
          params=params.set('page', page.toString());//.set reicht nicht, muss neu zugewiesen werden
        }

        const Url='throwbacks';


        let response= await this.api.fetch(Url, params);

        let newThrowbacks: ThrowbackClass[]=[];

        (response.data as Throwback[]).forEach((value: Throwback) => {
          if(new Date().getTime()-new Date(value.end_at).getTime()>0){
          let newThrowback=new ThrowbackClass(
            value.id,
            value.name,
            value.description,
            value.social_media_video_url,
            value.start_at,
            value.end_at,
            value.lat,
            value.lng,
            value.location_name,
            value.description_shortened
          );
          newThrowbacks.push(newThrowback);
        }
        else{
          this.limit=true;
        }
      });
        this.throwbackmanager.setnewPage(response.current_page, response.max_pages,newThrowbacks);
        this.throwbackmanager.setMaxPages(response.max_pages);

        if(this.limit)this.throwbackmanager.setMaxPages(response.current_page);


        resolve(newThrowbacks);

      }catch (error){
        reject(error)
      }
    })

  }

}

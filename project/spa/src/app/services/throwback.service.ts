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

  constructor(private api: ApiService) {
    this.throwbackmanager=new ThrowbackManager();

  }

  async getallThrowbacks(){

    return new Promise<ThrowbackClass[]>(async (resolve, reject)=>  {
      try{

        if(this.throwbackmanager.getFirstThrowback()==undefined){
          await this.getThrowbacks();
        }
        for(let i=1; i<= this.throwbackmanager.getMaxPages(); i++){
          await this.getThrowbacks(i);
        }


        resolve(this.throwbackmanager.getallThrowbacksAsArray());

      }catch (error){
        reject(error)
      }
    })

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
            value.location_name,
            value.description_shortened
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

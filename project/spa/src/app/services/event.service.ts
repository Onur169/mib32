/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Der Event Service beschafft die Daten zu den aktuell gelisteten Klimastreiks von der API.
 *
 */

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MarkerManager } from '../helpers/classes/MarkerManager';
import { Demonstration } from '../helpers/interfaces/Demonstration';
import { EventResponse } from '../helpers/interfaces/EventResponse';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  markermanager: MarkerManager;
  private url: string;

  constructor(private http: HttpClient) {
    this.url='https://api.judoclub-rockenberg.de/climatestrike/events';
    this.markermanager=new MarkerManager();

  }

  fetch(page: number){
    return new Promise(async (resolve, reject) => {
      try{
        let params= new HttpParams()
        .set('page', page.toString());

        const RequestUrl=this.url;

        let response= await this.http.get<EventResponse>(RequestUrl, {params:params}).toPromise();

        this.markermanager.setnewPage(parseInt(response.current_page),response.data);
        this.markermanager.setMaxPages(response.max_pages);

        let x=parseInt(response.current_page.toString());
        this.markermanager.setCurrentPage(x);
       // this.markermanager.setCurrentPage(response.current_page);



        resolve(response);

      }catch (error){
        reject(error)
      }
    })

  }

}

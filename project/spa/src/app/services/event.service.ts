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
import { ApiConstants } from '../helpers/constants/APIConstants';
import { EventResponse } from '../helpers/interfaces/EventResponse';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  markermanager: MarkerManager;

  constructor(private http: HttpClient) {
    this.markermanager=new MarkerManager();

  }

  fetch(page: number){
    return new Promise(async (resolve, reject) => {
      try{
        let params= new HttpParams()
        .set('page', page.toString());

        const RequestUrl=ApiConstants.API_ENDPOINT+'events';

        let response= await this.http.get<EventResponse>(RequestUrl, {params:params}).toPromise();

        this.markermanager.setnewPage(response.current_page,response.data);
        this.markermanager.setMaxPages(response.max_pages);
        this.markermanager.setCurrentPage(response.current_page);

        resolve(response);

      }catch (error){
        reject(error)
      }
    })

  }

}
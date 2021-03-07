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
import { Marker } from '../helpers/classes/Marker';

import { MarkerManager } from '../helpers/classes/MarkerManager';
import { Demonstration } from '../helpers/interfaces/Demonstration';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  markermanager: MarkerManager;

  constructor(private api: ApiService) {
    this.markermanager=new MarkerManager();

  }

  async getEvents(){
    return new Promise(async (resolve, reject) => {
      try{
        let params= new HttpParams()
        .set('page', this.markermanager.getCurrentPage().toString());

        const Url='events';

        let response= await this.api.fetch(Url, params);

        let newThrowbacks: Marker[]=[];

        response.data.forEach((value: Demonstration) => {
          let newMarker=new Marker(
            value.id,
            value.name,
            value.description,
            value.start_at,
            value.end_at,
            value.lat,
            value.lng,
            value.location_name
            );
          newThrowbacks.push(newMarker);
        });
        this.markermanager.setnewPage(response.current_page, response.max_pages, newThrowbacks);

        resolve(response);

      }catch (error){
        reject(error)
      }
    })

  }

}

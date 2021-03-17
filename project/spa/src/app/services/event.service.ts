/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Der Event Service beschafft die Daten zu den aktuell gelisteten Klimastreiks für die timer-Komponente und der map-Komponente vom api-Service.
 *
 */

import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marker } from '../helpers/classes/Marker';

import { MarkerManager } from '../helpers/classes/MarkerManager';
import { Demonstration } from '../helpers/interfaces/Demonstration';
import { EventResponse } from '../helpers/interfaces/EventResponse';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  markermanager: MarkerManager;

  constructor(private api: ApiService) {
    this.markermanager = new MarkerManager();
  }

  /**
   * Diese Funktion führt die Funktion getEvents() aus
   * @param limiter -Ein optionaler Parameter, der nur solange Seiten abfrage, bis ein Zeitintervall bis zum Start eines Events überschritten wurde.
   * @param filter -Ein optionaler Filter-Parameter, funktioniert nur, wenn ein Limiter gesetzt wird.
   */
  async getPages(filter: string, longitude: number, latitude: number, radius: number) {
    //Wenn es einen Filter gibt z.B current_events...
    return new Promise<Marker[]>(async (resolve, reject) => {
try{
    await this.getEvents(filter, longitude, latitude, radius,this.markermanager.getCurrentPage().toString());

        //dann gehe bis zum Ende durch
        for (
          let i = this.markermanager.getCurrentPage();
          i <= this.markermanager.getMaxPages();
          i++
        ) {
          await this.getEvents(filter, longitude, latitude, radius,i.toString());
        }
          resolve(this.markermanager.getallMarkersAsArray());

      }catch(error){
        reject(error);
      }
    });
  }

  async getEvents(filter: string, longitude: number, latitude: number, radius: number, page: string) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        let params = new HttpParams()
        .set('page', page)
        .set('lng', longitude.toString())
        .set('lat', latitude.toString())
        .set('radius', radius.toString())
        .set('filter', filter);

        const Url = 'events';

        let response = await this.api.fetch(Url, params);

        if(response.data==undefined){

          console.log("no existing events")
        }
        let newThrowbacks: Marker[] = [];

        (response.data as Demonstration[]).forEach((value: Demonstration) => {
          let newMarker = new Marker(
            value.id,
            value.name,
            value.description,
            value.start_at,
            value.end_at,
            value.lat,
            value.lng,
            value.location_name,
            value.distance_meters,
            value.description_shortened
          );
          newThrowbacks.push(newMarker);
        });
        this.markermanager.setnewPage(
          response.current_page,
          response.max_pages,
          newThrowbacks
        );

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async getFirstValue() {
    return new Promise<Marker>(async (resolve, reject) => {
      try {
        let params = new HttpParams()
        .set('page', "1")
        .set('filter', 'current_events');

        const Url = 'events';

        let response = await this.api.fetch(Url, params);

        if(response.data==undefined){

          console.log("no existing events");
          reject();
        }

        let firstMarkerValues=response.data[0] as Demonstration;


          let newMarker = new Marker(
            firstMarkerValues.id,
            firstMarkerValues.name,
            firstMarkerValues.description,
            firstMarkerValues.start_at,
            firstMarkerValues.end_at,
            firstMarkerValues.lat,
            firstMarkerValues.lng,
            firstMarkerValues.location_name,
            firstMarkerValues.distance_meters,
            firstMarkerValues.description_shortened
          );
        resolve(newMarker);

      } catch (error) {
        reject(error);
      }
    });
  }

}

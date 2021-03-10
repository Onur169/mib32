/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Der Event Service beschafft die Daten zu den aktuell gelisteten Klimastreiks von der API.
 *
 */

import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marker } from '../helpers/classes/Marker';

import { MarkerManager } from '../helpers/classes/MarkerManager';
import { Demonstration } from '../helpers/interfaces/Demonstration';
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
  async getPages(filter?: string, limiter?: number) {
    //Wenn es einen Filter gibt z.B current_events...
    if (filter) {

      //und wenn es ein Limit gibt,...
      if (limiter) {

        let lastDate = this.markermanager
          .getLastValueOfCurrentPage()
          .getStartDate();
        let now = new Date();

        //dann gehe bis zum Ende durch
        for (
          let i = this.markermanager.getCurrentPage();
          i <= this.markermanager.getMaxPages();
          i++
        ) {
          //wenn das Zeit Intervall am ende der Seite überschritten ist, dann stop.
          if (limiter >= new Date(lastDate).getDay() - now.getDay()) {
            await this.getEvents(i.toString(), filter);
          } else {
            break;
          }
        }
      } else {
        for (
          let i = this.markermanager.getCurrentPage();
          i <= this.markermanager.getMaxPages();
          i++
        ) {
          //Wenn es keinen Filter gibt, dann gibt alles sortiert aus
          await this.getEvents(this.markermanager.getCurrentPage().toString());
        }
      }
    }
    //wenn es auch keinen Filter gibt, dann gibt nur die akutelle Seite aus
    else {
      await this.getEvents(this.markermanager.getCurrentPage().toString());
    }
  }

  async getEvents(page: string, filter?: string) {
    return new Promise(async (resolve, reject) => {
      try {
        let params = new HttpParams().set('page', page);

        if (filter) {
          params.set('filter', filter);
        }

        const Url = 'events';

        let response = await this.api.fetch(Url, params);

        if(response.data==undefined){

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
            value.location_name
          );
          newThrowbacks.push(newMarker);
        });
        this.markermanager.setnewPage(
          response.current_page,
          response.max_pages,
          newThrowbacks
        );

        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }
}

/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Der Event Service beschafft die Daten zu den aktuell gelisteten Klimastreiks von der API.
 *
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MarkerManager } from '../helpers/classes/MarkerManager';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  markermanager: MarkerManager;

  constructor(private http: HttpClient) {
    this.markermanager=new MarkerManager();
  }
}

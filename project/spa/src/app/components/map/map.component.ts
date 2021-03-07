import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

import "node_modules/ol/ol.css";
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
/*import VectorLayer from 'ol/layer/Vector';
import Icon from 'ol/style/Icon';
import { viewClassName } from '@angular/compiler';
import {Style, Fill, Stroke} from 'ol/style';
import { Coordinate } from 'ol/coordinate';*/

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  position: Navigator;

  private latitude: number = 51.165691;  //für Deutschland
  private longitude: number = 10.451526;
  private customCoords: number[] = [];

  private place: string;
  private markerLong: number;
  private markerLat: number;
  private time: number;
  //customLong: number = 0;
  //customLat: number = 0;
  map: any;


  constructor(private eventService: EventService) {
    this.position = navigator,
    this.place = "kein Streikort";
    this.markerLat = 0;
    this.markerLong = 0;
    this.time = 0;
  }


  ngOnInit() {
    this.getGeoCoords();

    this.getMarker();
    

    this.inizializeMap();

    console.log(this.customCoords);
    let x: number = this.customCoords[0];
    console.log(x);
    //console.log(this.customLat, this.customLong);
  }


 private inizializeMap(): void {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
         source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([this.longitude, this.latitude]),
        zoom: 6
      })
    });
  }

  getGeoCoords(){
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      this.customCoords.push(position.coords.latitude);
      this.customCoords.push(position.coords.longitude);
      /*this.customLat = position.coords.latitude;
      this.customLong = position.coords.longitude;
      console.log(this.customLat, this.customLong);
      return this.customLat;*/
     return this.customCoords;
    });
  }

  async getMarker(){
    await this.eventService.getEvents();
    console.log(this.eventService.markermanager);
  }
}

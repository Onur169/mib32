import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

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

  latitude: number = 51.165691;  //für Deutschland
  longitude: number = 10.451526;
  customCoords: number[] = [];
  //customLong: number = 0;
  //customLat: number = 0;
  map: any;


  constructor(eventService: EventService) {
    this.position=navigator
  }


  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      this.customCoords.push(position.coords.latitude, position.coords.longitude);
      /*this.customLat = position.coords.latitude;
      this.customLong = position.coords.longitude;
      console.log(this.customLat, this.customLong);
      return this.customLat;*/
     return this.customCoords;
    });

    this.inizializeMap();

    console.log(this.customCoords);
    console.log(this.customCoords[1]);
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
}

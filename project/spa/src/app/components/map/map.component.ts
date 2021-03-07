import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
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

    this.getCoords();
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

async getCoords(){

    await this.fetchAdress().then(position =>{
      this.customCoords.push(position.coords.latitude);
      this.customCoords.push(position.coords.longitude);
    }).catch((err) => {
      console.error(err.message);
    });

    console.log(this.customCoords);
}


  fetchAdress(options?: PositionOptions): Promise<GeolocationPosition>{
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }
}

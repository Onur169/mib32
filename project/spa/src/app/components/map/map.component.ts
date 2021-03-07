import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
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

  latitude: number = 50.426784399999995;  //für Deutschland
  longitude: number = 8.85863;
  customCoords: number[] = [];
  private map!: Map;


  constructor(eventService: EventService) {
    this.position=navigator
  }


  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      this.customCoords.push(position.coords.latitude, position.coords.longitude);
      return this.customCoords;
    });

    this.inizializeMap();

    console.log(this.customCoords[0]);
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
        center: [this.latitude, this.longitude],
        zoom: 7
      })
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import { viewClassName } from '@angular/compiler';
/*import proj4 from 'proj4';
import {get as getProjection, register} from 'ol/proj';*/

declare var ol: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  position: Navigator;

  latitude: number;
  longitude: number;
  map: any;

  constructor(eventService: EventService) {
    this.position=navigator,
    this.latitude = 10.402658558602,
    this.longitude = 51.20606218452899;
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
    });

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: olProj.fromLonLat([this.latitude, this.longitude]),
        zoom: 6
      })
    });

    /*proj4.defs('EPSG:27700', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 ' +
    '+x_0=400000 +y_0=-100000 +ellps=airy ' +
    '+towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 ' +
    '+units=m +no_defs');
    register(proj4);
    var proj27700 = getProjection('EPSG:27700');
    proj27700.setExtent([0, 0, 700000, 1300000]);*/

  }

}

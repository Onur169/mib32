import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import {
  DragRotateAndZoom,
  defaults as defaultInteractions,
} from 'ol/interaction';
import {FullScreen, defaults as defaultControls} from 'ol/control';
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

  public latitude: number = 51.165691;  //für Deutschland
  public longitude: number = 10.451526;
  public customLat: number = 0;
  public customLong: number = 0;
  public Marker: any;

  public place: string;
  public markerLong: number;
  public markerLat: number;
  public time: number;
  public day: Date;

  private map?: Map=undefined;
  private mapSkalaValue: number;


  constructor(private eventService: EventService) {
    this.position = navigator,
    this.place = "kein Streikort";
    this.markerLat = 0;
    this.markerLong = 0;
    this.time = 0;
    this.day = new Date();
    this.mapSkalaValue=50;
  }


  ngOnInit() {
    this.getCoords();

    //this.checkLongLatOfUser();

   this.getMarker();

    this.inizializeMap();
  }

 private inizializeMap(): void {
    this.map = new Map({
      controls: defaultControls().extend([new FullScreen()]),
      layers: [
        new TileLayer({
         source: new OSM()
        })
      ],
      target: 'map',
      view: new View({
        //der Nutzerort wird angezeigt
        center: fromLonLat([this.longitude, this.latitude]),
        zoom: 10
      }),
      interactions: defaultInteractions().extend([new DragRotateAndZoom()])
    });
  }

  //speichert Breitengrad und Längengrad des Nutzers
async getCoords(){
    await this.fetchAdress().then(position =>{
      this.customLat = position.coords.latitude;
      this.customLong = position.coords.longitude;
    }).catch((err) => {
      this.customLat = this.latitude;
      this.longitude = this.longitude;
      console.error(err.message);
    });

    console.log(this.customLat, this.customLong);
}

  fetchAdress(options?: PositionOptions): Promise<GeolocationPosition>{
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });

  }

  async getMarker(){
    await this.eventService.getPages("current_events");


    console.log(this.eventService.markermanager.getMarkers());
  }

   /* console.log(this.eventService.markermanager.getMarkers());

    console.log(this.eventService.markermanager.getNextEvent());

    console.log(this.eventService.markermanager);*
  }

  /*checkLongLatOfUser(){
   if(this.customLong == 0 || this.customLong == undefined && this.customLat == 0 || this.customLat == undefined){
     this.customLong = this.longitude;
     this.customLat = this.latitude;
   }
  }*/

  /*addMarkersToMap(map: Map ): void {
    this.eventService.then((res: any) => {
      for (const c of res.features) {
        const lat = c.geometry.coordinates[0];
        const lon = c.geometry.coordinates[1];
        const marker = L.marker([lon, lat]).addTo(map);
      }
    });
  }*/

  formatLabel(value: number) {
    if (value >= 1000) {
      console.log(Math.round(value / 1000) + 'k');
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  //wird nach jedem Slide neu ausgeführt
  calculateEvents(value: number|null) {
    if(value!=null){
      this.mapSkalaValue=value;
    }

  }
}

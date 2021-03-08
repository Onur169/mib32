/**
 * @param createdBy
 * Anna Glomb
 * @param authors
 * Anna Glomb, Christian Knoth
 * @param summary
 * Die Map-Komponente erfüllt sämtliche Aufgaben zur Darstellung unserer Map-Features
 * (und lässt momentan erst erste Seite des Paginators seitens der API laden und lädt die anderen Seiten nach).
 */


import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

import "node_modules/ol/ol.css";
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Marker } from 'src/app/helpers/classes/Marker';
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

  circle: number = 0;

  public latitude: number = 51.165691;  //für Deutschland
  public longitude: number = 10.451526;
  public customLat: number = 0;
  public customLong: number = 0;
  public marker: Marker[][] = [];
  public mapMarker: Marker[] = [];
  public currentEvent: Marker | undefined = undefined;
  public limiter = 0;

  public place: string;
  public markerLong: number;
  public markerLat: number;
  public time: number;
  public day: Date;
  private  map: any;


  constructor(
    private eventService: EventService
    ) {

    this.position = navigator,
    this.place = "kein Streikort";
    this.markerLat = 0;
    this.markerLong = 0;
    this.time = 0;
    this.day = new Date();
  }


  ngOnInit() {
    this.getCoords();

    this.getMarker();
    
    this.inizializeMap();
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
        //der Nutzerort wird angezeigt
        center: fromLonLat([this.customLong, this.customLat]),
        zoom: 10
      })
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
}

  fetchAdress(options?: PositionOptions): Promise<GeolocationPosition>{
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  async getMarker(){
    await this.eventService.getPages("current_events");

    this.eventService.markermanager.getMarkers().forEach ( index => {
      this.marker.push(index);
    })

    this.currentEvent = this.eventService.markermanager.getNextEvent();

    //fitlert alle Events mit dem nächsten Datum aus
    this.marker.forEach( (value:any) =>{
      value.filter((startday: any) => {
        if(startday === this.currentEvent){
         this.mapMarker.push(startday);
        }
      })
    });

    //rechnet die Tage bis zum nächsten Event aus. Dies ermöglicht später alle Marker des zeitlichen Events abzurufen
   this.limiter = Math.floor( ((new Date (this.currentEvent!.getStartDate()).getTime()) - new Date().getTime()) / ( 1000 * 60 * 60 * 24));

    //sobald es ein Event gibt, dann werden weitere Seiten angefragt
    if (this.limiter > 0){
    // await this.eventService.getPages("current_events", this.limiter);

     //speichert neue Marker hinzu
     this.eventService.markermanager.getMarkers().forEach ( (value, index)  => {
      value.filter( value => {
       if (value != this.mapMarker[index]){
         this.mapMarker.push(value);
       }
   });
});  
    }
  }

  //errechnet den Umkreis und gibt die entsprechenden Marker aus
  CalculateCircle(): Marker[]{
    return this.eventService.markermanager.getNextEvents(this.customLong, this.customLat, this.mapMarker, this.circle);
  }

  //fügt alle Marker, die für den Nutzer in Frage kommen der Map hinzu
  addMarkersToMap(map: Map ): void {
    this.mapMarker.forEach((res: Marker) => {
        const lat = res.getLat();
        const lon = res.getLng();
        //const marker = L.marker([lon, lat]).addTo(map);
      });
    }
}
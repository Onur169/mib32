/**
 * @param createdBy
 * Anna Glomb
 * @param authors
 * Anna Glomb, Christian Knoth
 * @param summary
 * Die Map-Komponente erfüllt sämtliche Aufgaben zur Darstellung unserer Map-Features
 * (und lässt momentan erst erste Seite des Paginators seitens der API laden und lädt die anderen Seiten nach).
 */


import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj';
import { Marker } from 'src/app/helpers/classes/Marker';
import {
  DragRotateAndZoom,
  defaults as defaultInteractions,
} from 'ol/interaction';
import {FullScreen, defaults as defaultControls} from 'ol/control';
import VectorLayer from 'ol/layer/Vector';
import Icon from 'ol/style/Icon';
import { viewClassName } from '@angular/compiler';
import {Style, Fill, Stroke} from 'ol/style';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit, AfterViewInit {

  position: Navigator;

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

  private map?: Map=undefined;
  private mapSkalaValue: number;


  constructor(
    private eventService: EventService
    ) {

    this.position = navigator,
    this.place = "kein Streikort";
    this.markerLat = 0;
    this.markerLong = 0;
    this.time = 0;
    this.day = new Date();
    this.mapSkalaValue=50;
  }
  ngOnInit(): void {
    this.getCoords();

    this.getMarker(30);//blubb

    this.inizializeMap();

  }


  ngAfterViewInit() {
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
}

  fetchAdress(options?: PositionOptions): Promise<GeolocationPosition>{
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  async getMarker(limiter: number){
    await this.eventService.getPages();

    await this.eventService.getPages("current_events", limiter);

    this.eventService.markermanager.getMarkers().forEach ( index => {
      this.marker.push(index);
    });

    this.currentEvent = this.eventService.markermanager.getNextEvent();


    //rechnet die Tage bis zum  nächsten Event aus. Dies ermöglicht später alle Marker des zeitlichen Events abzurufen
   this.limiter = Math.floor( ((new Date (this.currentEvent!.getStartDate()).getTime()) - new Date().getTime()) / ( 1000 * 60 * 60 * 24));

    //sobald es ein Event gibt, dann werden weitere Seiten angefragt
    if (this.limiter > 0){
    await this.eventService.getPages("current_events", this.limiter);

     //speichert neue Marker hinzu
     this.eventService.markermanager.getMarkers().forEach ( (value, index)  => {
      value.filter( value => {
       if (value != this.mapMarker[index]){
         this.mapMarker.push(value);
       }
   });
});  

  console.log(this.mapMarker);
    }

    this.addMarkersToMap(this.map!);
    console.log(this.marker);
    console.log(this.mapMarker);
  }

  //errechnet den Umkreis und gibt die entsprechenden Marker aus
  CalculateCircle(): void{
    this.mapMarker =  this.eventService.markermanager.getNextEvents(this.customLong, this.customLat, this.mapMarker, this.mapSkalaValue);
    console.log(this.mapMarker);
  }

  //fügt alle Marker, die für den Nutzer in Frage kommen der Map hinzu
  addMarkersToMap(map: Map ): void {
    this.CalculateCircle();
    this.mapMarker.forEach((res: Marker) => {
        let lat = res.getLat();
        let lon = res.getLng();
      let  layer = new VectorLayer({
        source: new VectorSource({
            features: [
                new Feature({
                    geometry: new Point(fromLonLat([lon, lat]))
                })]
        }), 
        style: new Style({
          image: new Icon({
            anchor: [0.5, 0.5],
            //anchorXUnits: "fraction",
            //anchorYUnits: "fraction",
            src: "../../assets/location_map_icon.svg"
          })
        })
  });
    map.addLayer(layer);
    });
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      console.log(Math.round(value / 1000) + 'km');
      return Math.round(value / 1000) + 'km';
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

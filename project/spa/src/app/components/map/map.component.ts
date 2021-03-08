/**
 * @param createdBy
 * Anna Glomb
 * @param authors
 * Anna Glomb, Christian Knoth
 * @param summary
 * Die Map-Komponente erfüllt sämtliche Aufgaben zur Darstellung unserer Map-Features
 * (und lässt momentan erst erste Seite des Paginators seitens der API laden und lädt die anderen Seiten nach).
 */


import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
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
import {Style, Fill, Stroke, Text} from 'ol/style';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { Coordinate } from 'ol/coordinate';
import {Cluster} from 'ol/source';
import CircleStyle from 'ol/style/Circle';
import Layer from 'ol/layer/Layer';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  position: Navigator;
  public locationSearch: string | Event = ""; 
 

  public defaultLonLat: Coordinate;//für Deutschland
  public latitude: number;
  public longitude: number;
  public customLonLat: Coordinate = [0];
  public customLat: number = 0;
  public customLong: number = 0;
  public marker: Marker[][] = [];
  public mapMarker: Marker[] = [];
  public mapDistanceMarker: Marker[] = [];
  public currentEvent: Marker | undefined = undefined;
  public limiter = 0;
  public mapView: View = new View ();

  public place: string;
  public time: number;
  public day: Date;

  private map?: Map=undefined;
  private mapSkalaValue: number;


  constructor(
    private eventService: EventService
    ) {

    this.position = navigator,
    this.place = "kein Streikort";
    this.time = 0;
    this.day = new Date();
    this.mapSkalaValue=50;
    this.latitude = 51.165691;
    this.longitude = 10.451526;
    this.defaultLonLat = [this.longitude, this.latitude];
    this.limiter = 30;
  }

  //personalisierter Standort wird abgefragt
  //die Map wird mit personalisiertem Standort befüllt
  //personalisierte Marker werden gesetzt
  ngOnInit(): void {
    this.getCoords();
    
    this.getMarker(this.limiter);
  }

//die Map wird mit dem Standort des Nutzers gefüllt
 private inizializeMap(lonLat: Coordinate): void {
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
        center: fromLonLat(lonLat),
        zoom: 10
      }),
      interactions: defaultInteractions().extend([new DragRotateAndZoom()])
    });
  }

  //speichert Breitengrad und Längengrad des Nutzers
  // und zeigt diese auf der Map an
async getCoords(){
    await this.fetchAdress().then(position =>{
      this.customLat = position.coords.latitude;
      this.customLong = position.coords.longitude;
      this.customLonLat = [position.coords.longitude, position.coords.latitude];
    }).catch((err) => {
      this.customLonLat = this.defaultLonLat;
      console.error(err.message);
    });
    console.log(this.customLong, this.customLat, this.customLonLat);

    this.inizializeMap(this.customLonLat);
  }

  fetchAdress(options?: PositionOptions): Promise<GeolocationPosition>{
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  async getMap(map: Map): Promise<View>{
    return new Promise(async (resolve, reject) => {
      try{
        let newMapView = await map.getView();
        resolve(newMapView);
      } catch (error) {
        reject(error);
    };
  });
}

  //fragt den eventService mit einer festen Anzahl an Zahlen und filtert den Response nach dem zeitlich aukutellen Event 
  //zudem werden personalisierte Marker auf der Map angezeigt
  async getMarker(limiter: number){
    await this.eventService.getPages();

    await this.eventService.getPages("current_events", limiter);

    this.eventService.markermanager.getMarkers().forEach ( index => {
      this.marker.push(index);
    });

    this.currentEvent = this.eventService.markermanager.getNextEvent();

     //filtert alle Einträge nach dem zeitlich nächsten Event und speichert sie in einem extra Array (mapMarker) ab
     this.eventService.markermanager.getMarkers().forEach ( (value, index)  => {
      value.filter( value => {
       if (value.getStartDate() == this.currentEvent!.getStartDate()){
         this.mapMarker.push(value);
       }
   });
});

    this.calculateDistance(this.mapSkalaValue);
  }

  //errechnet den Umkreis und gibt die entsprechenden Marker aus
  private calculateDistance(scala:number, lon?: number, lat?: number): void{
    this.mapDistanceMarker = this.mapMarker;
    let coords: Coordinate;
    if ( lon != undefined && lat != undefined){
      coords = fromLonLat([lon!, lat!]) ;
      this.mapDistanceMarker =  this.eventService.markermanager.getNextEvents(lon!, lat!, this.mapMarker, scala);
      this.map!.getView().setCenter(coords);
      this.markerCluster(this.map!, this.mapMarker); 
    }else{
      this.mapDistanceMarker =  this.eventService.markermanager.getNextEvents(this.customLong, this.customLat, this.mapMarker, scala);
      this.markerCluster(this.map!, this.mapMarker); 
    }
  }

  //Marker richten sich nach dem Map-Zoom und die Marker werden zusammengefasst angezeigt
 private  async markerCluster(map: Map, marker: Marker[]){

  this.mapView = await this.getMap(map);
   let zoom =  this.mapView.getZoom();

   switch (zoom) {
   case 0-5: {
     let distance = 300;
     this.markerClusterFill(marker, distance, zoom, map);
break;
  }
  case 6-10: {
    let distance = 100;
    this.markerClusterFill(marker, distance, zoom, map);
break;
  }
  default: {
    let distance = 0;
    this.markerClusterFill(marker, distance, zoom!, map);
  }
}
}

  //befüllt die Map mit Marker
private markerClusterFill(marker: Marker[], distance:number, zoom:number, mapScreen: Map){
//alle Marker werden dargestellt
let features = new Array(marker.length);
let lonLat: Coordinate;
marker.forEach( (value, index: number) => {
lonLat = fromLonLat([value.getLng(), value.getLat()]);
features[index] = new Feature(new Point(lonLat));
});

let source = new VectorSource({
features: features,
});

let clusterSource = new Cluster({
distance: distance,
source: source,
});

let styleCache: any[] = [] ;
let clusters = new VectorLayer({
source: clusterSource,
style: function (feature) {
let size: number = feature.get('features').length;
let style = styleCache[size];
if (!style) {
  style = new Style({
    image: new CircleStyle({
      radius: 15,
      stroke: new Stroke({
        color: '#CA054D',
      }),
      fill: new Fill({
        color: '#CA054D',
      }),
    }),
    text: new Text({
      text: size.toString(),
      fill: new Fill({
        color: '#fff',
      }),
    }),
  });
  styleCache[size] = style;
}
return style;
},
});

mapScreen.addLayer(clusters);
mapScreen.getView().setZoom(zoom);
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      console.log(Math.round(value / 1000) + 'km');
      return Math.round(value / 1000) + 'km';
    }

    return value;
  }

  //wird nach jedem Slide neu ausgeführt
  //Marker werden neu positioniert
  calculateEvents(value: number|null) {
    if(value!=null){
      this.mapSkalaValue=value;
    }

    this.calculateDistance(this.mapSkalaValue);
  }

  //Sucht nach den Ort und gibt die Marker aus 
  //die Position der MAp verändert sich nach dem Ort und gibt die Marker dementsprechend raus
  searchLoacation(){
    console.log(this.locationSearch);
    this.mapMarker = new Array();
    if(this.locationSearch != null){

     this.marker.forEach( value  => {
       value.filter( value => {
        if (value.getLocationName() === this.locationSearch){
          this.mapMarker.push(value);
        }
       });
     });
     this.calculateDistance(this.mapSkalaValue, this.mapMarker[0].getLng(), this.mapMarker[0].getLat());
    }
    console.log(this.mapMarker);
   
  }


  deleteValue(){
    this.locationSearch = "";
  }
}

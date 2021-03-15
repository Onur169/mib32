/**
 * @param createdBy
 * Anna Glomb
 * @param authors
 * Anna Glomb, Christian Knoth
 * @param summary
 * Die Map-Komponente erfüllt sämtliche Aufgaben zur Darstellung unserer Map-Features
 * (und lässt momentan erst erste Seite des Paginators seitens der API laden und lädt die anderen Seiten nach).
 */
 import { gsap } from 'gsap';
 import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Component, OnInit } from '@angular/core';
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
import { FullScreen, defaults as defaultControls } from 'ol/control';
import VectorLayer from 'ol/layer/Vector';
import { Style, Fill, Text } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import { Feature, Overlay } from 'ol';
import Point from 'ol/geom/Point';
import { Coordinate } from 'ol/coordinate';
import { Cluster } from 'ol/source';
import CircleStyle from 'ol/style/Circle';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  position: Navigator;
  public locationSearch: string = "";
  public error: string = "";


  public defaultLonLat: Coordinate; //für Deutschland
  public latitude: number;
  public longitude: number;
  public customLonLat!: Coordinate;
  public customLat: number = 0;
  public customLong: number = 0;
  public marker: Marker[][] = [];
  public mapMarker: Marker[] = [];
  public mapDistanceMarker: Marker[] = [];
  public currentEvent: Marker | undefined = undefined;
  public limiter = 0;
  public mapView: View = new View();

  public place: string = '';
  public day: string = '';
  public hasEventMarker: boolean = true;

  private map?: Map = undefined;
  private mapSkalaValue: number;

  constructor(private eventService: EventService) {
    (this.position = navigator), (this.mapSkalaValue = 50);
    this.latitude = 51.165691;
    this.longitude = 10.451526;
    this.defaultLonLat = [this.longitude, this.latitude];
    this.limiter = 50;
  }

  //personalisierter Standort wird abgefragt
  //die Map wird mit personalisiertem Standort befüllt
  //personalisierte Marker werden gesetzt
  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.scrollUp();
    this.getCoords();

    this.getMarker(this.limiter, 8);
  }

  ngAfterContentInit() {
    this.inizializeMap(this.customLonLat, 6);
    this.calculateDistance(this.mapSkalaValue);
  }

  //die Map wird mit dem Standort des Nutzers gefüllt
  private inizializeMap(lonLat: Coordinate, zoom:number): void {
    lonLat = this.checkCoordinate(lonLat);
    this.map = new Map({
      controls: defaultControls().extend([new FullScreen()]),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: new View({
        //der Nutzerort wird angezeigt
        center: fromLonLat(lonLat),
        zoom: zoom,
      }),
      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
    });
  }

  //speichert Breitengrad und Längengrad des Nutzers
  //und zeigt diese auf der Map an zudem werden Marker nachgeladen
  async getCoords() {
    await this.fetchAdress()
      .then((position) => {
        this.customLat = position.coords.latitude;
        this.customLong = position.coords.longitude;
        this.customLonLat = [
          position.coords.longitude,
          position.coords.latitude,
        ];
      })
      .catch((err) => {
        this.customLonLat = this.defaultLonLat;
        this.customLat = this.latitude;
        this.customLong = this.longitude;
        console.error(err.message);
      });

    //entweder werden Marker von einem Default value geladen oder von dem Standort des Nutzers
    this.calculateDistance(this.mapSkalaValue, this.customLong, this.customLat, 9);
  }

  fetchAdress(options?: PositionOptions): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  //Zuweisung der Coordinaten damit die Map mit Coordinaten befüllt werden kann
  checkCoordinate(lonLat: Coordinate):Coordinate{
    if(lonLat == undefined){
      this.customLonLat = this.defaultLonLat;
      return lonLat = this.defaultLonLat;
    }else{
      return lonLat;
    }
  }

  //fragt den eventService mit einer festen Anzahl an Zahlen und filtert den Response nach dem zeitlich aukutellen Event
  //zudem werden personalisierte Marker auf der Map angezeigt
  async getMarker(limiter: number, zoom:number) {
    await this.eventService.getPages();

    await this.eventService.getPages('current_events', limiter);

    //Marker werden lokal gespeichert
    this.eventService.markermanager.getMarkers().forEach((index) => {
      this.marker.push(index);
    });

    this.currentEvent = this.eventService.markermanager.getNextEvent();

    //filtert alle Einträge nach dem zeitlich nächsten Event und speichert sie in einem extra Array (mapMarker) ab
    //zeigt die Marker an
    this.eventService.markermanager.getMarkers().forEach((value, index) => {
      value.filter((value) => {
        if (value.getStartDate() == this.currentEvent!.getStartDate()) {
          this.mapMarker.push(value);
        }
      });
    });
    this.checkEventMarker(this.mapMarker);
    this.calculateDistance(this.mapSkalaValue, 12);

  }

    /**
   *printed alle Marker auf der Map, die sich innerhalb des ausgewählten Radius befinden
   *@param scala -die Entfernung in Km
   *@param lon -optionaler Parameter, der Breitengrad des eigenen Standorts kann mitgegeben werden
   *@param lat -optionaler Parameter, der Längengrad des eigenen Standorts kann mitgegeben werden
   *@param zoom -optionaler Parameter, Möglichkeit den Zoom mitzugeben
  **/
  private calculateDistance(scala: number, lon?: number, lat?: number, zoom?: number): void {
    this.mapDistanceMarker = this.mapMarker;
    let coords: Coordinate;
    if (lon != undefined && lat != undefined) {
      coords = fromLonLat([lon!, lat!]);
      this.mapDistanceMarker = this.eventService.markermanager.getNextEvents(
        lon!,
        lat!,
        this.mapMarker,
        scala
      );
      this.map!.getView().setCenter(coords);
      this.markerCluster(this.map!, this.mapMarker);
      if(zoom){
        this.map!.getView().setZoom(zoom);
      }
    } else {
      this.mapDistanceMarker = this.eventService.markermanager.getNextEvents(
        this.customLong,
        this.customLat,
        this.mapMarker,
        scala
      );
      this.markerCluster(this.map!, this.mapMarker);
    }
  }

  //Marker richten sich nach dem Map-Zoom und die Marker werden zusammengefasst angezeigt
  private markerCluster(map: Map, marker: Marker[]) {
    this.mapView = map.getView();
    let zoom = this.mapView.getZoom();

    //je nach dem wie die Map zu sehen ist werden Marker zusammengefasst und ausgegeben
    switch (zoom) {
      case 0 - 5: {
        let distance = 300;
        this.markerClusterFill(marker, distance, zoom, map);
        break;
      }
      case 6 - 10: {
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
  private markerClusterFill(
    marker: Marker[],
    distance: number,
    zoom: number,
    mapScreen: Map
  ) {

    let features = new Array(marker.length);
    let lonLat: Coordinate;

    //Zugriff auf HTML-Elemente, damit die Map mit den Elementen arbeiten kann
    let container = document.getElementById('popup');
    let content = document.getElementById('popup-content');
    let closer = document.getElementById('popup-closer');

    let Mname: string;
    let loc: string = '';
    let date: string;
    let text: string[] = new Array(2);

    text[0] = 'Du streikst in ';
    text[1] = 'am ';

    //Marker werden mit Koordinaten befüllt
    marker.forEach((value, index: number) => {
      lonLat = fromLonLat([value.getLng(), value.getLat()]);
      features[index] = new Feature({
        geometry: new Point(lonLat),
        name: value.getLocationName(),
        population: 4000,
        rainfall: 500,
        popupAnchor: [0, -15],
      });

      //die Informationen des Markers werden gespeichert
      Mname = value.getName();
      loc = value.getLocationName();
      date = new Date(value.getStartDate()).toLocaleDateString('de-DE', {
        weekday: 'long' /*, year: 'numeric'*/,
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
      });

      let source = new VectorSource({
        features: features,
      });

      let clusterSource = new Cluster({
        distance: distance,
        source: source,
      });

      //die Darstellung des Marker-Popups wird erstellt
      var overlay = new Overlay({
        element: container!,
        autoPan: true,
        autoPanAnimation: {
          duration: 250,
        },
      });

      closer!.onclick = function () {
        overlay.setPosition(undefined);
        closer!.blur();
        return false;
      };

      //style des Markers wird definiert
      let styleCache: any[] = [];
      let clusters = new VectorLayer({
        source: clusterSource,
        style: function (feature) {
          let size: number = feature.get('features').length;
          let style = styleCache[size];
          if (!style) {
            style = new Style({
              image: new CircleStyle({
                radius: 12,
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

      //hier werden alle Daten in die Map geladen
      mapScreen.addLayer(clusters);
      mapScreen.getView().setZoom(zoom);
      mapScreen.addOverlay(overlay);

      //beim Klicken auf die Map erscheint ein Popup mit einem bestimmten Inhalt 
    mapScreen.on('singleclick', function (event) {
      if (mapScreen.hasFeatureAtPixel(event.pixel) === true) {
          var coordinate = event.coordinate;
          content!.innerHTML =  '<div><code>' +
          Mname +
          '</code> </br>' +
          text[0] +
          loc +
          '</code> </br>' +
          text[1] +
          date +
          '</code>';
          overlay.setPosition(coordinate);
      } else {
          overlay.setPosition(undefined);
          closer!.blur();
      }
    });
    this.place = 'in ' + loc;
    this.day = 'am ' + date!;
  });
  }

  //Hilfsfunktion um den Umkreis im Browser richtig darzusstellen
  formatLabel(value: number) {
    if (value >= 1000) {
      console.log(Math.round(value / 1000) + 'km');
      return Math.round(value / 1000) + 'km';
    }
    return value;
  }

  //wird nach jedem Slide neu ausgeführt
  //Marker werden neu positioniert
  calculateEvents(value: number | null) {
    if (value != null) {
      this.mapSkalaValue = value;
    }

    this.calculateDistance(this.mapSkalaValue);
  }

  //Sucht nach den Ort und gibt die Marker aus
  //die Position der Map verändert sich nach dem Ort und gibt die Marker dementsprechend raus
  searchLoacation() {
    this.mapMarker = new Array();
    if (this.locationSearch != '') {
      this.mapMarker.forEach((value) => {
        if (
          value.getLocationName().toLowerCase() ===
          this.locationSearch.toLowerCase()
        ) {
          this.mapMarker.push(value);
        }
      });
    }

    //ein Text erscheint wenn es keinen Streik gibt
    if (this.mapMarker.length > 0) {
      this.calculateDistance(
        this.mapSkalaValue,
        this.mapMarker[0].getLng(),
        this.mapMarker[0].getLat()
      );
    } else {
      this.error =
        'Leider finden in dieser Stadt momentan keine Streiks statt. Schaue bitte zu einem späteren Zeitpunkt vorbei';
    }
  }

  //löscht den Wert aus dem Inputfenster
  deleteValue() {
    this.locationSearch = '';
  }

checkEventMarker(marker:Marker[]):void{
  if(marker == []){
    this.hasEventMarker = false;
  }else{
    this.hasEventMarker = true;
  }
}

  ////////////////////GSAP///////////////////


  scrollUp(){
    var tl=gsap.from(".display-4",{
      scrollTrigger: {
        trigger:".search_input",
        start:"bottom 90%",
        end:"bottom 70%",
        scrub: true,
        markers: false,
        toggleActions:"restart pause reverse pause" //wenn sichtbar, wenn nicht sichtbar, wenn wieder zurück
      },
      y: -100,
      opacity:0
    });


  }
}

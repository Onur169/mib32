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

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { ViewportService } from 'src/app/services/viewport.service';
import Geometry from 'ol/geom/Geometry';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  private userPosition: Coordinate=[8.665360, 50.591690];

  private mapView: View = new View();
  private map: any;
  private markers: Marker[] = [];

  place='';
  day='';
  error='';

  searchedLocationValue:string='';

  mapSuccess= false;
  mapSliderValue: number=0;
  sliderChanged=false;

  private clusters: VectorLayer=new VectorLayer();
  private overlay: Overlay=new Overlay({
    element: document.getElementById('popup')!
  });

  constructor(private eventService: EventService, private viewport: ViewportService) {
    this.overlay.setPosition(undefined);
  }

  //personalisierter Standort wird abgefragt
  //die Map wird mit personalisiertem Standort befüllt
  //personalisierte Marker werden gesetzt
  ngOnInit(): void {

  }

  ngAfterViewInit(){
    this.buildMap();
  }

  async buildMap(){
    await this.initMap(10);
    await this.renderMap(50);
    if(!this.viewport.getIsMobile())this.scrollUp();
  }

  //die Map wird mit dem Standort des Nutzers gefüllt
  private initMap(zoom:number): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {

   try{

    /*Setze bei Berechtigung den eigenen Marker, wenn nicht dann den default Wert*/
    let newCoords: Coordinate=await this.getCoords() as Coordinate;
    if(newCoords.length>0){
     this.userPosition=newCoords;
    }

     this.map= new Map({
      controls: defaultControls().extend([new FullScreen()]),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
      view: new View({
        //der Nutzerort wird angezeigt
        center: fromLonLat(this.userPosition),
        zoom: zoom,
      }),
      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
    });
    this.mapSuccess=true;
    resolve();
  }catch(error){
    reject(error);
  }
    });
  }

  //speichert Breitengrad und Längengrad des Nutzers
  async getCoords(): Promise<Coordinate> {
    return new Promise<Coordinate>(async (resolve, reject) => {
    try{
      let position=await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      resolve([position.coords.longitude,position.coords.latitude])
      }catch(error){
        resolve(this.userPosition);
      }
  });
  }

async renderMap(radius: number){
  console.log("render Map", radius, "Längengrad",this.userPosition[0], "Breitengrad",this.userPosition[1]);
  let allmarkers=await this.eventService.getPages('current_events', this.userPosition[0], this.userPosition[1], radius);

  this.markers = allmarkers;

  this.markerCluster(allmarkers);

}

  //Marker richten sich nach dem Map-Zoom und die Marker werden zusammengefasst angezeigt
  private markerCluster(marker: Marker[]) {
    this.mapView = this.map.getView();
    let zoom = this.mapView.getZoom();

    let distance=10;

if(zoom){
    //je nach dem wie die Map zu sehen ist werden Marker zusammengefasst und ausgegeben
    if(zoom>0 && zoom <= 8){
      distance = 40;
    }else if(zoom > 8 && zoom <=10){
      distance = 60;
    }
     this.drawMap(marker, distance, zoom, this.map);
    }
  }

  //befüllt die Map mit geclusterten Markern
  private drawMap(
    marker: Marker[],
    distance: number,
    zoom: number,
    mapScreen: Map
  ) {

if(!(marker.length>0)){

      mapScreen.removeLayer(this.clusters);
    }
    else{

    let features: Feature<Geometry>[] = [];

    //Zugriff auf HTML-Elemente, damit die Map mit den Elementen arbeiten kann
    let container = document.getElementById('popup');
    container!.style.display='block';
    let content = document.getElementById('popup-content');
    let closer = document.getElementById('popup-closer');

    //Marker werden mit Koordinaten befüllt
    marker.forEach(value => {
      features.push(new Feature({
        geometry: new Point(fromLonLat([value.getLng(), value.getLat()])),
        name: value.getLocationName(),
        population: 4000,
        rainfall: 500,
        popupAnchor: [0, -15],
      }));

      let source = new VectorSource({
        features: features,
      });

      let clusterSource = new Cluster({
        distance: distance,
        source: source,
      });

      mapScreen.removeOverlay(this.overlay);
      //die Darstellung des Marker-Popups wird erstellt
      this.overlay = new Overlay({
        element: container!,
        autoPan: true,
        autoPanAnimation: {
          duration: 500,
        },
      });

      mapScreen.removeLayer(this.clusters);

      //style des Markers wird definiert
      let styleCache: any[] = [];
      this.clusters = new VectorLayer({
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
      mapScreen.addLayer(this.clusters);
      mapScreen.addOverlay(this.overlay);

      if(closer){
      closer.onclick=()=> {
        this.overlay.setPosition(undefined);
        closer!.blur();
        return false;}
      };

      //beim Klicken auf die Map erscheint ein Popup mit einem bestimmten Inhalt
});
    mapScreen.on('singleclick',  (event) => {

    if (!mapScreen.hasFeatureAtPixel(event.pixel)){
      this.overlay.setPosition(undefined);
      }

     for(let j=0; j<=marker.length-1;j++) {
      var feature=mapScreen.forEachFeatureAtPixel(event.pixel, (feature, layer)=>{
        var coordinate = event.coordinate;
        let markerCoords=new Point(fromLonLat([marker[j].getLng(),marker[j].getLat()]));

        let a=feature.getGeometry()!.getExtent()
        let b=markerCoords.getExtent()
        console.log(j,feature.getGeometry()!.getExtent()==markerCoords.getExtent(),feature.getGeometry()!.getExtent(),markerCoords.getExtent());
        if(a[0]==b[0] && a[1]==b[1]){
          content!.innerHTML =  '<div><code>' +
         marker[j].getName() +
          '</code> </br>' +
           "Du streikst am "+
          marker[j].getStartDate() +
          '</code> </br>' +
          "in " +
          marker[j].getLocationName() +
          '</code>';
          this.overlay.setPosition(coordinate);
          mapScreen.getView().setCenter(coordinate);

          const options: Intl.DateTimeFormatOptions = {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        };

          this.place = ', in ' + marker[j].getLocationName();
          this.day = 'Am ' + new Date(marker[j].getStartDate()).toLocaleString('de-DE', options);

          document.getElementById('next_demo_box')!.style.opacity="1";
          document.getElementById('next_demo_box')!.style.position="relative";
          ScrollTrigger.refresh(true);

        }
      })
        }
      });
    }

  }

//sucht nach Events die sich in dem Ort befinden
//zentriert das erste Event auf der Map
//bildet die treffenden Marker auf der Map ab
searchLocation(){
  let searchmarker: Marker[] = [];
if(this.searchedLocationValue){
    for (let marker of this.markers){
      if(marker.getLocationName().toLocaleLowerCase() === this.searchedLocationValue.toLocaleLowerCase())
      searchmarker.push(marker);
    }
    if(searchmarker.length > 0){
      this.map.removeLayer(this.clusters);
      this.map.getView().setCenter(fromLonLat([searchmarker[0].getLng(), searchmarker[0].getLat()]));
      this.markerCluster(searchmarker);
    }else{
      this.error = 'Leider findet in Deiner Nähe keine Aktion statt';
    }
  }else{
      this.error = 'Leider findet in Deiner Nähe keine Aktion statt';
    }
}
//löcht two-way-binding
deleteValue(){
  this.searchedLocationValue ='';
  this.error = '';
}

getSliderValue(value: number){
  this.mapSliderValue = value;
  this.renderMap(value);
  this.sliderChanged = true;
}

  ////////////////////GSAP///////////////////


  scrollUp(){

    gsap.registerPlugin(ScrollTrigger);

    var tl=gsap.from("#map_head",{
      scrollTrigger: {
        trigger:"#map_head",
        start:"bottom 90%",
        end:"bottom 70%",
        scrub: true,
        markers: false,
        toggleActions:"restart pause reverse pause" //wenn sichtbar, wenn nicht sichtbar, wenn wieder zurück
      },
      y: -100,
      opacity:0
    });


    var t2=gsap.from("#map_cover",{
      scrollTrigger: {
        trigger:"#map_cover",
        start:"bottom 90%",
        end:"bottom 70%",
        scrub: true,
        markers: false,
        toggleActions:"restart pause reverse pause"
      },

      opacity:0
    });


    var t3=gsap.from("#map_search",{
      scrollTrigger: {
        trigger:"#map_search",
        start:"bottom 90%",
        end:"bottom 70%",
        scrub: true,
        markers: false,
        toggleActions:"restart pause reverse pause"
      },
      opacity:0
    });


    var t4=gsap.from("#next_demo",{
      scrollTrigger: {
        trigger:"#next_demo",
        start:"bottom 90%",
        end:"bottom 70%",
        scrub: true,
        markers: false,
        toggleActions:"restart pause reverse pause"
      },
      scale:0.6
    });

  }
}

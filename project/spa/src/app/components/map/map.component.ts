import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
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


  constructor(eventService: EventService) {
    this.position=navigator,
    this.latitude = 78,
    this.longitude = 56;
  }

  map: any;

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
    });
 
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([73.8567, 18.5204]),
        zoom: 8
      })
    });

}

}

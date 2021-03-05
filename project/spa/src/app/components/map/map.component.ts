import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  position: Navigator;

  constructor(eventService: EventService) {
    this.position=navigator;
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
    });
  }

}

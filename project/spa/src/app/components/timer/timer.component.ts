/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Anna Glomb, Christian Knoth
 * @param summary
 * Die Marker-Klasse repräsentiert ein instanziertes Event und wird im Rahmen der Timer- und der Event-Komponente genutzt.
 */

import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  constructor(private event_service: EventService) { }

  async ngOnInit(): Promise<void> {
  await  this.event_service.fetch(this.event_service.markermanager.getCurrentPage());
  console.log(this.event_service.markermanager.getMarkers());
  }

}

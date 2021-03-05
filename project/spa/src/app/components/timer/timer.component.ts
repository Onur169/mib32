/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Anna Glomb, Christian Knoth
 * @param summary
 * Die Timer-Komponente erfüllt sämtliche Aufgaben zur Darstellung unseres Timer-Features
 * (und lässt momentan die erste Seite des Paginators seitens der API laden).
 */

import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  private subscription: Subscription;

  public dateNow = new Date();
  public dDay = new Date('Jan 01 2021 00:00:00');
  public timeDifference: number;
  public secondsToDday: number;
  public minutesToDday: number;
  public hoursToDday: number;
  public daysToDday: number;

  public gDate: string;

  public hasNewEvent: boolean;

  private milliSecondsInASecond: number = 1000;
  private hoursInADay: number = 24;
  private minutesInAnHour: number = 60;
  private SecondsInAMinute: number = 60;

  constructor(private event_service: EventService) {
    this.timeDifference = 0;
    this.secondsToDday = 0;
    this.minutesToDday = 0;
    this.hoursToDday = 0;
    this.daysToDday = 0;

    this.gDate = 'kein Streik geplant';
    this.hasNewEvent = false;

    this.subscription = interval(1000).subscribe((x) => {
      this.getTimeDifference();
    });
  }

  ngOnInit() {
    this.setProperties();
  }

  //hier werden momentan die Events auf der ersten Seite angefragt. aus dem ersten Event wird ein Timer angelegt und das Datum als Property gesetzt
  async setProperties() {
    await this.event_service.fetch(
      this.event_service.markermanager.getCurrentPage()
    );

    console.log(
      new Date(
        this.event_service.markermanager.getNextEvent()!.start_at
      ).getTime() - this.dateNow.getTime()
    );

    if (
      this.event_service.markermanager.getNextEvent()!.start_at &&
      new Date(
        this.event_service.markermanager.getNextEvent()!.start_at
      ).getTime() -
        this.dateNow.getTime() >
        0
    ) {
      this.hasNewEvent = true;

      let newestDate: Date = new Date(
        this.event_service.markermanager.getNextEvent()!.start_at!
      );

      this.subscription = interval(1000).subscribe((x) => {
        this.getTimeDifference(newestDate);
      });

      this.gDate = newestDate.toLocaleDateString('de-DE', {
        weekday: 'long' /*, year: 'numeric'*/,
        month: 'long',
        day: 'numeric',
        hour: 'numeric'
      });
    }
  }

  private getTimeDifference(newdate?: Date) {
    if (newdate) {
      this.dDay = newdate;
    }
    this.timeDifference = this.dDay.getTime() - new Date().getTime();

    this.allocateTimeUnits(this.timeDifference);
  }

  //rechnet Zeit in Tage, Stunden, etc. um
  private allocateTimeUnits(timeDifference: number) {
    this.secondsToDday = Math.floor(
      (timeDifference / this.milliSecondsInASecond) % this.SecondsInAMinute
    );
    this.minutesToDday = Math.floor(
      (timeDifference / (this.milliSecondsInASecond * this.minutesInAnHour)) %
        this.SecondsInAMinute
    );
    this.hoursToDday = Math.floor(
      (timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute)) %
        this.hoursInADay
    );
    this.daysToDday = Math.floor(
      timeDifference /
        (this.milliSecondsInASecond *
          this.minutesInAnHour *
          this.SecondsInAMinute *
          this.hoursInADay)
    );
  }
}

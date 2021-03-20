/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Anna Glomb, Christian Knoth
 * @param summary
 * Die Timer-Komponente erfüllt sämtliche Aufgaben zur Darstellung unseres Timer-Features
 * (und lässt momentan die erste Seite des Paginators seitens der API laden).
 */
 import { gsap } from "gsap";

import { Component, HostListener, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { ViewportService } from "src/app/services/viewport.service";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  private subscription: Subscription;

  public dateNow = new Date();
  public dDay = new Date();
  public timeDifference: number;
  public secondsToDday: number;
  public minutesToDday: number;
  public hoursToDday: number;
  public daysToDday: number;

  public gDate: string;
  public location: string="";

  public hasNewEvent: boolean;

  private milliSecondsInASecond: number = 1000;
  private hoursInADay: number = 24;
  private minutesInAnHour: number = 60;
  private SecondsInAMinute: number = 60;

  constructor(private eventService: EventService, private viewport: ViewportService) {
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

    let timer=await this.eventService.getFirstValue();

    if(timer){

    this.location=timer.getLocationName();
    let startTime=new Date(timer.getStartDate());

    if (
      startTime &&
      new Date(
        startTime
      ).getTime() -
        this.dateNow.getTime() >
        0
    ) {
      this.hasNewEvent = true;

      this.subscription = interval(1000).subscribe((x) => {
        this.getTimeDifference(startTime);
      });

      this.gDate =  startTime.toLocaleDateString('de-DE', {
        weekday: 'long' /*, year: 'numeric'*/,
        month: 'long',
        day: 'numeric',
        hour: 'numeric'
      });
    }
    if(!this.viewport.getIsMobile())this.slideEffect();
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

  ////////////////////GSAP/////////////////////
  @HostListener('window:resize', ['$event'])
  slideEffect(){
    var tl = gsap.timeline();

    tl.to({}, 1, {});
    tl.to("#content_box" ,{duration: 1, opacity: 1, ease: "power1.out"});//0.0 sec
    tl.to("#banner" ,{duration: 1, x: 0, opacity:1 , ease: "power1.out"});//0.0 sec  from to

  }
}

/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Anna Glomb, Christian Knoth
 * @param summary
 * Die Marker-Klasse repräsentiert ein instanziertes Event und wird im Rahmen der Timer- und der Event-Komponente genutzt.
 */

import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  private subscription: Subscription;

  public dateNow = new Date();
  public dDay = new Date('Jan 01 2021 00:00:00');
  public timeDifference:number;
  public secondsToDday:number;
  public minutesToDday:number;
  public hoursToDday:number;
  public daysToDday:number;

  public gDate: string;

  private milliSecondsInASecond :number= 1000;
  private hoursInADay :number= 24;
  private minutesInAnHour :number= 60;
  private SecondsInAMinute  :number= 60;

  constructor(private event_service: EventService) {
    this.timeDifference=0;
    this.secondsToDday=0;
    this.minutesToDday=0;
    this.hoursToDday=0;
    this.daysToDday=0;

    this.gDate="Unbekanntes Datum";

    this.subscription = interval(1000)
           .subscribe(x => { this.getTimeDifference(); });
  }

  ngOnInit(){

    this.setProperties()

  }

  async setProperties(){
    await  this.event_service.fetch(this.event_service.markermanager.getCurrentPage());

    let newestDate: Date=new Date(this.event_service.markermanager.getNextEvent()!.start_at!);

  this.subscription = interval(1000)
          .subscribe(x => { this.getTimeDifference(newestDate); });

          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          this.gDate=newestDate.toLocaleDateString('de-DE', options);
  }

  private getTimeDifference (newdate?: Date) {

    if(newdate){
      this.dDay=newdate;
    }
      this.timeDifference = this.dDay.getTime() - new  Date().getTime();

    this.allocateTimeUnits(this.timeDifference);
}

private allocateTimeUnits (timeDifference: number) {
  this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
  this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
  this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
  this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
}

}

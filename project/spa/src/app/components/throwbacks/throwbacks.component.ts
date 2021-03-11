import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ThrowbackClass } from 'src/app/helpers/classes/ThrowbackClass';
import { ThrowbackService } from 'src/app/services/throwback.service';

@Component({
  selector: 'app-throwbacks',
  templateUrl: './throwbacks.component.html',
  styleUrls: ['./throwbacks.component.scss'],
})
export class ThrowbacksComponent implements OnInit {
  throwbackPage: ThrowbackClass[];
  throwbacks: ThrowbackClass[];
  maxPage = 0;
  page = 1;

  constructor(
    private throwbackService: ThrowbackService,
    private datepipe: DatePipe
    ) {
    (this.throwbackPage = []), (this.throwbacks = []);
  }

  ngOnInit() {
    this.setProperties();
  }

  async setProperties() {
    this.throwbackPage = await this.throwbackService.getThrowbacks();

    this.setMaxPage();
    this.throwbacks = this.preThrowback(this.throwbackPage);
  }

  async getNewPage(page: number) {
    this.throwbackPage = await this.throwbackService.getThrowbacks(page);
    this.setMaxPage();
  }

  setMaxPage() {
    this.maxPage = this.throwbackService.throwbackmanager.getMaxPages() * 10;
  }

  //filtert alle eingehenden Rückblicke, ob sie in der Vergangenheit liegen
  //kürzt die Beschreibung, wenn sie zu lang ist
  preThrowback(throwback: ThrowbackClass[]): ThrowbackClass[] {
    let yday: Date = new Date();
    let fyday: string = " ";
    let filtered: ThrowbackClass[] = [];
    yday.setDate(yday.getDate() - 1);
    fyday = this.datepipe.transform(yday, 'yyyy-MM-dd hh:mm:ss')?.toString()!;

    //es wird nach vergangenen Events geschaut und in einem neuen Array gespeichert
    if(throwback != []){
      throwback.filter((value) => {
        if (value.getstartDate().toString() < fyday) {
          filtered.push(value);
        }
      });

    //wenn es vergangene Rückblicke gibt dann kürze den Text
    if (filtered == []) {
      return filtered;
    } else {
      let newthrowback: ThrowbackClass[] = [];
      let letters: number = 70;
      let desc: string = ' ';

      filtered.forEach((value) => {
        //schaut ob was dirn ist...
        if (value.getDescription()) {
          value.setDescription(value.getDescription().slice(0, letters));

          //geht den string zu einem Wort durch
          while (value.getDescription().slice(-1) != ' ') {
            console.log('hallo');
            desc = value.getDescription().slice(0, letters - 1);
            console.log(desc);
            value.setDescription(desc);
            letters--;
          }

          desc = value.getDescription() + '...';
          value.setDescription(desc);
          newthrowback.push(value);

        } else {
          newthrowback.push(value);
        }
      });

      return newthrowback;
    }
    }else{
  return throwback;
}
  }
}

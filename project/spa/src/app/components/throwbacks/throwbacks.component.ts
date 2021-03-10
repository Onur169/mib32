import { Component, OnInit } from '@angular/core';
import { ThrowbackClass } from 'src/app/helpers/classes/ThrowbackClass';
import { ThrowbackService } from 'src/app/services/throwback.service';
import { isCallOrNewExpression } from 'typescript';

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

  constructor(private throwbackService: ThrowbackService) {
    (this.throwbackPage = []), (this.throwbacks = []);
  }

  ngOnInit() {
    this.setProperties();
  }

  async setProperties() {
    this.throwbackPage = await this.throwbackService.getThrowbacks();

    this.setMaxPage();
    this.preThrowback(this.throwbackPage);
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
    yday.setDate(yday.getDate() - 1);

    console.log(throwback);

    //wenn was drin ist
    /* if(throwback){
      throwback.filter((value) => {
        if (value.getstartDate() < yday) {
          console.log();
          throwback.push(value);
        }
      });*/

    //wenn es vergangene Rückblicke gibt dann kürze den Text
    if (throwback == []) {
      return throwback;
    } else {
      console.log('ich habe was');

      let newthrowback: ThrowbackClass[] = [];
      let letters: number = 70;
      let desc: string = " ";

      throwback.forEach((value) => {
        value.setDescription(value.getDescription().slice(0, letters));
        while(value.getDescription().slice(-1)  != " "){
          for (let i = 0; i <= letters; i++){
            desc = value.getDescription().slice(0, letters-1);
            value.setDescription(desc);
          }
        }
        console.log(value.getDescription());
        newthrowback.push(value);
      });
      console.log(newthrowback);

      return newthrowback;
    }
    /*}else{
  return throwback;
}*/
  }
}

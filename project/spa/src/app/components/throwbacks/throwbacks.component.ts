import { Component, OnInit } from '@angular/core';
import { ThrowbackClass } from 'src/app/helpers/classes/ThrowbackClass';
import { ThrowbackService } from 'src/app/services/throwback.service';

@Component({
  selector: 'app-throwbacks',
  templateUrl: './throwbacks.component.html',
  styleUrls: ['./throwbacks.component.scss'],
})
export class ThrowbacksComponent implements OnInit {
  throwbackPages = new Map<number, ThrowbackClass[]>();
  throwbacks: ThrowbackClass[];
  maxPage = 0;
  page = 1;

  constructor(
    private throwbackService: ThrowbackService
  ) {
    this.throwbacks = [];
  }

  ngOnInit() {
    this.setProperties();
  }

  async setProperties() {

    await this.throwbackService.getallThrowbacks();
    this.throwbackPages = this.throwbackService.throwbackmanager.reCreatePages(5);
    this.setNewPage(1);
    this.setMaxPage(this.throwbackPages.size);
  }

  setMaxPage(size: number) {
    this.maxPage = size * 10;
  }

  async setNewPage(page: number) {
    if (this.throwbackPages.get(page)) {
      this.throwbacks = this.throwbackPages.get(page)!;
    } else {
      this.throwbacks = this.throwbackPages.get(
        this.throwbackService.throwbackmanager.getCurrentPage()
      )!;
    }
  }

  //kürzt die Beschreibung, wenn sie zu lang ist
  preThrowback(throwback: ThrowbackClass[]): ThrowbackClass[] {
    let filtered: ThrowbackClass[] = [];

    let letters: number = 70;
    let desc: string = ' ';

    throwback.forEach((value) => {
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
        filtered.push(value);
      } else {
        filtered.push(value);
      }
    });

    return filtered;
  }
}

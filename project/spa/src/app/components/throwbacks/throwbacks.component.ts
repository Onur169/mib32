/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth, Anna Glomb
 * @param summary
 * Die Throwback-Komponente erfüllt sämtliche Aufgaben zur Darstellung unseres Rückblick-Features und
 * bezieht ihre dargestellten Daten aus dem throwback-Service.
 */
import { Component, OnInit } from '@angular/core';
import { ThrowbackClass } from 'src/app/helpers/classes/ThrowbackClass';
import { ThrowbackService } from 'src/app/services/throwback.service';

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ViewportService } from 'src/app/services/viewport.service';
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
  hasThrowback: boolean = false;

  constructor(private throwbackService: ThrowbackService, private viewport: ViewportService) {
    this.throwbacks = [];
  }

  ngOnInit() {
   this.setProperties();
  }

  ngAfterViewInit(){
    if(!this.viewport.getIsMobile())this.scrollUp();
  }

  async setProperties() {

   await this.throwbackService.getallThrowbacks();
    this.throwbackPages = this.throwbackService.throwbackmanager.reCreatePages(5);
    this.setNewPage(1);
    this.setMaxPage(this.throwbackPages.size);

    if(this.throwbacks.length > 0){
      this.hasThrowback =true;
    }else{
      this.hasThrowback = false;
    }

this.preThrowback(this.throwbacks);
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
          desc = value.getDescription().slice(0, letters - 1);
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

      ////////////////////GSAP///////////////////


      scrollUp(){

    gsap.registerPlugin(ScrollTrigger);

        var tl=gsap.from("#throwback_head",{
          scrollTrigger: {
            trigger:"#throwback_head",
            start:"bottom 90%",
            end:"bottom 70%",
            scrub: true,
            markers: false,
            toggleActions:"restart pause reverse pause" //wenn sichtbar, wenn nicht sichtbar, wenn wieder zurück
          },
          y: -100,
          opacity:0
        });

        var t2=gsap.from("#throwback_cover",{
          scrollTrigger: {
            trigger:"#throwback_cover",
            start:"bottom 90%",
            end:"bottom 70%",
            scrub: true,
            markers: false,
            toggleActions:"restart pause reverse pause"
          },

          opacity:0
        });

      }
}

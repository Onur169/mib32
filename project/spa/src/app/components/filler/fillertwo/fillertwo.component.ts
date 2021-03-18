/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Die Fillertwo-Komponente erfüllt sämtliche Aufgaben zur Darstellung unserer Filler-Features
 * (Storytelling: soll dem Nutzer simulieren)
 */

import { Component, HostListener, OnInit } from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ViewportService } from 'src/app/services/viewport.service';
@Component({
  selector: 'app-fillertwo',
  templateUrl: './fillertwo.component.html',
  styleUrls: ['./fillertwo.component.scss']
})
export class FillertwoComponent implements OnInit {

  constructor(private viewport: ViewportService) { }

  ngOnInit(): void {

  }
  ngAfterViewInit(){
    if(!this.viewport.getIsMobile())this.scrollUp();
  }


      ////////////////////GSAP///////////////////
      scrollUp(){

        gsap.registerPlugin(ScrollTrigger);
        var t1=gsap.from("#fillertwo_bg",{
          scrollTrigger: {
            trigger:"#fillertwo_bg",
            start:"top 90%",
            end:"center 75%",
            scrub: true,
            markers: false,
            toggleActions:"restart pause reverse pause" //wenn sichtbar, wenn nicht sichtbar, wenn wieder zurück
          },
          opacity:0
        });

        var t2=gsap.from("#fillertwo_box",{
          scrollTrigger: {
            trigger:"#fillertwo_box",
            start:"top 80%",
            end:"top 50%",
            scrub: true,
            markers: false,
            toggleActions:"restart pause reverse pause" //wenn sichtbar, wenn nicht sichtbar, wenn wieder zurück
          },
          x: -500
        });

      }

}

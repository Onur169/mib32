/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Die Fillerfour-Komponente erfüllt sämtliche Aufgaben zur Darstellung unserer Filler-Features
 * (Storytelling: soll dem Nutzer simulieren)
 */

import { Component, OnInit } from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ViewportService } from 'src/app/services/viewport.service';

@Component({
  selector: 'app-fillerfour',
  templateUrl: './fillerfour.component.html',
  styleUrls: ['./fillerfour.component.scss']
})
export class FillerfourComponent implements OnInit {

  constructor(private viewport: ViewportService) { }

  ngOnInit(): void {
    if(!this.viewport.getIsMobile())this.scrollUp();
  }


  scrollUp(){

    gsap.registerPlugin(ScrollTrigger);

    var t1=gsap.from("#fillerfour_bg",{
      scrollTrigger: {
        trigger:"#fillerfour_bg",
        start:"top 90%",
        end:"center 60%",
        scrub: true,
        markers: false,
        toggleActions:"restart pause reverse pause" //wenn sichtbar, wenn nicht sichtbar, wenn wieder zurück
      },
      opacity:0
    });

    var t2=gsap.from("#fillerfour_box",{
      scrollTrigger: {
        trigger:"#fillerfour_box",
        start:"top 75%",
            end:"top 50%",
            scrub: true,
            markers: false,
            toggleActions:"restart pause reverse pause" //wenn sichtbar, wenn nicht sichtbar, wenn wieder zurück
          },
          x: -500
        });
  }
}

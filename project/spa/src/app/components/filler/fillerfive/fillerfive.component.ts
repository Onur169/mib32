import { Component, OnInit } from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Component({
  selector: 'app-fillerfive',
  templateUrl: './fillerfive.component.html',
  styleUrls: ['./fillerfive.component.scss']
})
export class FillerfiveComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.scrollUp();
  }


  scrollUp(){

    gsap.registerPlugin(ScrollTrigger);

    var t1=gsap.from("#fillerfive_bg",{
      scrollTrigger: {
        trigger:"#fillerfive_bg",
        start:"top 90%",
        end:"center 60%",
        scrub: true,
        markers: false,
        toggleActions:"restart pause reverse pause" //wenn sichtbar, wenn nicht sichtbar, wenn wieder zurück
      },
      opacity:0
    });

    var t2=gsap.from("#fillerfive_box",{
      scrollTrigger: {
        trigger:"#fillerfive_box",
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

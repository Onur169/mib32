import { Component, OnInit } from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
@Component({
  selector: 'app-fillerone',
  templateUrl: './fillerone.component.html',
  styleUrls: ['./fillerone.component.scss']
})
export class FilleroneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.scrollUp();
  }


  scrollUp(){
    var tl=gsap.from(".intro",{
      scrollTrigger: {
        trigger:".intro",
        start:"top 80%",
        end:"top 50%",
        scrub: true,
        markers: false,
        toggleActions:"restart pause reverse pause" //wenn sichtbar, wenn nicht sichtbar, wenn wieder zurück
      },
      x: -1000,
      opacity:0
    });

    var t2=gsap.from(".filler_bg",{
      scrollTrigger: {
        trigger:".filler_bg",
        start:"top 90%",
        end:"center 60%",
        scrub: true,
        markers: true,
        toggleActions:"restart pause reverse pause" //wenn sichtbar, wenn nicht sichtbar, wenn wieder zurück
      },
      opacity:0
    });
  }
}

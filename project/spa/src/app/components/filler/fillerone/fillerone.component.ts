import { Component, OnInit } from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ViewportService } from 'src/app/services/viewport.service';
@Component({
  selector: 'app-fillerone',
  templateUrl: './fillerone.component.html',
  styleUrls: ['./fillerone.component.scss']
})
export class FilleroneComponent implements OnInit {

  constructor(private viewport: ViewportService) { }

  ngOnInit(): void {
    if(!this.viewport.getIsMobile())this.scrollUp();
  }


  scrollUp(){

    gsap.registerPlugin(ScrollTrigger);

    var t1=gsap.from("#fillerone_bg",{
      scrollTrigger: {
        trigger:"#fillerone_bg",
        start:"top 90%",
        end:"center 60%",
        scrub: true,
        markers: false,
        toggleActions:"restart pause reverse pause" //wenn sichtbar, wenn nicht sichtbar, wenn wieder zurück
      },
      opacity:0
    });

    var t2=gsap.from("#fillerone_box",{
      scrollTrigger: {
        trigger:"#fillerone_box",
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

import { Component, HostListener, OnInit } from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
@Component({
  selector: 'app-fillertwo',
  templateUrl: './fillertwo.component.html',
  styleUrls: ['./fillertwo.component.scss']
})
export class FillertwoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
  ngAfterViewInit(){
    this.scrollUp();
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

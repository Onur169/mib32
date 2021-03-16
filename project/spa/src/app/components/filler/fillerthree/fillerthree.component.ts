import { Component, OnInit } from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ViewportService } from 'src/app/services/viewport.service';
@Component({
  selector: 'app-fillerthree',
  templateUrl: './fillerthree.component.html',
  styleUrls: ['./fillerthree.component.scss']
})
export class FillerthreeComponent implements OnInit {

  constructor(private viewport: ViewportService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(){
    if(!this.viewport.getIsMobile())this.scrollUp();
  }


  scrollUp(){

    gsap.registerPlugin(ScrollTrigger);

    var t1=gsap.from("#fillerthree_bg",{
      scrollTrigger: {
        trigger:"#fillerthree_bg",
        start:"top 90%",
        end:"center 60%",
        scrub: true,
        markers: false,
        toggleActions:"restart pause reverse pause" //wenn sichtbar, wenn nicht sichtbar, wenn wieder zurück
      },
      opacity:0
    });

    var t2=gsap.from("#fillerthree_box",{
      scrollTrigger: {
        trigger:"#fillerthree_box",
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

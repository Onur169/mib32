import { Component, OnInit } from '@angular/core';

import { ViewportService } from 'src/app/services/viewport.service';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from 'gsap';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {

  constructor(private viewport: ViewportService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    if(!this.viewport.getIsMobile())this.scrollUp();

   // ScrollTrigger.refresh(true);
  }

  scrollUp(){

    gsap.registerPlugin(ScrollTrigger);

        var tl=gsap.from("#active_head",{
          scrollTrigger: {
            trigger:"#active_head",
            start:"bottom 90%",
            end:"bottom 70%",
            scrub: true,
            markers: false,
            toggleActions:"restart pause reverse pause" //wenn sichtbar, wenn nicht sichtbar, wenn wieder zurück
          },
          y: -100,
          opacity:0
        });

        var t2=gsap.from("#active_cover",{
          scrollTrigger: {
            trigger:"#active_cover",
            start:"bottom 90%",
            end:"bottom 70%",
            scrub: true,
            markers: false,
            toggleActions:"restart pause reverse pause"
          },
          opacity:0
        });
        
        /*boxes */
        var t3=gsap.from("#first_activebox",{
          scrollTrigger: {
            trigger:"#first_activebox",
            start:"top 100%",
            end:"top 80%",
            scrub: true,
            markers: true,
            toggleActions:"restart pause reverse pause"
          },
          y: 200
        });

        var t4=gsap.from("#second_activebox",{
          scrollTrigger: {
            trigger:"#second_activebox",
            start:"top 100%",
            end:"top 70%",
            scrub: true,
            markers: false,
            toggleActions:"restart pause reverse pause"
          },
          y: 200
        });

        var t5=gsap.from("#third_activebox",{
          scrollTrigger: {
            trigger:"#third_activebox",
            start:"top 100%",
            end:"top 60%",
            scrub: true,
            markers: false,
            toggleActions:"restart pause reverse pause"
          },
          y: 200
        });

        var t6=gsap.from("#fourth_activebox",{
          scrollTrigger: {
            trigger:"#fourth_activebox",
            start:"top 100%",
            end:"top 50%",
            scrub: true,
            markers: false,
            toggleActions:"restart pause reverse pause"
          },
          y: 200
        });
      }

}

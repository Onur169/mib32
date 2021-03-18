/**
 * @param createdBy
 * Anna Glomb
 * @param authors
 * Anna Glomb, Christian Knoth
 * @param summary
 * Die FAQ-Komponente erfüllt sämtliche Aufgaben zur Darstellung unserer FAQ-Features
 * die Daten sind statisch und werden nicht aus der API bezogen
 */

import { Component, OnInit } from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ViewportService } from 'src/app/services/viewport.service';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor(private viewport: ViewportService) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(){
    if(!this.viewport.getIsMobile())this.scrollUp();

   // ScrollTrigger.refresh(true);
  }
  scrollUp(){

    gsap.registerPlugin(ScrollTrigger);

        var tl=gsap.from("#faq_head",{
          scrollTrigger: {
            trigger:"#faq_head",
            start:"bottom 90%",
            end:"bottom 70%",
            scrub: true,
            markers: false,
            toggleActions:"restart pause reverse pause" //wenn sichtbar, wenn nicht sichtbar, wenn wieder zurück
          },
          y: -100,
          opacity:0
        });

        var t2=gsap.from("#faq_cover",{
          scrollTrigger: {
            trigger:"#faq_cover",
            start:"bottom 90%",
            end:"bottom 70%",
            scrub: true,
            markers: false,
            toggleActions:"restart pause reverse pause"
          },
          opacity:0
        });

        /*boxes */
        var t3=gsap.from("#first_faqbox",{
          scrollTrigger: {
            trigger:"#first_faqbox",
            start:"top 100%",
            end:"top 96%",
            scrub: true,
            markers: true,
            toggleActions:"restart pause reverse pause"
          },
          y: 200
        });

        var t4=gsap.from("#second_faqbox",{
          scrollTrigger: {
            trigger:"#second_faqbox",
            start:"top 100%",
            end:"top 94%",
            scrub: true,
            markers: false,
            toggleActions:"restart pause reverse pause"
          },
          y: 200
        });

        var t5=gsap.from("#third_faqbox",{
          scrollTrigger: {
            trigger:"#third_faqbox",
            start:"top 100%",
            end:"top 92%",
            scrub: true,
            markers: false,
            toggleActions:"restart pause reverse pause"
          },
          y: 200
        });

        var t6=gsap.from("#fourth_faqbox",{
          scrollTrigger: {
            trigger:"#fourth_faqbox",
            start:"top 100%",
            end:"top 90%",
            scrub: true,
            markers: false,
            toggleActions:"restart pause reverse pause"
          },
          y: 200
        });

        var t7=gsap.from("#fifth_faqbox",{
          scrollTrigger: {
            trigger:"#fifth_faqbox",
            start:"top 100%",
            end:"top 88%",
            scrub: true,
            markers: false,
            toggleActions:"restart pause reverse pause"
          },
          y: 200
        });

        var t8=gsap.from("#leak",{
          scrollTrigger: {
            trigger:"#leak",
            start:"bottom 95%",
            end:"bottom 80%",
            scrub: true,
            markers: false,
            toggleActions:"restart pause reverse pause"
          },
          opacity: 0
        });

        var t8=gsap.from("#faq",{
          scrollTrigger: {
            trigger:"#faq",
            start:"top 70%",
            end:"top 50%",
            scrub: true,
            markers: false,
            toggleActions:"restart pause reverse pause"
          },
          opacity: 0
        });

      }


}

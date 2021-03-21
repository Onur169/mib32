/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Anna Glomb, Christian Knoth
 * @param summary
 * Die Testimonial-Komponente erfüllt sämtliche Aufgaben zur Darstellung unseres Testimonial-Features und
 * bezieht ihre dargestellten Daten aus dem testimonial-Service.
 */
import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TestimonialClass } from 'src/app/helpers/classes/TestimonialClass';
import { TestimonialService } from 'src/app/services/testimonial.service';

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ViewportService } from 'src/app/services/viewport.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent implements OnInit {
  scrHeight: number = 0;
  scrWidth: number = 0;

  manyEntress: number=0;
  //zeigt den Viewport an

  private allTestimonials: TestimonialClass[] = [];
  chosenTestimonials: TestimonialClass[] = [];
  urls: SafeUrl[]=[];
  hasTestimonials: boolean = false;
  hasMore: boolean = false;

  public setOfTestimonials: Map<number, TestimonialClass[]> = new Map();

  constructor(private testimonialService: TestimonialService, private viewport: ViewportService, public domsanitizer: DomSanitizer) {
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.fillTestimonials();
  }
  async fillTestimonials() {
    await this.getTestimonials();

    this.buildTestimonalView();
    ScrollTrigger.refresh(true);

  }


  ngAfterViewInit(){
    if(!this.viewport.getIsMobile())this.scrollUp();
  }

  @HostListener('window:resize', ['$event'])
  async buildTestimonalView(){

    this.getScreenSize();
    this.setTestimonialsSet(this.manyEntress);
  }


  async getTestimonials() {
    let manager = this.testimonialService.testimonialManager;
    await this.testimonialService.fetchTestimonials();
    if (manager.getPageValue(manager.getCurrentPage())) {
      await this.iterateTestimonials();
    }
    console.log("testis",manager.getAllValues());
  }

  async iterateTestimonials() {
    let manager = this.testimonialService.testimonialManager;

    if (manager.hasNextPage()) {
      await this.testimonialService.fetchTestimonials(manager.getNextPage());
      await this.iterateTestimonials();
    }
    else{
      this.allTestimonials=manager.getAllValues();
    }
  }

  setTestimonialsSet(elements: number) {
    this.chosenTestimonials=[];
    this.urls=[];
    let length=this.allTestimonials.length
    if(elements<length)length=elements;
    if(length>0)this.hasTestimonials=true;
    for(let i=0; i<length; i++){
      this.chosenTestimonials.push(this.allTestimonials[i]);

    if (this.scrWidth < 576 && this.scrWidth < 768) {
      this.urls.push( this.chosenTestimonials[i].getImages().getSmall());
    } else if (this.scrWidth >=768 && this.scrWidth < 992) {
      this.urls.push( this.chosenTestimonials[i].getImages().getMedium());
    } else{
      this.urls.push( this.chosenTestimonials[i].getImages().getLarge());
    }
  }
  }

  getScreenSize() {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;

    if(this.scrWidth < 576){
      this.manyEntress=2;
    }else if(this.scrWidth >=576 && this.scrWidth < 768){
      this.manyEntress=3;
    }else{
      this.manyEntress=4;
    }
  }


        ////////////////////GSAP///////////////////


        scrollUp(){

          gsap.registerPlugin(ScrollTrigger);

              var tl=gsap.from("#testimonials_head",{
                scrollTrigger: {
                  trigger:"#testimonials_head",
                  start:"bottom 90%",
                  end:"bottom 70%",
                  scrub: true,
                  markers: false,
                  toggleActions:"restart pause reverse pause" //wenn sichtbar, wenn nicht sichtbar, wenn wieder zurück
                },
                y: -100,
                opacity:0
              });

              var t2=gsap.from("#testimonials_cover",{
                scrollTrigger: {
                  trigger:"#testimonials_cover",
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

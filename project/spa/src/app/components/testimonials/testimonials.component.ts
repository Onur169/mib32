import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TestimonialClass } from 'src/app/helpers/classes/TestimonialClass';
import { TestimonialService } from 'src/app/services/testimonial.service';

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent implements OnInit {
  scrHeight: any;
  scrWidth: any;

  //zeigt den Viewport an
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    //console.log(this.scrHeight, this.scrWidth);
  }

  allTestimonials: TestimonialClass[] = [];
  public setTestimonials: TestimonialClass[] = [];
  hasTestimonials: boolean = false;
  countButtonClick: number = 0;
  hasMore: boolean = false;

  public setOfTestimonials: Map<number, TestimonialClass[]> = new Map();

  constructor(private testimonialService: TestimonialService) {
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.getTestimonials();
  }

  async getTestimonials() {
    let manager = this.testimonialService.testimonialManager;

    await this.testimonialService.fetchTestimonials();
    if (manager.getPageValue(manager.getCurrentPage())) {
      await this.iterateTestimonials();
    }
    this.checkTestimonials(this.allTestimonials);
    this.getTestimonialsSet(this.countButtonClick);
  }

  async iterateTestimonials() {
    let manager = this.testimonialService.testimonialManager;

    if (manager.hasNextPage()) {
      await this.testimonialService.fetchTestimonials(manager.getNextPage());
      await this.iterateTestimonials();
    }
    else{
      this.allTestimonials=manager.getAllValues();
      ScrollTrigger.refresh(true);
    }
  }

  checkTestimonials(testimonials: TestimonialClass[]) {
    if (testimonials == []) {
      this.hasTestimonials = false;
    } else {
      this.hasTestimonials = true;
    }
  }

  getTestimonialsSet(count: number) {
    let testi: Map<number, TestimonialClass[]> = new Map();
    this.hasMore = false;
    if (this.scrWidth < 576 && this.scrWidth < 768) {
      testi = this.testimonialService.testimonialManager.getManyTestimonialsAsPages(2);
      if(testi.get(count)){
        this.setOfTestimonials.set(count, testi.get(count)!);
        //console.log(this.setOfTestimonials.get(count));
        this.hasMore = true;
      }
      console.log('small');
    } else if (this.scrWidth >=768 && this.scrWidth < 992) {
        testi = this.testimonialService.testimonialManager.getManyTestimonialsAsPages(3);
        if(testi.get(count)){
          this.setOfTestimonials.set(count, testi.get(count)!);
          //console.log(this.setOfTestimonials.get(count));
          this.hasMore = true;
        }
        console.log('middle');
    } else{
      testi = this.testimonialService.testimonialManager.getManyTestimonialsAsPages(4);
      if(testi.get(count)){
        this.setOfTestimonials.set(count, testi.get(count)!);
        //console.log(this.setOfTestimonials.get(count));
        this.hasMore = true;
      }
    }
  }

  count() {
  this.getTestimonialsSet(this.countButtonClick++);
  }
}

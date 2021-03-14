import { Component, OnInit } from '@angular/core';
import { TestimonialClass } from 'src/app/helpers/classes/TestimonialClass';
import { TestimonialManager } from 'src/app/helpers/classes/TestimonialManager';
import { TestimonialService } from 'src/app/services/testimonial.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

  allTestimonials: TestimonialClass[]=[];

  constructor(private testimonialService: TestimonialService) {

  }

  ngOnInit(): void {
    this.getTestimonials();
  }

  async getTestimonials(){

   let manager=this.testimonialService.testimonialManager;

    await this.testimonialService.fetchTestimonials();
    if(manager.getPageValue(manager.getCurrentPage())){

      this.iterateTestimonials();
    }
    console.log(this.allTestimonials);
  }

  async iterateTestimonials(){
    let manager=this.testimonialService.testimonialManager;

    if(manager.hasNextPage()){
      await this.testimonialService.fetchTestimonials(manager.getNextPage());
      this.iterateTestimonials();
    }
    else{
      this.allTestimonials=manager.getAllValues();
    }
  }

}

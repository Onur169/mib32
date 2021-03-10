import { Component, OnInit } from '@angular/core';
import { TestimonialService } from 'src/app/services/testimonial.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

  constructor(private testimonialService: TestimonialService) { }

  ngOnInit(): void {
    this.getTestimonials();
  }

  async getTestimonials(){

    await this.testimonialService.fetchTestimonials();
    console.log(this.testimonialService.testimonialManager.getTestimonialsByCurrentPage());
  }

}

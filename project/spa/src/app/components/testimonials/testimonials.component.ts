import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TestimonialClass } from 'src/app/helpers/classes/TestimonialClass';
import { TestimonialService } from 'src/app/services/testimonial.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
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

  allTestimonials: TestimonialClass[]=[];
  hasTestimonials: boolean = false;

  public setOfTestimonials: Map<number, TestimonialClass[]> = new Map();

  constructor(private testimonialService: TestimonialService) {
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.getTestimonials();
  }

  async getTestimonials(){

   let manager=this.testimonialService.testimonialManager;

    await this.testimonialService.fetchTestimonials();
    if(manager.getPageValue(manager.getCurrentPage())){

      await this.iterateTestimonials();
    }
    this.checkTestimonials(this.allTestimonials);
    //console.log("hier",this.allTestimonials);
    this.getTesitimonialsSet();
  }

  async iterateTestimonials(){
    let manager=this.testimonialService.testimonialManager;

    if(manager.hasNextPage()){
      await this.testimonialService.fetchTestimonials(manager.getNextPage());
      await this.iterateTestimonials();
    }
    else{
      this.allTestimonials=manager.getAllValues();
    }
  }

  checkTestimonials(testimonials: TestimonialClass[]){
    if(testimonials == []){
      this.hasTestimonials = false;
    }else{
      this.hasTestimonials = true;
    }
  }

  getTesitimonialsSet(){
    console.log("hallo");
    if(this.scrWidth < 576){
      this.setOfTestimonials = this.testimonialService.testimonialManager.getManyTestimonialsAsPages(2);
      console.log("small",this.setOfTestimonials);
    }else if(this.scrWidth >= 576 && this.scrWidth < 768){
      this.setOfTestimonials = this.testimonialService.testimonialManager.getManyTestimonialsAsPages(4);
      console.log("medium",this.setOfTestimonials);
    }else{
      this.setOfTestimonials = this.testimonialService.testimonialManager.getManyTestimonialsAsPages(6);
      console.log("large",this.setOfTestimonials);
    }
  }
}

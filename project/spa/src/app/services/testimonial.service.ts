/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Der alliance-Service beantragt für die testimonial-Komponente die Daten zu den Testimonials vom api-Service.
 *
 */


import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TestimonialClass, TestimonialsImageClass } from '../helpers/classes/TestimonialClass';
import { TestimonialManager } from '../helpers/classes/TestimonialManager';
import { Testimonial } from '../helpers/interfaces/Testimonials';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  testimonialManager: TestimonialManager

  constructor(private api: ApiService, private sani: DomSanitizer) {
    this.testimonialManager=new TestimonialManager();
  }


  async fetchTestimonials(page?: number){
    return new Promise<TestimonialClass[]>(async (resolve, reject) => {
      try{

        if(page && (this.testimonialManager.getPageValue(page)!=undefined)){
          this.testimonialManager.setCurrentPage(page);
          return resolve(this.testimonialManager.getPageValue(page)!);
        }



        let params= new HttpParams()
        .set('page', this.testimonialManager.getCurrentPage().toString());

        if(page){
          params=params.set('page', page.toString());//.set reicht nicht, muss neu zugewiesen werden
        }

        const Url='testimonials';

        let response= await this.api.fetch(Url, params);

        let filler="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/240px-No_image_available.svg.png"

        let newTestimonials: TestimonialClass[]=[];

        (response.data as Testimonial[]).forEach((value: Testimonial) => {
          let small=value.images.small;
          let medium=value.images.medium;
          let large=value.images.large;
          if(!small)small=filler;
          if(!medium)medium=filler;
          if(!large)large=filler;
          let newTestimonialImage=new TestimonialsImageClass(
            this.sani.bypassSecurityTrustUrl(small),
            this.sani.bypassSecurityTrustUrl(medium),
            this.sani.bypassSecurityTrustUrl(large));
          let newTestimonial=new TestimonialClass(
            value.id,
            value.headline,
            value.description,
            value.token,
            value.extension,
            newTestimonialImage
          );

          newTestimonials.push(newTestimonial);

        });
        this.testimonialManager.setnewPage(response.current_page, response.max_pages,newTestimonials);

        resolve(newTestimonials);

      }catch (error){
        reject(error)
      }
    })

  }

}

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

        let newThrowbacks: TestimonialClass[]=[];

        (response.data as Testimonial[]).forEach((value: Testimonial) => {
          if(value.images.small ||  value.images.medium|| value.images.large){
          let newTestimonialImage=new TestimonialsImageClass(
            this.sani.bypassSecurityTrustUrl(value.images.small),
            this.sani.bypassSecurityTrustUrl(value.images.medium),
            this.sani.bypassSecurityTrustUrl(value.images.large));
          let newTestimonial=new TestimonialClass(
            value.id,
            value.headline,
            value.description,
            value.token,
            value.extension,
            newTestimonialImage,
            value.description_shortened
          );

          newThrowbacks.push(newTestimonial);
        }
        });
        this.testimonialManager.setnewPage(response.current_page, response.max_pages,newThrowbacks);


        resolve(newThrowbacks);

      }catch (error){
        reject(error)
      }
    })

  }

}

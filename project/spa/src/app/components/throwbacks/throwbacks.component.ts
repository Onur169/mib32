/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth, Anna Glomb
 * @param summary
 * Die Throwback-Komponente erfüllt sämtliche Aufgaben zur Darstellung unseres Rückblick-Features und
 * bezieht ihre dargestellten Daten aus dem throwback-Service.
 */
import { Component, OnInit, Sanitizer } from '@angular/core';
import { ThrowbackClass } from 'src/app/helpers/classes/ThrowbackClass';
import { ThrowbackService } from 'src/app/services/throwback.service';

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ViewportService } from 'src/app/services/viewport.service';

import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-throwbacks',
  templateUrl: './throwbacks.component.html',
  styleUrls: ['./throwbacks.component.scss'],
})
export class ThrowbacksComponent implements OnInit {
  closeResult: string='';
  modalOptions:NgbModalOptions;

  throwbackPages : ThrowbackClass[]=[];
  maxPage = 0;
  page = 1;

  //Binding
  hasThrowback: boolean = false;
  videoSuccess: boolean[] = [];

  constructor(private throwbackService: ThrowbackService, private viewport: ViewportService, private modalService: NgbModal) {
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }

  ngOnInit() {
   this.setProperties();
  }

  ngAfterViewInit(){

  }

  open(content: any) {
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  async setProperties(page?: number) {

    if(page){
      this.throwbackPages=await this.throwbackService.getNecessaryThrowbacks(page);
    }
    else{
      this.throwbackPages=await this.throwbackService.getNecessaryThrowbacks();
    }

    if(this.throwbackPages)this.hasThrowback=true;

    this.setMaxPage(this.throwbackService.throwbackmanager.getMaxPages());
    page=this.throwbackService.throwbackmanager.getCurrentPage();


    if(!this.viewport.getIsMobile())this.scrollUp();
    ScrollTrigger.refresh(true);
  }

  setMaxPage(size: number) {
    this.maxPage = size * 10;
  }


      ////////////////////GSAP///////////////////


      scrollUp(){

    gsap.registerPlugin(ScrollTrigger);

        var tl=gsap.from("#throwback_head",{
          scrollTrigger: {
            trigger:"#throwback_head",
            start:"bottom 90%",
            end:"bottom 70%",
            scrub: true,
            markers: false,
            toggleActions:"restart pause reverse pause" //wenn sichtbar, wenn nicht sichtbar, wenn wieder zurück
          },
          y: -100,
          opacity:0
        });

        var t2=gsap.from("#throwback_cover",{
          scrollTrigger: {
            trigger:"#throwback_cover",
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

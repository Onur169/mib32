/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth, Anna Glomb
 * @param summary
 * Die Throwback-Komponente erfüllt sämtliche Aufgaben zur Darstellung unseres Rückblick-Features und
 * bezieht ihre dargestellten Daten aus dem throwback-Service.
 */
import { Component, OnInit } from '@angular/core';
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
  title = 'ng-bootstrap-modal-demo';
  closeResult: string='';
  modalOptions:NgbModalOptions;

  throwbackPages = new Map<number, ThrowbackClass[]>();
  throwbacks: ThrowbackClass[];
  maxPage = 0;
  page = 1;

  //Binding
  hasThrowback: boolean = false;
  videoSuccess: boolean[] = [];

  constructor(private throwbackService: ThrowbackService, private viewport: ViewportService, private modalService: NgbModal) {
    this.throwbacks = [];
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }

  ngOnInit() {
   this.setProperties();
  }

  ngAfterViewInit(){
    if(!this.viewport.getIsMobile())this.scrollUp();
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

  async setProperties() {

   await this.throwbackService.getallThrowbacks();
    this.throwbackPages = this.throwbackService.throwbackmanager.reCreatePages(5);
    this.setNewPage(1);
    this.setMaxPage(this.throwbackPages.size);
  }

  setMaxPage(size: number) {
    this.maxPage = size * 10;
  }

  async setNewPage(page: number) {
    if (this.throwbackPages.get(page)) {
      this.throwbacks = this.throwbackPages.get(page)!;
    } else {
      this.throwbacks = this.throwbackPages.get(
        this.throwbackService.throwbackmanager.getCurrentPage()
      )!;
    }

    if(this.throwbacks.length > 0){
      this.hasThrowback =true;
    }else{
      this.hasThrowback = false;
    }

    for( let throwback of this.throwbacks){
      if(throwback.getsocialMediaVideoUrl()){
        this.videoSuccess.push(true);
      }else{
        this.videoSuccess.push(false);
      }
      } 
      console.log(this.throwbacks);
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

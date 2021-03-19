/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth, Anna Glomb
 * @param summary
 * In der Alliance-Komponente werden die größten Partner dynamisch nach Viewport angezeigt
 *  bezieht ihre dargestellten Daten aus dem alliance-Service
 */

import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AllianceClass, AllianceImageClass } from 'src/app/helpers/classes/AllianceClass';
import { AllianceService } from 'src/app/services/alliance.service';

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ViewportService } from 'src/app/services/viewport.service';
import { SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-alliance',
  templateUrl: './alliance.component.html',
  styleUrls: ['./alliance.component.scss'],
})
export class AllianceComponent implements OnInit {
  private scrHeight: number = 0;
  private scrWidth: number = 0;

  urls: SafeUrl[]=[];
  manyEntress: number=0;

  //zeigt den Viewport an

  getScreenSize() {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    //console.log(this.scrHeight, this.scrWidth);
  }

  public alliances: Map<number, AllianceClass[]> = new Map();
  hasAlliance: boolean = false;

  constructor(private allianceService: AllianceService, private viewport: ViewportService) {
  }

  ngOnInit(): void {
    this.fillAlliances();
  }
  async fillAlliances() {
    await this.allianceService.getAlliances();

    this.buildSlider();
  }

  ngAfterViewInit(){
    if(!this.viewport.getIsMobile())this.scrollUp();
  }

  @HostListener('window:resize', ['$event'])
  buildSlider(){

    this.getScreenSize();
    this.createAllianceSet(this.scrWidth);
    this.calculatePicture();
    ScrollTrigger.refresh(true);
  }

  calculatePicture(){
    this.urls=[];
    this.alliances.forEach(page=>{
      page.forEach(alli =>{

    if(this.scrWidth<576){
      this.urls.push( alli.getPicture().getSmall());
    }
    else if(this.scrWidth>=576 && this.scrWidth < 768){
      this.urls.push( alli.getPicture().getMedium());
    }
    else this.urls.push( alli.getPicture().getLarge());
  })
})
}

  //gibt soviele Partner, wie die Breite des Bildschirms es erlaubt
  createAllianceSet(srcWidth: number) {
    //kleiner als der xs Breakpoint
    if(srcWidth < 576){
      this.manyEntress=1;
    }else if(srcWidth >=576 && srcWidth < 768){
      this.manyEntress=2;
    }else{
      this.manyEntress=3;
    }
    this.alliances = this.allianceService.getManyAlliancesAsPages(this.manyEntress);

    if(this.alliances.size > 0 )this.hasAlliance = true;
  }


  //GSP Animation
  scrollUp(){

    gsap.registerPlugin(ScrollTrigger);

    //Headline
        var tl=gsap.from("#alliance_head",{
          scrollTrigger: {
            trigger:"#alliance_head",
            start:"bottom 90%",
            end:"bottom 70%",
            scrub: true,
            markers: false,
            toggleActions:"restart pause reverse pause" //wenn sichtbar, wenn nicht sichtbar, wenn wieder zurück
          },
          y: -100,
          opacity:0
        });

        //Subtext
        var t2=gsap.from("#alliance_cover",{
          scrollTrigger: {
            trigger:"#alliance_cover",
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

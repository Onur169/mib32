import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AllianceClass } from 'src/app/helpers/classes/AllianceClass';
import { AllianceService } from 'src/app/services/alliance.service';

import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ViewportService } from 'src/app/services/viewport.service';
@Component({
  selector: 'app-alliance',
  templateUrl: './alliance.component.html',
  styleUrls: ['./alliance.component.scss'],
})
export class AllianceComponent implements OnInit {
  scrHeight: number = 0;
  scrWidth: number = 0;

  //zeigt den Viewport an
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    //console.log(this.scrHeight, this.scrWidth);
  }

  public alliances: Map<number, AllianceClass[]> = new Map();
  hasAlliance: boolean = false;

  constructor(private allianceService: AllianceService, private viewport: ViewportService) {
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.fillAlliances();
  }
  async fillAlliances() {
    await this.allianceService.getAlliances();

    this.createAllianceSet(this.scrWidth);
  }

  ngAfterViewInit(){
    if(!this.viewport.getIsMobile())this.scrollUp();
  }

  //gibt soviele Partner, wie die Breite des Bildschirms es erlaubt
  createAllianceSet(srcWidth: number) {
    //kleiner als der xs Breakpoint
    if(srcWidth < 576){
      this.alliances = this.allianceService.getManyAlliancesAsPages(1);
    }else if(srcWidth >=576 && srcWidth < 768){
      this.alliances = this.allianceService.getManyAlliancesAsPages(2);
    }else{
      this.alliances = this.allianceService.getManyAlliancesAsPages(3);
    }

    if(this.alliances.size > 0 )this.hasAlliance = true;
  }

  scrollUp(){

    gsap.registerPlugin(ScrollTrigger);

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

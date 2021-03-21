/**
 * @param createdBy
 * Anna Glomb
 * @param authors
 * Anna Glomb, Christian Knoth
 * @param summary
 * Die SocialMedia-Komponente erfüllt sämtliche Aufgaben zur Darstellung unserer SocialMedia-Features
 * sie bedient sich an dem Service
 */

import { Component, OnInit } from '@angular/core';

import { ViewportService } from 'src/app/services/viewport.service';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from 'gsap';
import { SocialsService } from 'src/app/services/socials.service';
import { HashtagClass } from 'src/app/helpers/classes/HashtagClass';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss']
})
export class SocialMediaComponent implements OnInit {

  count: string = '';
  hashtag: string = '';
  hashtagSuccess = true;
  allHashtags:HashtagClass[] = [];
  model:string = "";
  private plattformCookie:string | null=""
  private hashCookie:string | null=""

  constructor(private viewport: ViewportService, private socialService: SocialsService, private cookieService: CookieService) {

  }

  ngOnInit(): void {


  }

  ngAfterViewInit(){

    this.plattformCookie=localStorage.getItem('plattform');
    this.hashCookie=localStorage.getItem('socialhash');
    this.setSocials();
  }

  async setSocials(){

   this.allHashtags =  await this.socialService.fetchAllHashtags();

   if(this.allHashtags.length > 0){
      this.hashtagSuccess = true;
      if(!this.viewport.getIsMobile())this.scrollUp();
    }else{
      this.hashtagSuccess = false;
    }

      this.allHashtags.forEach(hash =>{
        if(hash.getName()==this.plattformCookie && hash.getHashtag() ==this.hashCookie){
          this.getHashtag(this.hashCookie, this.plattformCookie);
        }
      });

      if(this.plattformCookie && this.hashCookie){
        for(let hashtag of this.allHashtags){
          if(hashtag.getHashtag().toLocaleLowerCase() == this.hashCookie.toLocaleLowerCase() && hashtag.getName().toLocaleLowerCase() == this.plattformCookie.toLocaleLowerCase()){
            this.hashtag = hashtag.getHashtag();
            this.count = hashtag.getCounter();
          }
        }
      }
  }

  getHashtag(name: string, plattform: string){
    if(this.cookieService.getCookiesAllowed()){
    localStorage.setItem('plattform', plattform);
    localStorage.setItem('socialhash', name);
    }

    for (let hashtag of this.allHashtags){
      if(hashtag.getHashtag().toLocaleLowerCase() == name.toLocaleLowerCase() && hashtag.getName().toLocaleLowerCase() == plattform.toLocaleLowerCase()){
        this.count = hashtag.getCounter();
        this.hashtag = hashtag.getHashtag();
        this.model = hashtag.getName();
      }
    }
  }

  deleteChecked(){
    this.count = "";
    this.hashtag = "";
  }

  //Animation der Komponente
  scrollUp(){

    gsap.registerPlugin(ScrollTrigger);

    //Headline
        var tl=gsap.from("#social_head",{
          scrollTrigger: {
            trigger:"#social_head",
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
        var t2=gsap.from("#social_cover",{
          scrollTrigger: {
            trigger:"#social_cover",
            start:"bottom 90%",
            end:"bottom 70%",
            scrub: true,
            markers: false,
            toggleActions:"restart pause reverse pause"
          },
          opacity:0
        });

        var t7=gsap.from("#count_bg",{
          scrollTrigger: {
            trigger:"#count_bg",
            start:"top 90%",
            end:"center 60%",
            scrub: true,
            markers: false,
            toggleActions:"restart pause reverse pause" //wenn sichtbar, wenn nicht sichtbar, wenn wieder zurück
          },
          opacity:0
        });

        var t8=gsap.from("#count_box",{
          scrollTrigger: {
            trigger:"#count_box",
            start:"top 75%",
                end:"top 50%",
                scrub: true,
                markers: false,
                toggleActions:"restart pause reverse pause" //wenn sichtbar, wenn nicht sichtbar, wenn wieder zurück
              },
              x: 50
            });
      }


}

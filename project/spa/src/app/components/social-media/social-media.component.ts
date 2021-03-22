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
  hashtagInstagram: string = '';
  hashtagFacebook: string = '';
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
    
      this.allHashtags.forEach(hash =>{
        if(hash.getName()==this.plattformCookie && hash.getHashtag() ==this.hashCookie){
          this.getHashtag(this.hashCookie, this.plattformCookie);
        }
        if(hash.getName().toLocaleLowerCase() === "instagram".toLocaleLowerCase()){
          this.hashtagInstagram = hash.getHashtag();
        }else{
          this.hashtagFacebook = hash.getHashtag(); 
        }
      });

      if(this.plattformCookie && this.hashCookie){
        this.getHashtag(this.hashCookie, this.plattformCookie);
      }else{
        this.getHashtag("klima", "instagram");
          }
      }else{
        this.hashtagSuccess = false;
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
        this.model = hashtag.getName().charAt(0).toUpperCase() + hashtag.getName().slice(1);
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


        var t8=gsap.from("#count_box",{
          scrollTrigger: {
            trigger:"#count_box",
            start:"top 90%",
                end:"top 60%",
                scrub: true,
                markers: false,
                toggleActions:"restart pause reverse pause" //wenn sichtbar, wenn nicht sichtbar, wenn wieder zurück
              },
              y: -100,
              opacity:0
            });
      }


}

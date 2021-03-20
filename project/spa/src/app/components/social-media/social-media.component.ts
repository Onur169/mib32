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

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss']
})
export class SocialMediaComponent implements OnInit {

  count: string = '';
  hashtag: string = '';
  hashtagSuccess = false;
  allHashtags:HashtagClass[] = [];
  model = 1;

  private plattformCookie:string | null=""
  private hashCookie:string | null=""

  constructor(private viewport: ViewportService, private socialService: SocialsService) {
    this.plattformCookie=localStorage.getItem('plattform');
    this.hashCookie=localStorage.getItem('socialhash');
  }

  ngOnInit(): void {
    this.setSocials();
  }

  ngAfterViewInit(){
    if(!this.viewport.getIsMobile())this.scrollUp();
  }

  async setSocials(){

   this.allHashtags =  await this.socialService.fetchAllHashtags();
    console.log(this.socialService.allhashtags);

   if(this.allHashtags.length > 0){
      this.hashtagSuccess = true;
    }else{
      this.hashtagSuccess = false;
    }

      this.allHashtags.forEach(hash =>{
        if(hash.getName()==this.plattformCookie && hash.getHashtag() ==this.hashCookie){
          this.getHashtag(this.hashCookie, this.plattformCookie);
        }
      })


  }

  getHashtag(name: string, plattform: string){
    localStorage.setItem('plattform', plattform);
    localStorage.setItem('socialhash', name);

    for (let hashtag of this.allHashtags){
      if(hashtag.getHashtag().toLocaleLowerCase() == name.toLocaleLowerCase() && hashtag.getName().toLocaleLowerCase() == plattform.toLocaleLowerCase()){
        this.count = hashtag.getCounter();
        this.hashtag = hashtag.getHashtag();
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

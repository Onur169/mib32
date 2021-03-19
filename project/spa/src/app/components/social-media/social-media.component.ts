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

  constructor(private viewport: ViewportService, private socialService: SocialsService) { }

  ngOnInit(): void {
    this.setSocials();
  }

  ngAfterViewInit(){
    if(!this.viewport.getIsMobile())this.scrollUp();

   //ScrollTrigger.refresh(true);
  }

  async setSocials(){
   this.allHashtags =  await this.socialService.fetchAllHashtags();
    console.log(this.socialService.allhashtags);

    if(this.allHashtags.length > 0){
      this.hashtagSuccess = true;
    }else{
      this.hashtagSuccess = false;
    }
  }

  getHashtag(name: string, plattform: string){
    for (let hashtag of this.allHashtags){
      if(hashtag.hashtag.toLocaleLowerCase() === name.toLocaleLowerCase() && hashtag.name.toLocaleLowerCase() === plattform.toLocaleLowerCase()){
        this.count = hashtag.counter;
        this.hashtag = hashtag.hashtag;
      }
    }
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

        //Animation der Kreise
        var t3=gsap.from("#first_socialbox",{
          scrollTrigger: {
            trigger:"#first_socialbox",
            start:"top 100%",
            end:"top 95%",
            scrub: true,
            markers: false,
            toggleActions:"restart pause reverse pause"
          },
          opacity:0
        });

        var t4=gsap.from("#second_socialbox",{
          scrollTrigger: {
            trigger:"#second_socialbox",
            start:"top 100%",
            end:"top 90%",
            scrub: true,
            markers: false,
            toggleActions:"restart pause reverse pause"
          },
          opacity:0
        });

        var t5=gsap.from("#third_socialbox",{
          scrollTrigger: {
            trigger:"#third_socialbox",
            start:"top 100%",
            end:"top 80%",
            scrub: true,
            markers: false,
            toggleActions:"restart pause reverse pause"
          },
          opacity:0
        });

        var t6=gsap.from("#fourth_socialbox",{
          scrollTrigger: {
            trigger:"#fourth_socialbox",
            start:"top 100%",
            end:"top 70%",
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

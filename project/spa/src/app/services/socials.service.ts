import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HashtagClass } from '../helpers/classes/HashtagClass';
import { SocialHashtag } from '../helpers/interfaces/SocialHashtag';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SocialsService {

  allhashtags: HashtagClass[]=[];
  startpage: number=1;
  maxPage: number=0;

  constructor(private api: ApiService) { }

  async fetchAllHashtags(){
    return new Promise<HashtagClass[]>(async (resolve, reject) => {
      try{
    await this.fetchHastag();

    for(let i=this.startpage; i<=this.maxPage;i++){
      await this.fetchHastag(i);
    }

    resolve(this.allhashtags);
    }catch(error){
      reject(error);
    }
  }
    )

  }

  async fetchHastag(page?: number){
    return new Promise<HashtagClass[]>(async (resolve, reject) => {
      try{

        let params= new HttpParams()
        .set('page', this.startpage.toString());

        if(page){
          params=params.set('page', this.startpage.toString());
        }

        const Url='socialmedia/hashtagstat';

        let response= await this.api.fetch(Url, params);

        (response.data as SocialHashtag[]).forEach((value: SocialHashtag) => {

          let newHashtag=new HashtagClass(
           value.id,
           value.hashtag,
           value.counter,
           value.name
          );

          this.allhashtags.push(newHashtag);

        });
        resolve( this.allhashtags);

      }catch (error){
        reject(error)
      }
  })
}
}

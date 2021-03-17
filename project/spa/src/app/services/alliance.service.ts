/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Der alliance-Service beantragt für die alliance-Komponente die Daten zu den Bündnissen vom api-Service.
 *
 */

import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllianceClass, AllianceImageClass } from '../helpers/classes/AllianceClass';
import { Alliance } from '../helpers/interfaces/Alliance';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AllianceService {

private alliances: AllianceClass[];
private maxPages: number;

  constructor(private api:ApiService) {
    this.alliances=[];
    this.maxPages=0;

  }

  getManyAlliancesAsPages(elementsPerPage: number): Map<number,AllianceClass[]>{
    let pageCounter: number=Math.round(this.alliances.length/elementsPerPage);

    let paginator: Map<number,AllianceClass[]>=new Map();

    let pageValue=0;
    let newAlliances: AllianceClass[]=[];
    for(let page=0; page<pageCounter; page++){
      newAlliances=[];
      for(let alliance=0; alliance<=elementsPerPage-1; alliance++){

        if(this.alliances[pageValue+alliance]){
          newAlliances.push(this.alliances[pageValue+alliance]);
        paginator.set(page, newAlliances);
        }
        else break;
      }
      pageValue+=elementsPerPage;
    }


    return paginator;
  }

  async getAlliances(){
    await this.getAlliance();
    await this.getAlliance(this.maxPages.toString());

  }

  async getAlliance(maxPage?: string){
    return new Promise<AllianceClass[]>(async (resolve, reject) => {
      try{
        if(maxPage){
          let newPage:AllianceClass[]=[];
          for(let page=2; page<=this.maxPages; page++){
            newPage=await this.fetchAlliance(page.toString());
            newPage.forEach(value =>{
              this.alliances.push(value);
            });
          }
          resolve(newPage);
        }
        else{

          let newPage=await this.fetchAlliance();
          newPage.forEach(value =>{
            this.alliances.push(value);
          });


          resolve(newPage);
        }

      }catch (error){
        reject(error)
      }
    })

  }

  async fetchAlliance(page?: string){
    return new Promise<AllianceClass[]>(async (resolve, reject) => {

      try{

        const RequestUrl="alliances";

        let params=new HttpParams()
        .set('page','1');

        if(page){
          params=new HttpParams()
        .set('page',page);
        }

        let response= await this.api.fetch(RequestUrl,params);

        let newAlliancePage:AllianceClass[]=[];
        (response.data as Alliance[]).forEach(alli =>{
          let img=new AllianceImageClass(alli.images.small,alli.images.medium,alli.images.large)
          newAlliancePage.push(new AllianceClass(img,alli.url,alli.name));
        });
        //console.log(response);

        this.maxPages=response.max_pages;
          resolve(newAlliancePage);


      }catch (error){
        reject(error);
      }
    })
  }
}

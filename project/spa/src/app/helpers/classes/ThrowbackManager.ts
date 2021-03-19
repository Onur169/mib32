/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Die ThrowManager-Klasse repräsentiert alle aktuell angefragten Rückblicke, bietet Formatierungsmöglichkeiten der Daten
 * und wird im Rahmen der Throwback-Komponente genutzt.
 */

import { ThrowbackClass } from "./ThrowbackClass";

 export class ThrowbackManager{

   public pages=new Map<number, ThrowbackClass[]>();
   private currentPage: number;
   private maxPages: number;

   constructor(){

     this.currentPage=1;
     this.maxPages=1;
   }

     /**
   * Wenn via http-request eine neue Seite geladen wird, so soll sie hiermit gesetzt werden.
   * @param newPage -Seitenzahl
   * @param markers -Events
   * **/
  setnewPage(newPage:number, maxPages: number,markers: ThrowbackClass[]): void{
    this.setMaxPages(maxPages);
    this.setCurrentPage(newPage);
    this.pages.set(newPage,  markers);
   }

   /**
   * Gibt das erste Throwback der ersten Seite aus.
   * **/
  getFirstThrowback(): ThrowbackClass | undefined{
    if(this.pages.get(1))return this.pages.get(1)![0];
    else {
      return undefined;
    }
  }

     //für das Überschreiben
  setMaxPages(maxPages: number): void{//Onur rausnehmen
    this.maxPages=maxPages;
  }

  setCurrentPage(currentPage: number): void{
    this.currentPage=currentPage;
  }

    //sollte nur für die allererste Abfrage genutzt werden
    getCurrentPage(): number{
      return this.currentPage;
    }

    getPageValue(page:number): ThrowbackClass[]|undefined{

      return this.pages.get(page)
    }

    getMaxPages(): number {
      return this.maxPages;
    }

    getallThrowbacksAsArray(): ThrowbackClass[]{
      let throwbacks: ThrowbackClass[]=[];
      this.pages.forEach((page:ThrowbackClass[]) => {
        page.forEach((throwback: ThrowbackClass)=>{
          throwbacks.push(throwback);
        })
      })
      return throwbacks;
    }

    calculateSize(numberOfThrowbacksInview: number, throwbacks: ThrowbackClass[]){
     let numberOfThrowbacks=throwbacks.length;
     //console.log("inview",numberOfThrowbacksInview,"anzahl",numberOfThrowbacks)

     return Math.ceil(numberOfThrowbacks/numberOfThrowbacksInview);
    }

    reCreatePages(numberOfThrowbacksInview: number):Map<number, ThrowbackClass[]>{

      let allThrowbacks=this.getallThrowbacksAsArray();
      let filterdThrowbacks=this.filterByDate(allThrowbacks);

      let size=this.calculateSize(numberOfThrowbacksInview,filterdThrowbacks);

      let newPage=0;

      let pages=new Map<number, ThrowbackClass[]>();

      for(let i=1; i<=size; i++){

       let temp: ThrowbackClass[]=[];
        for(let j=0; j<=numberOfThrowbacksInview-1; j++){
          if(filterdThrowbacks[j+newPage]){
          temp.push(filterdThrowbacks[j+newPage]);
          pages.set(i,temp);
        }
        else{
          break;
        }

        }
        newPage+=5;
      }
      return pages;
    }

    filterByDate(throwbacks: ThrowbackClass[]){
      let today= new Date();
      let filtered: ThrowbackClass[]=[];
      throwbacks.filter((value) => {
        if (new Date(value.getstartDate()).getTime() < today.getTime()) {
          filtered.push(value);
        }
      });;
      return filtered;
    }

 }

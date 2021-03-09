/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Die ThrowManager-Klasse repräsentiert alle aktuell angefragten Rückblicke und wird im Rahmen der Throwback-Komponente genutzt.
 */

import { ThrowbackClass } from "./ThrowbackClass";

 export class ThrowbackManager{

   public pages: Map<number, ThrowbackClass[]>=new Map<number, ThrowbackClass[]>();
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
      console.error("Momentan gibt es entweder nichts zu berichten oder es gab ein Problem beim Abrufen unserer Rückblicke");
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

    public getMaxPages(): number {
      return this.maxPages;
    }

 }

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
   private max_pages: number;

   constructor(){

     this.currentPage=1;
     this.max_pages=1;
   }

     /**
   * Wenn via http-request eine neue Seite geladen wird, so soll sie hiermit gesetzt werden.
   * @param newPage -Seitenzahl
   * @param markers -Events
   * **/
  setnewPage(newPage:number, markers: ThrowbackClass[]): void{

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
  setMaxPages(max_pages: number): void{//Onur rausnehmen
    this.max_pages=max_pages;
  }

  setCurrentPage(currentPage: number): void{
    this.currentPage=currentPage;
  }

    //sollte nur für die allererste Abfrage genutzt werden
    getCurrentPage(): number{
      return this.currentPage;
    }


 }

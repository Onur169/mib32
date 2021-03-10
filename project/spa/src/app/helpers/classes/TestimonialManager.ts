/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Die MarkerManager-Klasse repräsentiert alle aktuell angefragten Events und wird im Rahmen der Timer- und der Event-Komponente genutzt.
 */

import { TestimonialClass } from "./TestimonialClass";


 export class TestimonialManager{

   public pages: Map<number, TestimonialClass[]>=new Map<number, TestimonialClass[]>();
   private currentPage: number;
   private maxPages: number;


     /**
   * Prüft, ob es eine weitere Seite gibt.
   * **/
      hasNextPage(): boolean{
        if(this.currentPage<this.maxPages){
          return true;
        }
        else{
          return false;
        }
      }

      /**
       * Prüft, ob es eine vorherige Seite gibt.
       * **/
      hasPreviousPage(): boolean{
        if(this.currentPage>0){
          return true;
        }
        else{
          return false;
        }
      }

      /**
       * Gibt die nächste Seite aus, sofern existent. Ansonsten wird aktuelle Seite ausgeben. ->Diese Seite übernimmt keine Änderungen.
       * **/
      getNextPage(): TestimonialClass[]{
        if(this.pages.get(++this.currentPage) && this.hasNextPage()){
          return this.pages.get(this.currentPage)!;
        }
        else return this.pages.get(--this.currentPage)!;
      }

       /**
       * Gibt die vorherige Seite aus, sofern existent. Ansonsten wird aktuelle Seite ausgeben. ->Diese Seite übernimmt keine Änderungen.
       * **/
      getPreviousPage(): TestimonialClass[]{
        if(this.pages.get(--this.currentPage) && this.hasPreviousPage()){
          return this.pages.get(this.currentPage)!;
        }
        else return this.pages.get(++this.currentPage)!;
      }

      /**
       * Wenn via http-request eine neue Seite geladen wird, so soll sie hiermit gesetzt werden.
       * @param newPage -Seitenzahl
       * @param Testimonials -Events
       * **/
      setnewPage(newPage:number, maxPages:number, Testimonials: TestimonialClass[]): void{
        this.setMaxPages(maxPages);
        this.setCurrentPage(newPage);
        this.pages.set(newPage,  Testimonials);
      }

      /**
       * Gibt alle Seiten mit ihren Events aus, die bisher gesetzt wurden.
       * **/
      getTestimonials(): Map<number,TestimonialClass[]>{
        return this.pages;
      }

      //gibt die aktuelle Page aus
      getTestimonialsByCurrentPage(): TestimonialClass[] | undefined{
        if(this.pages.get(this.currentPage))return this.pages.get(this.currentPage)!;
        else{
          console.error("Leider konnten wir kein passendes Testimonial für dich finden");
          return undefined;
        }
      }

      //für das Überschreiben
      setMaxPages(maxPages: number): void{
        this.maxPages=maxPages;
      }

      /**
       * Gibt das erste Event der ersten Deite aus (hauptsächlich für den Timer).
       * **/
      getNextEvent(): TestimonialClass | undefined{
        if(this.pages.get(1))return this.pages.get(1)![0];
        else {
          console.error("Momentan ist entweder kein Event in Aussicht oder es gab ein Problem beim Abrufen unserer Demos");
          return undefined;
        }
      }


    getPageValue(page:number): TestimonialClass[]|undefined{

      return this.pages.get(page)
    }

      getPageNumberOfNext(): number{
        return this.currentPage+1;
      }

      getPageNumberOfPrevious(): number{
        return this.currentPage-1;
      }

      setCurrentPage(currentPage: number): void{
        this.currentPage=currentPage;
      }

      //sollte nur für die allererste Abfrage genutzt werden
      getCurrentPage(): number{
        return this.currentPage;
      }

      getLastValueOfCurrentPage(){
        let  lastMarker=this.pages.get(this.currentPage)!;
        return lastMarker[lastMarker.length-1];
      }

      getMaxPages(): number {
        return this.maxPages;
      }

   constructor(){
     this.currentPage=1;
     this.maxPages=1;
   }

 }

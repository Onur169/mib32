/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Die MarkerManager-Klasse repräsentiert alle aktuell angefragten Events und wird im Rahmen der Timer- und der Event-Komponente genutzt.
 */

import { MapMath } from "../abstracts/MapMath";
import { Marker } from "./Marker";

export class MarkerManager extends MapMath{

  public pages: Map<number, Marker[]>=new Map<number, Marker[]>();
  private current_page: number;
  private max_pages: number;

  constructor(){

    super();
    this.current_page=1;
    this.max_pages=1;
  }

    /**
   * Prüft, ob es eine weitere Seite gibt.
   * **/
  hasNextPage(): boolean{
    if(this.current_page<this.max_pages){
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
    if(this.current_page>0){
      return true;
    }
    else{
      return false;
    }
  }

  /**
   * Gibt die nächste Seite aus, sofern existent. Ansonsten wird aktuelle Seite ausgeben. ->Diese Seite übernimmt keine Änderungen.
   * **/
  getNextPage(): Marker[]{
    if(this.pages.get(++this.current_page) && this.hasNextPage()){
      return this.pages.get(this.current_page)!;
    }
    else return this.pages.get(--this.current_page)!;
  }

   /**
   * Gibt die vorherige Seite aus, sofern existent. Ansonsten wird aktuelle Seite ausgeben. ->Diese Seite übernimmt keine Änderungen.
   * **/
  getPreviousPage(): Marker[]{
    if(this.pages.get(--this.current_page) && this.hasPreviousPage()){
      return this.pages.get(this.current_page)!;
    }
    else return this.pages.get(++this.current_page)!;
  }

  /**
   * Wenn via http-request eine neue Seite geladen wird, so soll sie hiermit gesetzt werden.
   * @param new_page -Seitenzahl
   * @param markers -Events
   * **/
  setnewPage(new_page:number, markers: Marker[]): void{
    this.pages.set(new_page, markers);
  }

  /**
   * Gibt alle Seiten mit ihren Events aus, die bisher gesetzt wurden.
   * **/
  getMarkers(): Map<number,Marker[]>{
    return this.pages;
  }

  //gibt die aktuelle Page aus
  getMarkersByCurrentPage(): Marker[] | undefined{
    if(this.pages.get(this.current_page))return this.pages.get(this.current_page)!;
    else{
      console.error("Momentan entweder kein Event in Aussicht oder es gab ein Problem beim Abrufen unserer Demos");
      return undefined;
    }
  }

  //für das Überschreiben
  setMaxPages(max_pages: number): void{
    this.max_pages=max_pages;
  }

  /**
   * Gibt das erste Event der ersten Deite aus (hauptsächlich für den Timer).
   * **/
  getNextEvent(): Marker | undefined{
    if(this.pages.get(1))return this.pages.get(1)![0];
    else {
      console.error("Momentan ist entweder kein Event in Aussicht oder es gab ein Problem beim Abrufen unserer Demos");
      return undefined;
    }
  }

  getPageNumberOfNext(): number{
    return this.current_page+1;
  }

  getPageNumberOfPrevious(): number{
    return this.current_page-1;
  }

  setCurrentPage(current_page: number): void{
    this.current_page=current_page;
  }

  //sollte nur für die allererste Abfrage genutzt werden
  getCurrentPage(): number{
    return this.current_page;
  }

}

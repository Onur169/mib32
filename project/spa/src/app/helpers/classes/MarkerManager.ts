/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth
 * @param summary
 * Die MarkerManager-Klasse repräsentiert alle aktuell angefragten Events und wird im Rahmen der Timer- und der Event-Komponente genutzt.
 */

import { Marker } from "./Marker";

export class MarkerManager{

  private pages: Map<number, Marker[]>=new Map<number, Marker[]>();
  private current_page: number=0;
  private max_pages: number=0;

  constructor(){
  }

  hasNextPage(): boolean{
    if(this.current_page<this.max_pages){
      return true;
    }
    else{
      return false;
    }
  }

  hasPreviousPage(): boolean{
    if(this.current_page>0){
      return true;
    }
    else{
      return false;
    }
  }

  //gibt die nächste Seite aus, sofern existent ; ansonsten aktuelle Seite ausgeben. ->Diese Seite übernimmt keine Änderungen
  getNextPage(): Marker[]{
    if(this.pages.get(++this.current_page) && this.hasNextPage()){
      return this.pages.get(this.current_page)!;
    }
    else return this.pages.get(--this.current_page)!;
  }

  //gibt die vorherige Seite aus, sofern existent ; ansonsten aktuelle Seite ausgeben. ->Diese Seite übernimmt keine Änderungen
  getPreviousPage(): Marker[]{
    if(this.pages.get(--this.current_page) && this.hasPreviousPage()){
      return this.pages.get(this.current_page)!;
    }
    else return this.pages.get(++this.current_page)!;
  }

  //wenn via http-request eine neue Seite geladen wird, so soll sie hiermit gesetzt werden.
  setnewPage(new_page:number, markers: Marker[]): void{
    this.pages.set(new_page, markers);
  }

  //gibt alles aus, was bisher gesetzt wurde
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

  //gibt für den Timer erste Event aus
  getNextEvent(): Marker | undefined{
    if(this.pages.get(0))return this.pages.get(0)![0];
    else {
      console.error("Momentan ist entweder kein Event in Aussicht oder es gab ein Problem beim Abrufen unserer Demos");
      return undefined;
    }
  }

}

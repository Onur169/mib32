/**
 * @param createdBy
 * Christian Knoth.
 * @param authors
 * Christian Knoth.
 * @param summary
 * Die MarkerManager-Klasse repräsentiert alle aktuell angefragten Events und wird im Rahmen der Timer- und der Event-Komponente genutzt.
 */

import { Marker } from "./marker";

export class MarkerManager{

  private pages: Marker[][]=[];
  private current_page: number;
  private max_pages: number=0;

  constructor(markers: Marker[], current_page: number, max_pages: number){

    this.current_page=current_page;
    this.pages[this.current_page]=markers;
    this.max_pages=max_pages;
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

  //gibt die nächste Seite aus, sofern existent ; ansonsten aktuelle Seite ausgeben.
  getNextPage(): Marker[]{
    if(this.pages[++this.current_page] && this.hasNextPage()){
      return this.pages[this.current_page];
    }
    else return this.pages[--this.current_page];
  }

  //gibt die vorherige Seite aus, sofern existent ; ansonsten aktuelle Seite ausgeben.
  getPreviousPage(): Marker[]{
    if(this.pages[--this.current_page] && this.hasPreviousPage()){
      return this.pages[this.current_page];
    }
    else return this.pages[++this.current_page];
  }

  setnewPage(current_page:number, markers: Marker[]): void{
    this.pages[current_page]=markers;
  }

  getMarkers(): Marker[][]{
    return this.pages;
  }

  getMarkersByCurrentPage(): Marker[]{
    return this.pages[this.current_page];
  }

  setMaxPages(max_pages: number): void{
    this.max_pages=max_pages;
  }

  getNextEvent(){
    return this.pages[1][1].start_at;
  }

}

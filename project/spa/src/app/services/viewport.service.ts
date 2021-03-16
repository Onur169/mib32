import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewportService {

  private isMobile: boolean;


  constructor() {
    if (window.innerWidth < 768) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  public getIsMobile(): boolean {
    return this.isMobile;
  }
}

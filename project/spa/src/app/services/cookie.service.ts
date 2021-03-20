import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  private cookiesAllowed=false;

  constructor() { }

  allowCookies(){
    this.cookiesAllowed=true;
  }

  dontAllowCookies(){
    this.cookiesAllowed=false;
  }

  getCookiesAllowed(){
    return this.cookiesAllowed;
  }

}

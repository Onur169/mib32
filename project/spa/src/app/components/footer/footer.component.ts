/**
 * @param createdBy
 * Christian Knoth
 * @param authors
 * Christian Knoth, Anna Glomb
 * @param summary
 * Die Footer-Komponente erfüllt sämtliche Aufgaben zur Darstellung unserer Footer-Features
 * soll die wichtigsten Links zum Datenschutz darstellen
 */

import { Component, Type } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalConfirmAutofocus } from 'src/app/cookie/modal-focus';
import { CookieService } from 'src/app/services/cookie.service';

const MODALS: {[name: string]: Type<any>} = {

  autofocus: NgbdModalConfirmAutofocus
};

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private modalService : NgbModal, private cookieService: CookieService) { }


  ngAfterViewInit(){
  }

  open(name: string) {
    let modalReference=this.modalService.open(MODALS[name]);
    modalReference.result.then((result)=>{
      let closeResult = `Closed with: ${result}`;
      localStorage.setItem("klimacookiesallowed","true");
      this.cookieService.allowCookies();
      console.log(closeResult);
    }, (reason) => {
      let closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      localStorage.removeItem("klimacookiesallowed");
      this.cookieService.dontAllowCookies();
      console.log(closeResult);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
    }
}

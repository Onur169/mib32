import {Component, Type} from '@angular/core';
import { ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from '../services/cookie.service';

@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Profile deletion</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete <span class="text-primary">"John Doe"</span> profile?</strong></p>
    <p>All information associated to this user profile will be permanently deleted.
    <span class="text-danger">This operation can not be undone.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
  </div>
  `
})
export class NgbdModalConfirm {
  constructor(public modal: NgbActiveModal) {}
}

@Component({
  selector: 'ngbd-modal-confirm-autofocus',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Dürfen wir Dir einen Keks anbieten?</h4>
    <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Wir möchten gerne ein Cookie setzen</strong></p>
    <p>Wir möchten dein Web-Erlebnis bei uns verbesseren. Hierbei handelst es sich lediglich um die Erfassung der Social-Media Plattform, dessen Klima-Hashtag
      dich zu letzt interessiert hatte.
</p>
<p>
    <span class="text-danger">Im Fußbereich der Seite kannst du diese Einstellung jederzeit abändern bzw. Widerrufen.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn text-danger" (click)="modal.dismiss('cancel click')">Ich lehne ab.</button>
    <button type="button" ngbAutofocus class="btn btn-primary" (click)="modal.close('Ok click')">Ich bin einverstanden.</button>
  </div>
  `
})
export class NgbdModalConfirmAutofocus {
  constructor(public modal: NgbActiveModal) {}
}

const MODALS: {[name: string]: Type<any>} = {
  focusFirst: NgbdModalConfirm,
  autofocus: NgbdModalConfirmAutofocus
};

@Component({
  selector: 'ngbd-modal-focus',
  templateUrl: './modal-focus.html'
})
export class NgbdModalFocus {

  private modalReference!: NgbModalRef;

  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
      (click)="modal.close('Ok click')">Ok</button>`;

  constructor(private modalService: NgbModal, private cookieService: CookieService) {

  }

  ngAfterContentInit(){
    let cookiesAllowed=localStorage.getItem("klimacookiesallowed");
    if(cookiesAllowed=="true"){
      this.cookieService.allowCookies()
    }
    else{
      this.open('autofocus');
    }
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

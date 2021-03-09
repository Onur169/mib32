import { Component, OnInit } from '@angular/core';
import { ThrowbackClass } from 'src/app/helpers/classes/ThrowbackClass';
import { ThrowbackService } from 'src/app/services/throwback.service';

@Component({
  selector: 'app-throwbacks',
  templateUrl: './throwbacks.component.html',
  styleUrls: ['./throwbacks.component.scss']
})
export class ThrowbacksComponent implements OnInit {

  throwbackPage: ThrowbackClass[];
  maxPage=0;
  page=1;

  constructor(private throwbackService: ThrowbackService) {

    this.throwbackPage=[];
   }

  ngOnInit() {
   this.setProperties();
  }

  async setProperties() {
  this.throwbackPage=await this.throwbackService.getThrowbacks();

   this.setMaxPage();
  }

  async getNewPage(page: number){

    this.throwbackPage=await this.throwbackService.getThrowbacks(page);
    this.setMaxPage();
  }

  setMaxPage(){
    this.maxPage=this.throwbackService.throwbackmanager.getMaxPages()*10;
  }

}

import { Component, OnInit } from '@angular/core';
import { ThrowbackService } from 'src/app/services/throwback.service';

@Component({
  selector: 'app-throwbacks',
  templateUrl: './throwbacks.component.html',
  styleUrls: ['./throwbacks.component.scss']
})
export class ThrowbacksComponent implements OnInit {

  constructor(private throwbackService: ThrowbackService) { }

  ngOnInit() {
    this.setProperties();
  }

  async setProperties() {
    await this.throwbackService.fetch(
      this.throwbackService.throwbackmanager.getCurrentPage()
      );

      console.log(this.throwbackService.throwbackmanager.getFirstThrowback());
  }

}

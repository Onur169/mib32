import { Component, OnInit } from '@angular/core';
import { AllianceClass } from 'src/app/helpers/classes/AllianceClass';
import { AllianceService } from 'src/app/services/alliance.service';
@Component({
  selector: 'app-alliance',
  templateUrl: './alliance.component.html',
  styleUrls: ['./alliance.component.scss']
})
export class AllianceComponent implements OnInit {

  public alliances: Map<number,AllianceClass[]>=new Map();


  constructor(private allianceService: AllianceService) {
  }



  ngOnInit(): void {
    this.fillAlliances();
  }
  async fillAlliances(){
   await this.allianceService.getAlliances();
/*
*/
    this.alliances=this.allianceService.getManyAlliancesAsPages(2);
    console.log("test", this.alliances);
  }

}



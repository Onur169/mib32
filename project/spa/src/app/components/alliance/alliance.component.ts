import { Component, OnInit } from '@angular/core';
import { AllianceProps } from 'src/app/helpers/interfaces/Alliance';
import { AllianceService } from 'src/app/services/alliance.service';
@Component({
  selector: 'app-alliance',
  templateUrl: './alliance.component.html',
  styleUrls: ['./alliance.component.scss']
})
export class AllianceComponent implements OnInit {

  public alliances: AllianceProps[][]=[];


  constructor(private allianceService: AllianceService) {
  }



  ngOnInit(): void {

    this.fillAlliances();
  }

  async fillAlliances(){
    let files=await this.allianceService.fetchAlliance();
    for(let i=0; i<=files.length-1;i+=4){
      let temp: AllianceProps[]=[];
      for(let j=0; j<=3;j++){
      if((i+j)==files.length){
        break;
      }
      else{
        temp.push(files[i+j])
      }
      }
      this.alliances.push(temp);
    }

  }
}



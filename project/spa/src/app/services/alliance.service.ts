import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alliance, AllianceProps } from '../helpers/interfaces/Alliance';

@Injectable({
  providedIn: 'root'
})
export class AllianceService {

  constructor(private http: HttpClient) {


  }

  fetchAlliance(){
    return new Promise<AllianceProps[]>(async (resolve, reject) => {

      try{
        const RequestUrl="./../../assets/jsons/alliance.json";

        let response= await this.http.get<Alliance>(RequestUrl).toPromise();


        console.log(response.files[1]);
          resolve(response.files);


      }catch (error){
        reject(error)
      }
    })

  }

}

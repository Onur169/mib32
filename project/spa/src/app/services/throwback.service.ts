import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ThrowbackClass } from '../helpers/classes/ThrowbackClass';
import { ThrowbackManager } from '../helpers/classes/ThrowbackManager';
import { Demonstration } from '../helpers/interfaces/Demonstration';
import { Throwback } from '../helpers/interfaces/Throwback';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ThrowbackService {
  throwbackmanager: ThrowbackManager;

  constructor(private http: HttpClient, private api: ApiService) {
    this.throwbackmanager=new ThrowbackManager();

  }

  async getThrowbacks(){
    return new Promise(async (resolve, reject) => {
      try{
        let params= new HttpParams()
        .set('page', this.throwbackmanager.getCurrentPage().toString());

        const Url='throwbacks';

        let response= await this.api.fetch(Url, params) as Throwback[];

        let newThrowbacks: ThrowbackClass[]=[];

        response.forEach((value: Throwback) => {
          newThrowbacks.push(new ThrowbackClass(value));
        });
        this.throwbackmanager.setnewPage(this.throwbackmanager.getCurrentPage(),newThrowbacks);

        resolve(response);

      }catch (error){
        reject(error)
      }
    })

  }

}

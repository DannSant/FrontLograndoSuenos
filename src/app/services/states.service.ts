import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVICE_URL } from '../config/config';
import {Observable} from 'rxjs/Rx';
import { AlertService } from './alert.service';

@Injectable()
export class StatesService {

  constructor(
    public http:HttpClient,
    public _alert:AlertService
  ) { }

  loadStates(){
    let url = SERVICE_URL + "/states/all"
    return this.http.get(url).catch((e)=>{
      let errorMessage = e.error.error.message;      
      console.error(errorMessage);
      this._alert.showAlert("Error","Ha ocurrido un error al recuperar los estados. Intenta recargar la pagina","error");
      return Observable.throw(e);
    })
  }

}

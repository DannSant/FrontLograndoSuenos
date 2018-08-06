import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SERVICE_URL } from '../config/config';
import { AlertService } from './alert.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class BankService {

  constructor(
    public http:HttpClient,
    public _alert:AlertService
  ) { }

  loadAllBanks(){
    let url = SERVICE_URL + "/bank/all"
    return this.http.get(url).catch((e)=>{
      let errorMessage = e.error.error.message;      
      console.error(errorMessage);
      this._alert.showAlert("Error","Ha ocurrido un error al recuperar los bancos de la base de datos. Intenta recargar la pagina","error");
      return Observable.throw(e);
    })
  }

}

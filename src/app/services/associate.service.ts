import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Associate } from '../models/associate.model';
import { SERVICE_URL } from '../config/config';
import { AlertService } from './alert.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AssociateService {

  constructor(
    public http:HttpClient,
    public _alert:AlertService
  ) { }

  createAssociate(associate:Associate){
    let url = SERVICE_URL + "/associate";
    return this.http.post(url,associate).catch((e)=>{      
      let errorMessage = e.error.error.message;
      console.error(errorMessage);
      if(e.status==500){
        this._alert.showAlert("Error","Ha ocurrido un error al crear el asociado "+associate.name.toUpperCase()+" Posiblemente falte algun dato que captura, si no funciona intente comunicarse con el administrador","error");
      }else {
        this._alert.showAlert("Error al registrar afiliado","Ha ocurrido al crear usuario, intente nuevamente despues de recargar la pagina, si no funciona intente comunicarse con el administrador","error");
      }
    
      return Observable.throw(e);
    });
  }

  getAssociate(id:string){
    let url = SERVICE_URL+"/associate?id=" + id;
    return this.http.get(url).catch((e)=>{      
      let errorMessage = e.error.error.message;
      console.error(errorMessage);
      
      this._alert.showAlert("Error al obtener datos","Ha ocurrido al recuperar los datos del afiliado, intente nuevamente despues de recargar la pagina, si no funciona intente comunicarse con el administrador","error");
      
    
      return Observable.throw(e);
    });
  }

}

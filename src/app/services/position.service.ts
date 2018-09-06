import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Associate } from '../models/associate.model';
import { SERVICE_URL } from '../config/config';
import { AlertService } from './alert.service';
import { Observable } from 'rxjs/Rx';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import { Position } from '../models/position.model';

@Injectable()
export class PositionService {

  constructor(
    public http:HttpClient,
    public _alert:AlertService,
    public _userService:UserService
  ) { }

  getNewPositions(){
    let url = SERVICE_URL+"/position/new";
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.get(url,{headers}).catch((e)=>{ 
      if (!e.error.error){
        console.log(e); 
        return
      }    
      let errorMessage = e.error.error.message;
      console.error(errorMessage);
      
      this._alert.showAlert("Error al obtener datos","Ha ocurrido al recuperar los datos de los nuevos afiiados y sus posiciones, intente nuevamente despues de recargar la pagina, si no funciona intente comunicarse con el administrador","error");
      
    
      return Observable.throw(e);
    });
  }

  getMyPositions(associateId:string){
    let url = SERVICE_URL+"/position/mine?associateId="+associateId;
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.get(url,{headers}).catch((e)=>{ 
      if (!e.error.error){
        console.log(e); 
        return
      }    
      let errorMessage = e.error.error.message;
      console.error(errorMessage);
      
      this._alert.showAlert("Error al obtener datos","Ha ocurrido al recuperar los datos de las posiciones, intente nuevamente despues de recargar la pagina, si no funciona intente comunicarse con el administrador","error");
      
    
      return Observable.throw(e);
    });
  }

  getAllPositions(){
    let url = SERVICE_URL+"/position/all";
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.get(url,{headers}).catch((e)=>{ 
      if (!e.error.error){
        console.log(e); 
        return
      }    
      let errorMessage = e.error.error.message;
      console.error(errorMessage);
      
      this._alert.showAlert("Error al obtener datos","Ha ocurrido al recuperar los datos de los nuevos afiiados y sus posiciones, intente nuevamente despues de recargar la pagina, si no funciona intente comunicarse con el administrador","error");
      
    
      return Observable.throw(e);
    });
  }

  getPosition(id:string){
    let url = SERVICE_URL+"/position?id="+id;
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.get(url,{headers}).catch((e)=>{ 
      if (!e.error.error){
        console.log(e); 
        return
      }    
      let errorMessage = e.error.error.message;
      console.error(errorMessage);
      
      this._alert.showAlert("Error al obtener datos","Ha ocurrido al recuperar los datos del nuevo registro, intente nuevamente despues de recargar la pagina, si no funciona intente comunicarse con el administrador","error");
      
    
      return Observable.throw(e);
    });
  }

  updateEmailInPosition(position:Position){
    let url = SERVICE_URL+"/position/addEmail/"+position._id;
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.put(url,position,{headers}).catch((e)=>{ 
      if (!e.error.error){
        console.log(e); 
        return
      }    
      let errorMessage = e.error.error.message;
      console.error(errorMessage);
      
      this._alert.showAlert("Error al obtener datos","Ha ocurrido al recuperar los datos del nuevo registro, intente nuevamente despues de recargar la pagina, si no funciona intente comunicarse con el administrador","error");
      
    
      return Observable.throw(e);
    });
  }

}

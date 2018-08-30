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
export class AssociateService {

  constructor(
    public http:HttpClient,
    public _alert:AlertService,
    public _userService:UserService
  ) { }

  registerAssociate(associate:Associate,user:User,position:Position){
    let url = SERVICE_URL + "/register";
    return this.http.post(url,{associate,user,position}).catch((e)=>{        
      if (!e.error.error){
        console.log(e); 
        return
      }  
      let errorMessage = e.error.error.message;
      console.error(errorMessage);
      if(e.status==500){
        this._alert.showAlert("Error","Ha ocurrido un error al crear el asociado "+user.name.toUpperCase()+" Posiblemente falte algun dato que captura, si no funciona intente comunicarse con el administrador","error");
      }else {
        this._alert.showAlert("Error al registrar afiliado","Ha ocurrido al crear usuario, intente nuevamente despues de recargar la pagina, si no funciona intente comunicarse con el administrador","error");
      }
    
      return Observable.throw(e);
    });
  }

  createAssociate(associate:Associate){
    let url = SERVICE_URL + "/associate";
    return this.http.post(url,associate).catch((e)=>{        
      if (!e.error.error){
        console.log(e); 
        return
      }  
      let errorMessage = e.error.error.message;
      console.error(errorMessage);
      if(e.status==500){
        this._alert.showAlert("Error","Ha ocurrido un error al crear el asociado  Posiblemente falte algun dato que captura, si no funciona intente comunicarse con el administrador","error");
      }else {
        this._alert.showAlert("Error al registrar afiliado","Ha ocurrido al crear usuario, intente nuevamente despues de recargar la pagina, si no funciona intente comunicarse con el administrador","error");
      }
    
      return Observable.throw(e);
    });
  }

  updateAssociate(associate:Associate){
    let url = SERVICE_URL + "/associate/" + associate._id;
    return this.http.put(url,associate).catch((e)=>{        
      if (!e.error.error){
        console.log(e); 
        return
      }  
      let errorMessage = e.error.error.message;
      console.error(errorMessage);
      if(e.status==500){
        this._alert.showAlert("Error","Ha ocurrido un error al crear el asociado  Posiblemente falte algun dato que captura, si no funciona intente comunicarse con el administrador","error");
      }else {
        this._alert.showAlert("Error al registrar afiliado","Ha ocurrido al crear usuario, intente nuevamente despues de recargar la pagina, si no funciona intente comunicarse con el administrador","error");
      }
    
      return Observable.throw(e);
    });
  }

  deleteAssociate(associate:Associate){
    let url = SERVICE_URL + "/associate/delete/" + associate._id;
    return this.http.post(url,associate).catch((e)=>{        
      if (!e.error.error){
        console.log(e); 
        return
      }  
      let errorMessage = e.error.error.message;
      console.error(errorMessage);
      if(e.status==500){
        this._alert.showAlert("Error","Ha ocurrido un error al borrar el afiliado ","error");
      }else {
        this._alert.showAlert("Error al registrar afiliado","Ha ocurrido al borrar al afiliado, intente nuevamente despues de recargar la pagina, si no funciona intente comunicarse con el administrador","error");
      }
    
      return Observable.throw(e);
    });
  }

  getAssociate(id:string){
    let url = SERVICE_URL+"/associate?id=" + id;
    return this.http.get(url).catch((e)=>{ 
      if (!e.error.error){
        console.log(e); 
        return
      }    
      let errorMessage = e.error.error.message;
      console.error(errorMessage);
      
      this._alert.showAlert("Error al obtener datos","Ha ocurrido al recuperar los datos del afiliado, intente nuevamente despues de recargar la pagina, si no funciona intente comunicarse con el administrador","error");
      
    
      return Observable.throw(e);
    });
  }

  listAssociates(){
    let url = SERVICE_URL+"/associate/all";
    return this.http.get(url).catch((e)=>{ 
      if (!e.error.error){
        console.log(e); 
        return
      }    
      let errorMessage = e.error.error.message;
      console.error(errorMessage);
      
      this._alert.showAlert("Error al obtener datos","Ha ocurrido al recuperar los datos del afiliado, intente nuevamente despues de recargar la pagina, si no funciona intente comunicarse con el administrador","error");
      
    
      return Observable.throw(e);
    });
  }

  getNewAssociates(){
    let url = SERVICE_URL+"/associate/new";
    let headers = new HttpHeaders({token:this._userService.token})
    return this.http.get(url,{headers}).catch((e)=>{ 
      if (!e.error.error){
        console.log(e); 
        return
      }    
      let errorMessage = e.error.error.message;
      console.error(errorMessage);
      
      this._alert.showAlert("Error al obtener datos","Ha ocurrido al recuperar los datos del afiliado, intente nuevamente despues de recargar la pagina, si no funciona intente comunicarse con el administrador","error");
      
    
      return Observable.throw(e);
    });
  }

}

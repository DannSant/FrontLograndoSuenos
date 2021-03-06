import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import {SERVICE_URL} from '../config/config';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { Associate } from '../models/associate.model';

@Injectable()
export class UserService {

  token:string="";
  loggedUser:User;
  username:string;
  associate:Associate;

  //Constantes
  USER_ROLES = ["USER_ROLE","ADMIN_ROLE"];

  constructor(
    public http:HttpClient,
    public _alert:AlertService,
    public router:Router
  ) {
    this.cargarStorage();
    this.validateSession();

    
   }

   validateSession(){     
    let url = SERVICE_URL + "/validateToken";
    let headers = new HttpHeaders({token:this.token})
    return this.http.post(url,{},{headers}).map((resp:any)=>{
     
      if(resp.ok){
        this.guardarStorage(resp.data._id,resp.token,resp.data,this.associate);
       
      }else {
        this.token="";
        this.loggedUser=null;
        this._alert.showAlert("Sesion Expirada","Vuelva a iniciar sesion","error");
        this.logout(); 
      }
      return resp;
    }).catch((e)=>{     
      if (!e.error.error){
        console.log(e); 
        return
      }  
      let errorMessage = e.error.error.message;
      console.error(errorMessage);
      this._alert.showAlert("Sesion Expirada","Vuelva a iniciar sesion","error");
      this.logout();
      return Observable.throw(e);
    });
   }

   renuevaToken(){
    let url = SERVICE_URL + "/renewToken";
    let headers = new HttpHeaders({
     'token':this.token
    });

    return this.http.get(url,{headers}).map((resp:any)=>{      
      this.guardarStorage(this.loggedUser._id,resp.token,this.loggedUser,this.associate);
      return true;
    }).catch((e)=>{
     let errorMessage= e.error.error.message;       
     this._alert.showAlert('Error al renovar token ',errorMessage,"error")
     this.logout();
    return Observable.throw (e);
    
   });
  }

   isAuthenticated():boolean{
     if (this.loggedUser){
       return true;
     }else {
       return false;
     }
   }

   isAdmin():boolean{
     if(!this.loggedUser){
       return false;
     }else {
      return this.loggedUser.role=="ADMIN_ROLE";
     }
     
   }

   cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem("token");      
      this.loggedUser = JSON.parse(localStorage.getItem("user"));
      this.associate=JSON.parse(localStorage.getItem("associate"));
    }else {
      this.token = "";
      this.loggedUser=null;
      this.associate=null;
    }

    if(localStorage.getItem("username")){
      this.username = localStorage.getItem("username");
    }
    
  }

  guardarStorage(id:string,token:string,user:User,associate:Associate){
   localStorage.setItem("id",id);
   localStorage.setItem("token",token);
   localStorage.setItem("user",JSON.stringify(user));
   localStorage.setItem("associate",JSON.stringify(associate));
   this.loggedUser=user;
   this.token=token;
   this.associate=associate;
  }

  login(username:string,password:string,remember:boolean){
    let url = SERVICE_URL + "/login";
    if(remember){
      localStorage.setItem("username",username);
      this.username=username;
    }
    return this.http.post(url,{username,password}).map((resp:any)=>{
     
      if(resp.ok){
        this.guardarStorage(resp.data.user._id,resp.token,resp.data.user,resp.data.associate);
      }else {
        this.token="";
        this.loggedUser=null;
      }
      return resp;
    }).catch((e)=>{   
      if (!e.error.error){
        console.log(e); 
        return
      }    
      let errorMessage = e.error.error.message;
      this._alert.showAlert("Error al iniciar sesion",errorMessage,"error");
      return Observable.throw(e);
    });
  }

  logout(){
    this.token="";
    this.loggedUser=null;   
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigate(['/home']);
  }

  crearUsuario(user:User){
    let url = SERVICE_URL + "/user";
    let headers = new HttpHeaders({token:this.token})
    //console.log(this.token)
    return this.http.post(url,user,{headers}).catch((e)=>{  
      this._alert.closeWaitWindow();
      if (!e.error.error){
        console.log(e); 
        return
      }     
      let errorMessage = e.error.error.message;
      console.error(errorMessage);
      if(e.status==409){
        this._alert.showAlert("Error","Ha ocurrido un error al usuario, el usuario "+user.username.toUpperCase()+" está ya registrado en la base de datos","error");
      }else {
        this._alert.showAlert("Error al crear usuario","Ha ocurrido al crear usuario, intente nuevamente despues de recargar la pagina","error");
      }
    
      return Observable.throw(e);
    });
  }

  loadAllUsers(){
    let url = SERVICE_URL + "/user/all";
    let headers = new HttpHeaders({token:this.token})
    return this.http.get(url,{headers}).catch((e)=>{      
      let errorMessage = e.error.error.message;
      this._alert.showAlert("Error","Ha ocurrido un error al recuperar los usuarios de la base de datos. Intenta recargar la pagina","error");
      return Observable.throw(e);
    });
  }

  searchUsers(term:string){
    let url = SERVICE_URL + "/user/search/" + term;
    let headers = new HttpHeaders({token:this.token})
    return this.http.get(url,{headers}).catch((e)=>{      
      let errorMessage = e.error.error.message;
      //this._alert.showAlert("Error","Ha ocurrido un error al recuperar los usuarios de la base de datos. Intenta recargar la pagina","error");
      return Observable.throw(e);
    });
  }

  getUser(id:string){
    let url = SERVICE_URL + "/user?id=" + id;
    let headers = new HttpHeaders({token:this.token})
    return this.http.get(url,{headers}).catch((e)=>{      
      let errorMessage = e.error.error.message;
      this._alert.showAlert("Error","Ha ocurrido un error al recuperar al usuario de la base de datos. Intenta recargar la pagina","error");
      return Observable.throw(e);
    });
  }

  modifyUser(user:User){
    let url = SERVICE_URL + "/user/" + user._id;
    let headers = new HttpHeaders({token:this.token})
    return this.http.put(url,user,{headers}).catch((e)=>{      
      let errorMessage = e.error.error.message;
      this._alert.showAlert("Error","Ha ocurrido un error al guardar en la base de datos. Intenta recargar la pagina","error");
      return Observable.throw(e);
    });
  }

  deleteUser(user:User){
    let url = SERVICE_URL + "/user/delete/" + user._id;
    let headers = new HttpHeaders({token:this.token})
    return this.http.post(url,user,{headers}).catch((e)=>{      
      let errorMessage = e.error.error.message;
      this._alert.showAlert("Error","Ha ocurrido un error al borrar el usuario en la base de datos. Intenta recargar la pagina","error");
      return Observable.throw(e);
    });
  }

  sendWelcomeMail(user:User, personalEmail:string,email:String,password?:string){
    let url = SERVICE_URL + "/email/welcome";
    let headers = new HttpHeaders({token:this.token});
    let body = {
      userEmail:email,
      personalEmail:personalEmail,
      userName:user.name,
      userUserName:user.username,
      userPassword:(password?password:user.password)
    }
    return this.http.post(url,body,{headers}).catch((e)=>{      
      let errorMessage = e.error.error.message;
      this._alert.showAlert("Error","Ha ocurrido un error al enviar el email de notificacion","error");
      return Observable.throw(e);
    });
  }

}
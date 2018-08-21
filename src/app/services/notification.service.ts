import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertService } from './alert.service';
import { SERVICE_URL } from '../config/config';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Rx';
import { Notification } from '../models/notification.model';

@Injectable()
export class NotificationService {

  constructor(
    public http:HttpClient,
    public _alert:AlertService,
    public _userService:UserService
  ) { }

  getNotifications(filter:any,page:number){
    let url = SERVICE_URL + `/notification/all?desde=${page}`;

  
    if(filter.broadcast){
      url+=`&broadcast=${filter.broadcast}`;
    }
    if(filter.user){
      url+=`&user=${filter.user}`;
    }

    if(filter.status){
      url+=`&status=${filter.status}`;
    }

    let headers = new HttpHeaders({token:this._userService.token})

    return this.http.get(url,{headers}).catch(this.getCatchFunction("Error al obtener notificaciones"));
  }

  createNotification(notification:Notification){
   let url = SERVICE_URL + "/notificacion";   
   let headers = new HttpHeaders({token:this._userService.token});
   return this.http.post(url,notification,{headers}).catch(this.getCatchFunction("Error al crear notificacion"));
  }

  getCatchFunction(errorMessage:String){
    let f = (e)=>{
      this._alert.closeWaitWindow();
      if (!e.error.error){
        console.log(e); 
        return
      }     
      let errorMessage = e.error.error.message;
      console.error(errorMessage);      
      this._alert.showAlert("Error",errorMessage,"error");
      
    
      return Observable.throw(e);
    };

    return f;
  }

}

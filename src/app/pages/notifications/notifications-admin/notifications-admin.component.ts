import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { AlertService } from '../../../services/alert.service';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-notifications-admin',
  templateUrl: './notifications-admin.component.html',
  styles: []
})
export class NotificationsAdminComponent implements OnInit {
  notifications:Notification[] = [];
  filter:any = {};
  usersFilter:any[]=[]; 
  //parametros de busqueda
  status:number;
  user:string;
  isBroadcast:boolean;
  

  //paginacion
  fromPag:number=0;

  constructor(
    public _notifications:NotificationService,
    public _alert:AlertService,
    public _userService:UserService
  ) {
    this._userService.loadAllUsers().subscribe((resp:any)=>{
      if(resp.ok){
        for(let user of resp.data){
          this.usersFilter.push({
            _id:user._id,
            desc:user.name
          })
        }
      }
    })
   }

  

  ngOnInit() {
    this.populateNotifications();
  }

  populateNotifications(){
    this.buildFilterObject();   
    this._notifications.getNotifications(this.filter,this.fromPag).subscribe((resp:any)=>{
     
      if(resp.ok){
        this.notifications=resp.data;
      }else {
       this._alert.showAlert("Error","Hubo un problema al cargar la informacion","error");
      }
    });
  }

  buildFilterObject(){
    if(this.isBroadcast){
      this.filter.broadcast=true;
      this.filter.user=null;      
    }else {
      this.filter.broadcast=false;
      if(this.user){
        this.filter.user = this.user;
      }else {
        this.filter.user=null;  
      }      
    }

    if(this.status==1){
      this.filter.status=null;
    }else if(this.status==2){
      this.filter.status="true";
    }else if(this.status==3){
      this.filter.status="false";
    }
  }

  resetFilter(){
    this.filter={};
  }

  setSelectedUser(user:any){
    this.user = user._id;   
  }

  deleteNotification(notification:Notification){
    this._notifications.deleteNotification(notification).subscribe((resp:any)=>{
      if(resp.ok){
        this._alert.showAlert("Todo bien","La notificacion des deshabilitó con exito","success");
        this.populateNotifications();
      }
    })
  }

  getShowTags(type:string):string{
    let resp = "";

    return resp;
  }





}

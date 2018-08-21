import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-notifications-admin',
  templateUrl: './notifications-admin.component.html',
  styles: []
})
export class NotificationsAdminComponent implements OnInit {
  notifications:Notification[] = [];
  filter:any = {};
  
  //parametros de busqueda
  status:number;
  user:string;
  isBroadcast:boolean;

  //paginacion
  fromPag:number=0;

  constructor(
    public _notifications:NotificationService,
    public _alert:AlertService
  ) { }

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





}

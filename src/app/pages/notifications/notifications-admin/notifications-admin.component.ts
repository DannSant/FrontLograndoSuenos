import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { AlertService } from '../../../services/alert.service';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { PaginationComponent } from '../../../components/pagination/pagination.component';

@Component({
  selector: 'app-notifications-admin',
  templateUrl: './notifications-admin.component.html',
  styles: [``]
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
  @ViewChild(PaginationComponent) pagination:PaginationComponent;
  fromPage:number;
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
    this.status=1;
    this.isBroadcast=true;
    this.user=null;
    this.populateNotifications();
  }

  populateNotifications(){
    this.buildFilterObject();
    this._alert.showWaitWindow("Cargando","Estamos obteniendo las notificaciones de la base de datos, espere un momento")   
    this._notifications.getNotifications(this.filter,this.fromPage).subscribe((resp:any)=>{
      this._alert.closeWaitWindow();
      if(resp.ok){
        this.notifications=resp.data;
        this.pagination.createPaginationArray(resp.records);
      }else {
       this._alert.showAlert("Error","Hubo un problema al cargar la informacion","error");
      }
    });
  }  

  setPageAndPopulate(newPage:number){
    this.fromPage=newPage;
    this.populateNotifications();
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
        this._alert.showAlertWithCallback("Todo bien","La notificacion des deshabilitó con exito","success",()=>{this.populateNotifications();});

        
      }
    })
  }
  enableNotification(notification:Notification){
    this._notifications.enableNotification(notification).subscribe((resp:any)=>{
      if(resp.ok){
        this._alert.showAlertWithCallback("Todo bien","La notificacion des habilitó con exito","success",()=>{this.populateNotifications();});
      }
    })
  }

  getShowTags(type:string):string{
    let resp = "";
    if(type=="status"){
      if(this.status==1){
        resp="Todas"
      } else if (this.status==2){
        resp="Activas"
      } else if (this.status==3){
        resp="Inactivas"
      }
    }else if(type=="to"){
      if(this.isBroadcast){
        resp="Todos";
      }else {
        resp=(this.user)?this.user:"Usuarios especificos";
      }
    }
    
    return resp;
  }





}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { AlertService } from '../../../services/alert.service';
import { UserService } from '../../../services/user.service';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { Notification } from '../../../models/notification.model';

@Component({
  selector: 'app-notifications-feed',
  templateUrl: './notifications-feed.component.html',
  styles: []
})
export class NotificationsFeedComponent implements OnInit {
  notifications:Notification[] = [];

  //paginacion
  @ViewChild(PaginationComponent) pagination:PaginationComponent;
  fromPage:number;

  constructor(
    public _notifications:NotificationService,
    public _alert:AlertService,
    public _userService:UserService
  ) { }

  ngOnInit() {
    this.populateNotifications();
  }

  populateNotifications(){
    
    this._alert.showWaitWindow("Cargando","Estamos obteniendo las notificaciones de la base de datos, espere un momento")   
    this._notifications.getMyNotifications(this.fromPage).subscribe((resp:any)=>{
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

}

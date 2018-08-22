import { Component, OnInit,ViewChild } from '@angular/core';
import { Notification } from '../../../models/notification.model';
import { NotificationService } from '../../../services/notification.service';
import { AlertService } from '../../../services/alert.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { SearchSelectorComponent } from '../../../components/search-selector/search-selector.component';
import { NgForm } from '@angular/forms';
import { SubirArchivoService } from '../../../services/subir-archivo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styles: []
})
export class NotificationComponent implements OnInit {
  notification:Notification={};
  usersFilter:any[]=[];
  selectedFile:File;
  @ViewChild(SearchSelectorComponent) searchUserCombo: SearchSelectorComponent;
  constructor(
    public _notifications:NotificationService,
    public _alert:AlertService,
    public _userService:UserService,
    public _subirArchivo:SubirArchivoService,
    public activatedRoute:ActivatedRoute,
    public router:Router
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
    });
    this.activatedRoute.params.subscribe((params:any)=>{
      let id = params.id;
      if(id!="new"){
        this._notifications.getNotification(id).subscribe((resp:any)=>{          
          if(resp.ok){
            this.notification=resp.data;            
            if(this.notification.userTo){
              this.searchUserCombo.setElement({
                _id:this.notification.userTo._id,
                desc:this.notification.userTo.name
              })
            }
            
          }
        })
      }else {
        this.notification={};
      }
    });
   }

  ngOnInit() {
    this.notification.type="T";
    this.notification.broadcast=true;
  }

  selectUser(user:any){
    let userTo = new User();
    userTo._id=user._id;
    this.notification.userTo=userTo;
    this.notification.broadcast=false;
  }

  selectBroadcast(){
    this.notification.userTo=null;
    this.notification.broadcast=true;
    this.searchUserCombo.resetSelection();
  }

  selectFile(archivo){
    
    if(!archivo){
      this.selectedFile=null;
      return;
    }

    if(archivo.name.indexOf(" ")>0){
      this._alert.showAlert("Error","El nombre del archivo no puede contener espacios","error");
      this.selectedFile=null;
      return;
    }

    this.selectedFile=archivo;
  }

  saveNotification(f:NgForm){
    if(f.invalid){
      this._alert.showAlert("Error","Faltan datos por capturar","error");
      return;
    }    
    if(this.notification._id==undefined){
      this.createNotification();
    }else {
      this.updateNotification();
    }
  }

  updateNotification(){   
    if(this.notification.type=="F"){
      this.notification.text=this.selectedFile.name;
      this.uploadFile();
     
      this._notifications.updateNotification(this.notification).subscribe((resp:any)=>{        
        if(resp.ok){
          this._alert.showAlert("Todo bien","Todo se actualizó de manera correcta","success");
        }
      });

    }else if(this.notification.type=="T"){
      this._notifications.updateNotification(this.notification).subscribe((resp:any)=>{
        
        if(resp.ok){
          this._alert.showAlert("Todo bien","Todo se actualizó de manera correcta","success");
        }
      });
    }
  }

  createNotification(){
    if(this.notification.type=="F"){
      this.notification.text=this.selectedFile.name;
      this.uploadFile();
     
      this._notifications.createNotification(this.notification).subscribe((resp:any)=>{
       
        if(resp.ok){
          this._alert.showAlert("Todo bien","Todo se creó de manera correcta","success");
          this.router.navigate(['/notification',resp.data._id]);
        }
      });

    }else if(this.notification.type=="T"){
      this._notifications.createNotification(this.notification).subscribe((resp:any)=>{
       
        if(resp.ok){
          this._alert.showAlert("Todo bien","Todo se creó de manera correcta","success");
          this.router.navigate(['/notification',resp.data._id]);
        }
      });
    }
  }

  uploadFile(){
    this._alert.showWaitWindow("Cargando","Estamos subiendo tu archivo");
    this._subirArchivo.subirArchivo(this.selectedFile,null,"generalfiles","POST")
    .then((resp)=>{  
     console.log(resp);
    })
    .catch((error)=>{
      console.log(error);
      console.log("error en la carga");
    }).finally(()=> {
      this._alert.closeWaitWindow();
     });
  }

}

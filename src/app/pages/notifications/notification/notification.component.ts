import { Component, OnInit,ViewChild } from '@angular/core';
import { Notification } from '../../../models/notification.model';
import { NotificationService } from '../../../services/notification.service';
import { AlertService } from '../../../services/alert.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { SearchSelectorComponent } from '../../../components/search-selector/search-selector.component';
import { NgForm } from '@angular/forms';

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
    this.notification.type="T";
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
    this.selectedFile=archivo;
  }

  createNotification(f:NgForm){
    console.log(f.value);
    console.log(this.notification);
    console.log(this.selectedFile);
  }

}

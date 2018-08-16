import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styles: []
})
export class ViewUserComponent implements OnInit {
  user:User={};
  constructor(
    public activatedRoute:ActivatedRoute,
    public _userService:UserService,
    public _alert:AlertService
  ) { 
    this.activatedRoute.params.subscribe((params:any)=>{
      let id = params.id;
      
      this._userService.getUser(id).subscribe((resp:any)=>{
       
        if(resp.ok){
          this.user = resp.data;
        }else {
          this._alert.showAlert("Error","Error al recuperar datos del usuario","error");
          this.user={};
        }
      })
    });
  }

  ngOnInit() {
  }

   copyToClipboard ( str:string) {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

}

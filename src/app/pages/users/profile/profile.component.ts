import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../../services/alert.service';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  password1:string='';
  password2:string='';
  user:User={};

  errors:string;

  constructor(
    public _alert:AlertService,
    public _userService:UserService,
    public activatedRoute:ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params:any)=>{
      let id=params.id;
      this._userService.getUser(id).subscribe((resp:any)=>{
        if(resp.ok){
          this.user = resp.data;
        }
      })
    })
   }

  ngOnInit() {
  }


  updateUser(f:NgForm){
    if(this.password1!=this.password2){
      this.errors="PASSWORD_MATCH";
      this._alert.showAlert("Error", "Las contraseñas no coinciden", "error");
      return;
    }

    if(f.invalid){
      this._alert.showAlert("Error", "Faltan datos de capturar", "error");
      return;
    }
    this.errors='';

    let userToSave = new User();

    userToSave.name = this.user.name;
    userToSave._id=this.user._id;
    if(this.password1.length>0){
      userToSave.password=this.password1;
    }else {
      userToSave.password='';
    }


    this._userService.modifyUser(userToSave).subscribe((resp:any)=>{
      this._alert.showAlert("Todo bien!","Los datos se han actualizado de manera correcta", "success");
    });


  }

}

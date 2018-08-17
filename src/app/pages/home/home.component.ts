import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { NgForm } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  email:string;
  remember:boolean;
  constructor(
    public _userService:UserService,
    public _alert:AlertService
  ) { }

  ngOnInit() {
    this.email=this._userService.email;
    if(this.email){
      this.remember=true;
    }
  }

  loginUser(f:NgForm){
    
    if(!f.valid){
      this._alert.showAlert("Error","Debes escribir email y contraseña","error");
      return;
    }

    let email = f.value.email;
    let password = f.value.password;
    let remember = f.value.remember;

    this._userService.login(email,password,remember).subscribe((resp)=>{
      
      if(resp.ok){
        //this.router.navigate(['/services']);
      }else {
        this._alert.showAlert("Error","Credenciales incorrectas","error");
      }
      
    })
  }

}

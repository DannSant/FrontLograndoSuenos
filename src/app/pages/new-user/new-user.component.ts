import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styles: []
})
export class NewUserComponent implements OnInit {

  user:User = {};

  constructor(
    public _userService:UserService,
    public _alert:AlertService,
    public router:Router
  ) { }

  ngOnInit() {
  }

  createUser(f:NgForm){
    if(f.invalid){
      this._alert.showAlert("Error", "Faltan datos de capturar", "error");
      return;
    }
    this._alert.showWaitWindow("Cargando","Estamos procesando la informacion, por favor espere");
    this._userService.crearUsuario(this.user).subscribe((resp:any)=>{
      this._alert.closeWaitWindow();
      if (resp.ok){
        //redireccionar a pantalla con el link
        let id = resp.data._id;
        this.router.navigate(['/viewUser',id]);
      }else {
        console.log(resp);
        this._alert.showAlert("Error","Ocurrio un error al dar de alta el usuario","error")
      }
    })
  }

}

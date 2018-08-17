import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { NgForm } from '../../../../../node_modules/@angular/forms';
import { UserService } from '../../../services/user.service';
import { AlertService } from '../../../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Associate } from '../../../models/associate.model';
import { AssociateService } from '../../../services/associate.service';

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
    public router:Router,
    public activatedRoute:ActivatedRoute,
    public _associates:AssociateService
  ) {
    this.activatedRoute.params.subscribe((params:any)=>{
      let associateId = params.associate_id;
      if(associateId){
        this._associates.getAssociate(associateId).subscribe((resp:any)=>{
          if(resp.ok){
            this.user.associate=resp.data;
            this.user.name=resp.data.name;
            this.user.username=resp.data.id;
            this.user.password="lograndosuenos7";           
          }
        })
      }
    })
   }

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
        //Enviar email
        this._userService.sendWelcomeMail(this.user,this.user.associate.personalEmail).subscribe();
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

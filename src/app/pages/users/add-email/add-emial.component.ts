import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { NgForm } from '../../../../../node_modules/@angular/forms';
import { UserService } from '../../../services/user.service';
import { AlertService } from '../../../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Associate } from '../../../models/associate.model';
import { AssociateService } from '../../../services/associate.service';
import { Position } from '../../../models/position.model';
import { PositionService } from '../../../services/position.service';

@Component({
  selector: 'app-add-email',
  templateUrl: './add-email.component.html',
  styles: []
})
export class AddEmailComponent implements OnInit {

  user:User = {};
  position:Position={
    associate:{
      user:{}
    }
  };

  constructor(
    public _userService:UserService,
    public _alert:AlertService,
    public router:Router,
    public activatedRoute:ActivatedRoute,
    public _positions:PositionService
  ) {
    this.activatedRoute.params.subscribe((params:any)=>{
      let posId = params.associate_id;
      if(posId){
        this._positions.getPosition(posId).subscribe((resp:any)=>{
          if(resp.ok){
            this.position=resp.data;
            // this.user.name=this.position.associate.user.name;
            // this.user.username=resp.data.user.username;
            this.position.associate.user.password="lograndosuenos7";           
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
    this._positions.updateEmailInPosition(this.position).subscribe((resp:any)=>{
      this._alert.closeWaitWindow();
      if (resp.ok){
        //Enviar email
        //this._userService.sendWelcomeMail(this.user,this.position.associate.personalEmail,this.position.email).subscribe();
        //redireccionar a pantalla con el link
        let id = resp.data._id;
        //this.router.navigate(['/viewUser',id]);
      }else {
        console.log(resp);
        this._alert.showAlert("Error","Ocurrio un error al dar de alta el usuario","error")
      }
    })
  }

}

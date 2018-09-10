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

  addEmail(f:NgForm){
    
    if(f.invalid){
      this._alert.showAlert("Error", "Faltan datos de capturar", "error");
      return;
    }
    this._alert.showWaitWindow("Cargando","Estamos procesando la informacion, por favor espere");
    this._positions.updateEmailInPosition(this.position).subscribe((resp:any)=>{
      this._alert.closeWaitWindow();
      if (resp.ok){
        //Enviar email si es la primera posicion de este afiliado
        if(this.position.isFirst){
          this._userService.sendWelcomeMail(
            this.position.associate.user, //Usuario al que se va a mandar el email, aqui vienen datos como username y password
            this.position.associate.personalEmail, //email personal, que es donde se mandará la info
            this.position.email //email de logrando suenos recien creado, se envía en el cuerpo del correo
          ).subscribe();
        }        
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

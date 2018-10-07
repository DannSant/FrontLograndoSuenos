import { Component, OnInit } from '@angular/core';
import { Bank } from '../../../models/bank.model';
import { Associate } from '../../../models/associate.model';
import { State } from '../../../models/state.model';
import { AlertService } from '../../../services/alert.service';
import { BankService } from '../../../services/bank.service';
import { AssociateService } from '../../../services/associate.service';
import { StatesService } from '../../../services/states.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { NgForm } from '@angular/forms';
import { UtilsService } from '../../../services/utils.service';
import { Position } from '../../../models/position.model';
import { PositionService } from '../../../services/position.service';

@Component({
  selector: 'app-associate-detail',
  templateUrl: './associate-detail.component.html',
  styles: []
})
export class AssociateDetailComponent implements OnInit {

  banks:Bank[] = [];
  selectedBank:Bank;
  states:State[] = [];

  associate:Associate={
    bank:{},
    state:{},
    user:{}
  };

  firstPosition:Position;

  errors:string="";
  phase:string="init";

  constructor(
    public _alert:AlertService,
    public _banks:BankService,
    public _associates:AssociateService,
    public _states:StatesService,
    public router:Router,
    public activatedRoute:ActivatedRoute,
    public _userService:UserService,
    public _utils:UtilsService,
    public _positions:PositionService
  ) { }

  ngOnInit() {    
    this.checkForUser();
  }

  
  checkForUser(){
    this.activatedRoute.params.subscribe((params:any)=>{
      let id = params.id;
      if(!id){
        this._alert.showAlert("Error","No se ha recibido un id de afiliado, favor de ingresar correctamente desde la opcion Lista de afiliados","error");
        this.router.navigate(["/associateList"]);
        return;
      }     
      this._associates.getAssociate(id).subscribe((resp:any)=>{
        this.populateCatalogs();
       
        if(resp.ok){
          if (!resp.data.bank){
            resp.data.bank = {_id:"0"}
          }
          if (!resp.data.state){
            resp.data.state = {_id:"0"}
          }
        
          this.associate = resp.data;
        }else {
          this._alert.showAlert("Error","Error al recuperar datos del afiliado","error");
          this.associate={};
        }
      })

      this._positions.getFirstPositions(id).subscribe((resp:any)=>{
       
        if(resp.ok){
          this.firstPosition=resp.data
        }
      })

    });
  }


  populateCatalogs(){
    this._banks.loadAllBanks().subscribe((resp:any)=>{
      
      if(resp.ok){
        this.banks=resp.data;
      }else {
        this.banks=[];
        console.log("Error al cargar bancos");
        console.log(resp.error);
      }
    });
    this._states.loadStates().subscribe((resp:any)=>{
    
      if(resp.ok){
        this.states=resp.data;
      }else {
        this.states=[];
        console.log("Error al cargar estados");
        console.log(resp.error);
      }
      
    });
  }

  sendEmail(){
   
    this._userService.sendWelcomeMail(
      this.associate.user, //Usuario al que se va a mandar el email, aqui vienen datos como username y password
      this.associate.personalEmail, //email personal, que es donde se mandará la info
      this.firstPosition.email, //email de logrando suenos recien creado, se envía en el cuerpo del correo
      'lograndosuenos7'
    ).subscribe((resp:any)=>{
      
      if(resp.ok){
        this._alert.showAlert("Todo bien", "Se ha reenviado el correo de manera correcta", "success");
      }else {
        console.log(resp);
        this._alert.showAlert("Error", "Error al enviar correo", "error");
      }
    });
  }


  updateAssociate(f:NgForm){

    // if(this.associate.bank._id=="0"){
    //   this.errors="MISSING_BANK";
    //   return;
    // }

    // if(this.associate.state._id=="0"){
    //   this.errors="MISSING_STATE";
    //   return;
    // }

    if(this._utils.getAge(this.associate.birthDate)<18){
      this.errors="UNDER_AGED";
      return;
    }
    
    if(f.invalid){
      this._alert.showAlert("Error", "Faltan datos de capturar", "error");
      return;
    }

    if(!this._utils.validateCurp(this.associate.curp)){
      this._alert.showAlert("Error", "El curp no tiene un formato correcto, favor de corregirlo", "error");
      return;
    }

    if(!this._utils.validateRFC(this.associate.rfc)){
      this._alert.showAlert("Error", "El rfc no tiene un formato correcto, favor de corregirlo", "error");
      return;
    }
  
    this._associates.updateAssociate(this.associate).subscribe((resp:any)=>{
      //console.log(resp);
      if(resp.ok){
        this._alert.showAlert("Todo bien!", "Los datos se guardaron de manera correcta", "success");
      }else {
        this._alert.showAlert("Error", "Ha ocurrido un problema al dar de alta al usuario.", "error");
      }
    });
  }

}

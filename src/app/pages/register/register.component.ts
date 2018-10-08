import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { BankService } from '../../services/bank.service';
import { AssociateService } from '../../services/associate.service';
import { Associate } from '../../models/associate.model';
import { Bank } from '../../models/bank.model';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { StatesService } from '../../services/states.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { State } from '../../models/state.model';
import { Position } from '../../models/position.model';
import { User } from '../../models/user.model';
import { UtilsService } from '../../services/utils.service';
import { ReCaptchaComponent } from 'angular2-recaptcha';

declare var $ :any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [`
  .ng-invalid.ng-touched:not(form) {
    border: 1px solid red;
  }

  .input-error {
    color:red;
  }`]
})
export class RegisterComponent implements OnInit {

  banks:Bank[] = [];
  selectedBank:Bank;
  states:State[] = [];
  

  associate:Associate={};
  user:User={};
  position:Position={};

  //Modal Control
  userReferenceText="";
  searchTerm="";
  show=false;
  foundUsers:User[]=[];

  errors:string="";
  phase:string="init";

  @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

  constructor(
    public _alert:AlertService,
    public _banks:BankService,
    public _associates:AssociateService,
    public _states:StatesService,
    public router:Router,
    public activatedRoute:ActivatedRoute,
    public _userService:UserService,
    public _utils:UtilsService
  ) { 
    
  }
  /*
  */


  ngOnInit() {
    
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

    this.associate.state={_id:"0"};
    this.associate.bank = {_id:"0"};    
  }

  handleCorrectCaptcha(event){
    //console.log(event);
  }

  register(f:NgForm){

    // if(this.associate.bank._id=="0"){
    //   this.errors="MISSING_BANK";
    //   return;
    // }

    // if(this.associate.state._id=="0"){
    //   this.errors="MISSING_STATE";
    //   return;
    // }
    let token = this.captcha.getResponse();
    
    if(token==undefined||token==''){
      this._alert.showAlert("Error", "Favor de verificar el captcha (No soy un robot)", "error");
      return;
    }

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

    this._associates.registerAssociate(this.associate,this.user,this.position).subscribe((resp:any)=>{
      //console.log(resp);
      if(resp.ok){
        let id = resp.data.position._id;
        this.router.navigate(['/boucher',id]);
      }else {
        this._alert.showAlert("Error", "Ha ocurrido un problema al dar de alta al usuario.", "error");
      }
    });
  }

  showModal(){
    this.searchTerm="";
    this.foundUsers=[];
    this.show=true;
  }

  searchUsers(){
  
    if (this.searchTerm==undefined || this.searchTerm.length<=3){
      this.foundUsers=[];
      return;
    }
    
    this._userService.searchUsers(this.searchTerm).subscribe((resp:any)=>{
      if(resp.ok){
        this.foundUsers=resp.data;
      }
    });
    
  }

  selectUser(user:User){
    this.userReferenceText = user.name + " " + user.lastname;
    this.associate.userReference=user;
    this.show=false;
  }

 

}

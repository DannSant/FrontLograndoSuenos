import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { BankService } from '../../services/bank.service';
import { AssociateService } from '../../services/associate.service';
import { Associate } from '../../models/associate.model';
import { Bank } from '../../models/bank.model';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { StatesService } from '../../services/states.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';


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
  states:any[] = [];

  associate:Associate={};

  errors:string="";
  phase:string="init";

  constructor(
    public _alert:AlertService,
    public _banks:BankService,
    public _associates:AssociateService,
    public _states:StatesService,
    public router:Router,
    public activatedRoute:ActivatedRoute,
    public _userService:UserService
  ) { 
    
  }
  /*
  checkForUser(){
    this.activatedRoute.params.subscribe((params:any)=>{
      let id = params.id;
      if(!id){
        this.phase="nouser";
        return;
      }
      this.phase="normal";
      this._userService.getUser(id).subscribe((resp:any)=>{
       
        if(resp.ok){
          this.associate.email = resp.data.email;
        }else {
          this._alert.showAlert("Error","Error al recuperar datos del usuario","error");
          this.associate.email=null;
        }
      })
    });
  }*/
  

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

    this.associate.state="0";
    this.associate.bank="0";
  }

  register(f:NgForm){

    if(this.associate.bank=="0"){
      this.errors="MISSING_BANK";
      return;
    }

    if(this.associate.state=="0"){
      this.errors="MISSING_STATE";
      return;
    }

    if(f.invalid){
      this._alert.showAlert("Error", "Faltan datos de capturar", "error");
      return;
    }

    if(!this.validateCurp(this.associate.curp)){
      this._alert.showAlert("Error", "El curp no tiene un formato correcto, favor de corregirlo", "error");
      return;
    }

    if(!this.validateRFC(this.associate.rfc)){
      this._alert.showAlert("Error", "El rfc no tiene un formato correcto, favor de corregirlo", "error");
      return;
    }

    this._associates.createAssociate(this.associate).subscribe((resp:any)=>{
      console.log(resp);
      if(resp.ok){
        let id = resp.data._id;
        this.router.navigate(['/boucher',id]);
      }else {
        this._alert.showAlert("Error", "Ha ocurrido un problema al dar de alta al usuario.", "error");
      }
    });
  }

  validateCurp(curp) {
    var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
        validado = curp.match(re);
	
    if (!validado)  //Coincide con el formato general?
    	return false;
    
    //Validar que coincida el dígito verificador
    function digitoVerificador(curp17) {
        //Fuente https://consultas.curp.gob.mx/CurpSP/
        var diccionario  = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
            lngSuma      = 0.0,
            lngDigito    = 0.0;
        for(var i=0; i<17; i++)
            lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
        lngDigito = 10 - lngSuma % 10;
        if (lngDigito == 10) return 0;
        return lngDigito;
    }
  
    if (validado[2] != digitoVerificador(validado[1])) 
    	return false;
        
    return true; //Validado
}

 validateRFC(rfc, aceptarGenerico = true) {
  const re       = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
  var   validado = rfc.match(re);

  if (!validado)  //Coincide con el formato general del regex?
      return false;

  //Separar el dígito verificador del resto del RFC
  const digitoVerificador = validado.pop(),
        rfcSinDigito      = validado.slice(1).join(''),
        len               = rfcSinDigito.length,

  //Obtener el digito esperado
        diccionario       = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ",
        indice            = len + 1;
  var   suma,
        digitoEsperado;

  if (len == 12) suma = 0
  else suma = 481; //Ajuste para persona moral

  for(var i=0; i<len; i++)
      suma += diccionario.indexOf(rfcSinDigito.charAt(i)) * (indice - i);
  digitoEsperado = 11 - suma % 11;
  if (digitoEsperado == 11) digitoEsperado = 0;
  else if (digitoEsperado == 10) digitoEsperado = "A";

  //El dígito verificador coincide con el esperado?
  // o es un RFC Genérico (ventas a público general)?
  if ((digitoVerificador != digitoEsperado)
   && (!aceptarGenerico || rfcSinDigito + digitoVerificador != "XAXX010101000"))
      return false;
  else if (!aceptarGenerico && rfcSinDigito + digitoVerificador == "XEXX010101000")
      return false;
  return rfcSinDigito + digitoVerificador;
}

}

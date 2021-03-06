import { Injectable } from '@angular/core';
import { Bank } from '../models/bank.model';
import { State } from '../models/state.model';
import { User } from '../models/user.model';

@Injectable()
export class UtilsService {

  constructor() { }

  validateString(value:any,defaultVal:string){
    let response = value;
    if(value ==null){
      response = defaultVal;
    }else if(value==undefined){
      response=defaultVal;
    }else if(value==''){
      response=defaultVal;
    }

    response = response.toString()

    return response;
  }

  validateUserCompleteName(user:User,defaultValue="nodata",type=1){
   
    if(!user){
      return defaultValue;
    }
    if(type==1){
      let response = user.name;
      if(user.name==null){
        response=defaultValue;
      }else if(user.name==undefined){
        response=defaultValue;
      }else if(user.name==''){
        response=defaultValue;
      }
      return response.toString();
    }else {
      let response = user.lastname;
      if(user.lastname==null){
        response=defaultValue;
      }else if(user.lastname==undefined){
        response=defaultValue;
      }else if(user.lastname==''){
        response=defaultValue;
      }
      return response.toString();
    }
  }

  validateBank(bank:Bank,defaultVal:string){
    let response = (bank?bank.name:defaultVal);
    
    if(response==''){
      response = defaultVal;
    }

    return response;
  }

  validateState(state:State,defaultVal:string){
    let response = (state?state.name:defaultVal);
    
    if(response==''){
      response = defaultVal;
    }

    return response;
  }

  validateCurp(curp) {
    if(!curp || curp==''){
      return true;
    }
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

   getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  customDateFormat(date:any){
   
    let stringDate = date.substring(0,10);
    let stringDay = stringDate.split("-")[2]
    let stringMonth = stringDate.split("-")[1]
    let stringYear = stringDate.split("-")[0]
    let newDate= new Date(stringYear,stringMonth,stringDay );

 
   
    let response=""
    let day = newDate.getDay() + 1
    let month = newDate.getMonth() + 1
    let year = newDate.getFullYear()
    response = stringDay + "-" + stringMonth + "-" + stringYear
    
    return response;
  }

  customStringFormat(value:string,defaultValue:string,digits:number=4,character=" "){
    let response = "";
    
    response = this.validateString(value,defaultValue);

    if(response==defaultValue){
      return response;
    }else {
      response="";
    }

    if (value=="nodata"){
      return value;
    }

    for (let i=0;i<value.length;i++){
      if ((i)%digits==0){
        response += character + value[i]
      }else {
        response += value[i]
      }
    }
    
    return response;
  }

  

}

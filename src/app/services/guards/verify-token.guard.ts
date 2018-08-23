import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';

@Injectable()
export class VerifyTokenGuard implements CanActivate {
  constructor(
    public _usuarioService:UserService,
    public router:Router
  ){}

  canActivate():Promise<boolean> | boolean {
    
    let token = this._usuarioService.token;
    let payload = JSON.parse(atob(token.split(".")[1]));
   

    let expirado = this.expirado(payload.exp);

    if(expirado){
      this.router.navigate(['/login'])
      return true;
    }



    return this.verificaRenueva(payload.exp);
  }

  verificaRenueva(fechaDeExpiracion:number):Promise<boolean>{
    return new Promise((resolve,reject)=>{
      let fechaExp = new Date(fechaDeExpiracion*1000);
      let ahora = new Date();
      ahora.setTime(ahora.getTime() + (4*60*60*1000));
      
      if(fechaExp.getTime()>ahora.getTime()){
        resolve(true)
      }else {
        this._usuarioService.renuevaToken().subscribe((resp)=>{
          resolve(true)
        },()=>{
          this.router.navigate(['/login'])
          reject(false);
        })
      }
      return resolve(true)
    })
  }

  expirado(fechaDeExpiracion:number){
    //  exp trae la fecha en segundos, hay que convertir los milisegundos de getTime() 
    //  a segundo para poder comparar ambas fechas
    let ahora = new Date().getTime()/1000; 
    if(fechaDeExpiracion<ahora){
      return true;
    }else {
      return false;
    }
  }
}

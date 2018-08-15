import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    public _usuarioService:UserService,
    public router:Router
  ){}
  
canActivate(){
  if(this._usuarioService.isAuthenticated()){
    return true;
  }else {
    this.router.navigate(['/home']);
  return false;
  }

}
}

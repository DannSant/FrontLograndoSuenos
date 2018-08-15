import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    public _usuarioService:UserService
  ){

  }
  canActivate(){
    if (!this._usuarioService.loggedUser){
      return false;
    }
    if(this._usuarioService.loggedUser.role=="ADMIN_ROLE"){
      return true;
    }else {
      this._usuarioService.logout();
      return false;
    }
    
  }
}

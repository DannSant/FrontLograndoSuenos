import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { AlertService } from '../../../services/alert.service';
import { Position } from '../../../models/position.model';
import { PositionService } from '../../../services/position.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styles: []
})
export class ViewUserComponent implements OnInit {
  position:Position={};
  user:User={};
  constructor(
    public activatedRoute:ActivatedRoute,
    public _positions:PositionService,
    public _alert:AlertService
  ) { 
    this.activatedRoute.params.subscribe((params:any)=>{
      let id = params.id;
      
      this._positions.getPosition(id).subscribe((resp:any)=>{
       
        if(resp.ok){
          this.position = resp.data;
          this.user=this.position.associate.user;
        }else {
          this._alert.showAlert("Error","Error al recuperar datos del usuario","error");
          this.position={};
        }
      })
    });
  }

  ngOnInit() {
  }

   copyToClipboard ( str:string) {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

}

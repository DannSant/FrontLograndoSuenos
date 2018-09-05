import { Component, OnInit } from '@angular/core';
import { Associate } from '../../../models/associate.model';
import { AssociateService } from '../../../services/associate.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { PositionService } from '../../../services/position.service';
import { Position } from '../../../models/position.model';

@Component({
  selector: 'app-welcome-associate',
  templateUrl: './welcome-associate.component.html',
  styles: []
})
export class WelcomeAssociateComponent implements OnInit {

  position:Position={};

  constructor(
    public _positions:PositionService,
    public _alert:AlertService,
    public activatedRoute:ActivatedRoute
  ) { 
    this.activatedRoute.params.subscribe((params:any)=>{
      let id=params.id;
      this._positions.getPosition(id).subscribe((resp:any)=>{
        //console.log(resp);
        if(resp.ok){
          this.position=resp.data;
        }
      });
    })
  }

  ngOnInit() {
    this._alert.showAlert(
      "Todo bien!",
      "Gracias por registrarte en Logrando Sueños 7",
      "success"
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { Associate } from '../../../models/associate.model';
import { AssociateService } from '../../../services/associate.service';
import { AlertService } from '../../../services/alert.service';
import { PositionService } from '../../../services/position.service';
import { Position } from '../../../models/position.model';

@Component({
  selector: 'app-new-associates',
  templateUrl: './new-associates.component.html',
  styles: []
})
export class NewAssociatesComponent implements OnInit {

  selectedPosition:Position;
  positions:Position[]=[];

  constructor(
    public _positions:PositionService,
    public _alert:AlertService
  ) { }

  ngOnInit() {
    this._positions.getNewPositions().subscribe((resp:any)=>{
     
      if(resp.ok){
        this.positions=resp.data;
      }else {
        this._alert.showAlert("Error","Error al cargar posiciones de afiliados","error");
      }
    })
  }

}

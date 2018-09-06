import { Component, OnInit } from '@angular/core';
import { PositionService } from '../../../services/position.service';
import { AlertService } from '../../../services/alert.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styles: []
})
export class PositionListComponent implements OnInit {
  positions:Position[] = []
  associateId:string
  constructor(
    public _positions:PositionService,
    public _alert:AlertService,
    public activatedRoute:ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params)=>{
      let id = params.id;
      this.associateId= id;
      this._positions.getMyPositions(id).subscribe((resp)=>{
        if(resp.ok){
          this.positions = resp.data;
        }
      })
    })
  }

}

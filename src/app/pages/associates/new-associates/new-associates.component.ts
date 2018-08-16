import { Component, OnInit } from '@angular/core';
import { Associate } from '../../../models/associate.model';
import { AssociateService } from '../../../services/associate.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-new-associates',
  templateUrl: './new-associates.component.html',
  styles: []
})
export class NewAssociatesComponent implements OnInit {

  selectedAssociate:Associate;
  associates:Associate[]=[];

  constructor(
    public _associates:AssociateService,
    public _alert:AlertService
  ) { }

  ngOnInit() {
    this._associates.getNewAssociates().subscribe((resp:any)=>{
      if(resp.ok){
        this.associates=resp.data;
      }else {
        this._alert.showAlert("Error","Error al cargar afiliados","error");
      }
    })
  }

}

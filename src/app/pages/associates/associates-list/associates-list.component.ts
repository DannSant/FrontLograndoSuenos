import { Component, OnInit } from '@angular/core';
import { Associate } from '../../../models/associate.model';
import { AssociateService } from '../../../services/associate.service';
import { AlertService } from '../../../services/alert.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-associates-list',
  templateUrl: './associates-list.component.html',
  styles: []
})
export class AssociatesListComponent implements OnInit {
  associates:Associate[] = [];
  term:string="";
  constructor(
    public _associates:AssociateService,
    public _alert:AlertService
  ) { }

  ngOnInit() {
    this.listAssociates();
  }

  listAssociates(){
    this._associates.listAssociates().subscribe((resp:any)=>{
      if(resp.ok){
        this.associates=resp.data;
      }else {
        this._alert.showAlert("Error","Error al cargar afiliados","error");
      }
    })
  }

  
  search(){

    if(this.term==undefined || this.term.length<=0){
      this.listAssociates();
      return;
    }

    this._associates.searchAssociates(this.term).subscribe((resp:any)=>{
      if(resp.ok){
        this.associates=resp.data;
      }else {
        this._alert.showAlert("Error","Error al cargar afiliados","error");
      }
    })
   
  }

  deleteAssociate(associate:Associate){
    this._associates.deleteAssociate(associate).subscribe((resp:any)=>{
      if(resp.ok){
       this._alert.showAlert("Todo bien","El afiliado " + associate.user.name.toUpperCase() + " fue eliminado con éxito","success");
       this.listAssociates();
      }else {
        this._alert.showAlert("Error","Error al borrar afiliado","error");
      }
    })
  }

}

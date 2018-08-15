import { Component, OnInit } from '@angular/core';
import { AssociateService } from '../../services/associate.service';
import { Associate } from '../../models/associate.model';
import { AlertService } from '../../services/alert.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
 
@Component({
  selector: 'app-download-database',
  templateUrl: './download-database.component.html',
  styles: []
})
export class DownloadDatabaseComponent implements OnInit {

  constructor(
    public _associates:AssociateService,
    public _alert:AlertService
  ) { }

  associates:Associate[] = [];

  ngOnInit() {
    this._alert.showWaitWindow("Cargando","Estamos extrayendo la informacion de la base de datos, esto puede tardar unos momentos");
    this._associates.listAssociates().subscribe((resp:any)=>{
      this._alert.closeWaitWindow();
      if(resp.ok){
        this.associates=resp.data;
      }
    })
  }

  download(){
    new Angular5Csv(this.associates, 'Base');
  }

}

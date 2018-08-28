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
    let db = this.generateDB();
    new Angular5Csv(
      db, 
      'Base',
      {
        showLabels:true,
        headers: ['NUM','NOMBRE','PAGO REALIZADO','BANCO','CUENTA','CTA. CLABE','TARJETA','FECHA DE NACIMIENTO',	'CURP',	'RFC',	'MOVIL'	,'DOMICILIO','ESTADO']
      }
      
    );
  }

  generateDB(){
    let db:any[] = []
    for (let associate of this.associates){
      let row = {
        num:associate.id,
        nombre:associate.name,
        PagoRealizado:associate.payAmmount,
        banco:associate.bank.name,
        cuenta:associate.account.toString(),
        clabe:associate.clabe.toString(),
        tarjeta:associate.card.toString(),
        birthDate: associate.birthDate,
        curp:associate.curp,
        rfc:associate.rfc,
        movil:associate.cellphone.toString(),
        domicilio:associate.address,
        estado:associate.state.name
      }
      db.push(row);
    } 
    return db;
  }

}

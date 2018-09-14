import { Component, OnInit } from '@angular/core';
import { AssociateService } from '../../services/associate.service';
import { Associate } from '../../models/associate.model';
import { AlertService } from '../../services/alert.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { PositionService } from '../../services/position.service';
import { Position } from '../../models/position.model';
import { UtilsService } from '../../services/utils.service';
 
@Component({
  selector: 'app-download-database',
  templateUrl: './download-database.component.html',
  styles: []
})
export class DownloadDatabaseComponent implements OnInit {

  constructor(
    public _positions:PositionService,
    public _alert:AlertService,
    public _utils:UtilsService
  ) { }

  positions:Position[] = [];

  ngOnInit() {
    this._alert.showWaitWindow("Cargando","Estamos extrayendo la informacion de la base de datos, esto puede tardar unos momentos");
    this._positions.getAllPositions().subscribe((resp:any)=>{
      this._alert.closeWaitWindow();
     
      if(resp.ok){
        console.log(resp);
        this.positions=resp.data;
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
        headers: ['NUM','NOMBRE','PAGO REALIZADO','BANCO','CUENTA','CTA. CLABE','TARJETA','FECHA DE NACIMIENTO',	'CURP',	'RFC',	'MOVIL'	,'DOMICILIO','ESTADO', 'USUARIO']
      }
      
    );
  }

  generateDB(){
    let db:any[] = []
    for (let position of this.positions){
      let row = {
        num:position.position_number,
        nombre: this._utils.validateString(position.associate.user.name,'SIN NOMBRE') + this._utils.validateString(position.associate.user.lastname,''),
        PagoRealizado:position.payAmmount,
        banco:this._utils.validateBank(position.associate.bank,'SIN BANCO'),
        cuenta:this._utils.validateString(position.associate.account,'SIN CUENTA'),
        clabe:this._utils.validateString(position.associate.clabe,'SIN CLABE'),
        tarjeta:this._utils.validateString(position.associate.card,'SIN TARJETA'),
        birthDate: position.associate.birthDate,
        curp:this._utils.validateString(position.associate.curp,'SIN CURP'),
        rfc:this._utils.validateString(position.associate.rfc,'SIN RFC'),
        movil:this._utils.validateString(position.associate.cellphone,'SIN MOVIL'),
        domicilio:this._utils.validateString(position.associate.address,'SIN DOMICILIO'),
        estado:this._utils.validateState(position.associate.state,'SIN ESTADO'),
        usuario: this._utils.validateString(position.associate.user.username,"SIN USUARIO")
      }
      db.push(row);
    } 
    return db;
  }

}

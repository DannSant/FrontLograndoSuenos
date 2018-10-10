import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Associate } from '../../models/associate.model';
import { AssociateService } from '../../services/associate.service';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { AlertService } from '../../services/alert.service';
import { SubirArchivoService } from '../../services/subir-archivo.service';
import { Router } from '@angular/router';
import { Position } from '../../models/position.model';
import { PositionService } from '../../services/position.service';

@Component({
  selector: 'app-boucher-upload',
  templateUrl: './boucher-upload.component.html',
  styles: []
})
export class BoucherUploadComponent implements OnInit {
  position:Position={};
 
  oculto:string = '';
  imagenSubir:File;
  imagenTemp:string;
  constructor(
    public activateRoute:ActivatedRoute,
    public _positions:PositionService,
    public _alert:AlertService,
    public _subirArchivoService:SubirArchivoService,
    public router:Router
  ) {    
    activateRoute.params.subscribe((params)=>{
      this._alert.showWaitWindow("Cargando","Espere un momento por favor");
      this._positions.getPosition(params.id).subscribe((resp:any)=>{ 
        this._alert.closeWaitWindow();      
        if(resp.ok){
          this.position=resp.data;
         
        }
      })
    })
   }

  ngOnInit() {
  }

  

  subirImagen(){
    this._alert.showWaitWindow("Cargando","Espera un momento, estamos subiendo la imagen");
    this._subirArchivoService.subirArchivo(this.imagenSubir,this.position._id)
      .then((resp)=>{  
        this.router.navigate(['/welcomeAssociate',this.position._id]);
      })
      .catch((error)=>{
        console.log(error);
        console.log("error en la carga");
      }).finally(()=> {
        this._alert.closeWaitWindow();
       });
  }

  seleccionImagen(archivo){
   
    if(!archivo){
      this.imagenSubir=null;
      return;
    }

    if(archivo.type.indexOf("image")<0){
      this._alert.showAlert("Error","Debes elegir una imagen","error");
      this.imagenSubir=null;
      return;
    }
   
    this.imagenSubir=archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = ()=>{
      //console.log(reader.result);
      this.imagenTemp=reader.result.toString();
    }

  }

}

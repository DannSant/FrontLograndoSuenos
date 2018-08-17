import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Associate } from '../../models/associate.model';
import { AssociateService } from '../../services/associate.service';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { AlertService } from '../../services/alert.service';
import { SubirArchivoService } from '../../services/subir-archivo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boucher-upload',
  templateUrl: './boucher-upload.component.html',
  styles: []
})
export class BoucherUploadComponent implements OnInit {
  associate:Associate={};
 
  oculto:string = '';
  imagenSubir:File;
  imagenTemp:string;
  constructor(
    public activateRoute:ActivatedRoute,
    public _associates:AssociateService,
    public _alert:AlertService,
    public _subirArchivoService:SubirArchivoService,
    public router:Router
  ) {    
    activateRoute.params.subscribe((params)=>{
      this._associates.getAssociate(params.id).subscribe((resp:any)=>{
        if(resp.ok){
          this.associate=resp.data;
         
        }
      })
    })
   }

  ngOnInit() {
  }

  

  subirImagen(){
    this._alert.showWaitWindow("Cargando","Espera un momento, estamos subiendo la imagen");
    this._subirArchivoService.subirArchivo(this.imagenSubir,this.associate._id)
      .then((resp)=>{  
        this.router.navigate(['/welcomeAssociate',this.associate._id]);
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
      this.imagenTemp=reader.result;
    }

  }

}

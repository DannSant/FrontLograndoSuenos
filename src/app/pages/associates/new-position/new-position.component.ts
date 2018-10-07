import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { PositionService } from '../../../services/position.service';
import { SubirArchivoService } from '../../../services/subir-archivo.service';
import { Position } from '../../../models/position.model';
import { NgForm } from '@angular/forms';

//import {ftpClient}  from 'ftp-client';
//var ftpClient =  require('ftp-client');



@Component({
  selector: 'app-new-position',
  templateUrl: './new-position.component.html',
  styles: []
})
export class NewPositionComponent implements OnInit {
  associateId:string;
  position:Position={};
  oculto:string = '';
  imagenSubir:File;
  imagenTemp:string;
 
  constructor(
    public _positions:PositionService,
    public _alert:AlertService,
    public activatedRoute:ActivatedRoute,
    public activateRoute:ActivatedRoute,    
    public _subirArchivoService:SubirArchivoService,
    public router:Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params)=>{
      let id = params.id;
      this.associateId= id;      
    })

   
  }

  
  subirImagen(id:string){
   
    this._subirArchivoService.subirArchivo(this.imagenSubir,id)
      .then((resp)=>{  
        
        this._alert.showAlertWithCallback("Todo bien","Has creado tu nueva posición en la matriz","success",()=>{
          this._alert.closeWaitWindow();
          this.router.navigate(['/positionList',this.associateId]);
        });
        
      })
      .catch((error)=>{
        this._alert.closeWaitWindow();
        console.log(error);
        console.log("error en la carga");
      }).finally(()=> {
        //this._alert.closeWaitWindow();
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

  newPosition(f:NgForm){    

    if(!this.imagenSubir){
      this._alert.showAlert("Error", "Faltan cargar la imagen del comprobante", "error");
      return;
    }

    if(f.invalid){
      this._alert.showAlert("Error", "Faltan datos de capturar", "error");
      return;
    }

    this._alert.showWaitWindow("Cargando","Espera un momento, estamos subiendo la imagen");
   
    this._positions.registerAditionalPosition(this.position,this.associateId).subscribe((resp:any)=>{
      //console.log(resp);
      if(resp.ok){
        let id = resp.data._id;
        this.subirImagen(id);
      }else {
        this._alert.closeWaitWindow();
        this._alert.showAlert("Error", "Ha ocurrido un problema al dar de alta al usuario.", "error");
      }
    });
  }

}

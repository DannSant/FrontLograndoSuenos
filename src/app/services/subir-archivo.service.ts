import { Injectable } from '@angular/core';
import { SERVICE_URL } from '../config/config';

@Injectable()
export class SubirArchivoService {

  constructor() { }

  subirArchivo(archivo:File,id:string){
   
    return new Promise((resolve,reject)=>{
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
  
      formData.append("archivo",archivo,archivo.name);
  
      xhr.onreadystatechange = function(){
        if(xhr.readyState===4){
          if(xhr.status===200){
             console.log("imagen subida");           
            resolve(JSON.parse(xhr.response));
          }
        }else {
          if(xhr.response!=''){
           
             //console.log(xhr);
             //console.log(xhr.response);
             //console.log(xhr.status);
            if(xhr.status!=200){
              console.log("fallo la subida");
              console.error(xhr.response);
              //reject(xhr.response);
            }           
          }         
        }
      };
      let url=SERVICE_URL +'/baucher/'+id;
      xhr.open('PUT',url,true);
      xhr.send( formData );
    });
   

  }

}

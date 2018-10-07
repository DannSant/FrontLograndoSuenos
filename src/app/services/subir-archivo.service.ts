import { Injectable } from '@angular/core';
import { SERVICE_URL } from '../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SubirArchivoService {
  client_id = "28fd4e7685b49e2";
  constructor(
    public http:HttpClient
  ) { }

  subirArchivo(archivo:File,id:string,route="baucher",method="PUT"){
   
    return new Promise((resolve,reject)=>{
      let url = "https://api.imgur.com/3/image";

      var fd = new FormData();
      fd.append('image', archivo);
      
      let headers = {
        Authorization:'Client-ID ' + this.client_id
      }
      this.http.post(url,fd,{headers}).subscribe((resp:any)=>{
      
        let imageUrl = resp.data.link;
        this.actualizarAfiliado(archivo,id,"baucher","PUT",imageUrl).then((resp)=>{
          resolve(resp);
        }).catch((error)=>{
          reject(error);
        })
      });
    })
  }
   

  

  actualizarAfiliado(archivo:File,id:string,route="baucher",method="PUT",urlFile){
    return new Promise((resolve,reject)=>{
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
  
      formData.append("archivo",archivo,archivo.name);
      formData.append("urlFile",urlFile);
  
      xhr.onreadystatechange = function(){
        if(xhr.readyState===4){
          if(xhr.status==200){
             //console.log("imagen subida");           
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
      let url="";
      if(id){
        url=SERVICE_URL +'/'+route+'/'+id;
      }else {
        url=SERVICE_URL +'/'+route;
      }
      
      xhr.open(method,url,true);
      xhr.send( formData );
    });
  }

}

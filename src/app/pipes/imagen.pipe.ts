import { Pipe, PipeTransform } from '@angular/core';
import { SERVICE_URL } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string): any {
    let url = SERVICE_URL +'/baucher' 
    if(!img){
      return url + "/usuarios/XXX";
    }
    
    if(img.indexOf("https")>=0){
      return img;
    }
    url = url + "/" + img;
   
    return url;
  }

}

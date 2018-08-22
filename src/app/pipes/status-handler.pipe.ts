import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusHandler'
})
export class StatusHandlerPipe implements PipeTransform {

  transform(value: boolean, type: string): string {
    let resp="";
    if(type=="activo"){
      resp=value?"Activo":"Inactivo";
    }else if(type=="si"){
      resp=value?"Sí":"No";
    }
    return resp;
  }

}

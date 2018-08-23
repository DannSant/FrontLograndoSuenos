import { Pipe, PipeTransform } from '@angular/core';
import { SERVICE_URL } from '../config/config';

@Pipe({
  name: 'notificationContent'
})
export class NotificationContentPipe implements PipeTransform {

  transform(value: string, type:string="T"): any {
    let resp="";
    if(type=="T"){
      resp=value;
    }else {
      resp = SERVICE_URL + "/generalFiles/"+value;
    }
    return resp;
  }

}

import { Component, OnInit } from '@angular/core';
import { Associate } from '../../../models/associate.model';
import { AssociateService } from '../../../services/associate.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-welcome-associate',
  templateUrl: './welcome-associate.component.html',
  styles: []
})
export class WelcomeAssociateComponent implements OnInit {

  associate:Associate={};

  constructor(
    public _associates:AssociateService,
    public _alert:AlertService,
    public activatedRoute:ActivatedRoute
  ) { 
    this.activatedRoute.params.subscribe((params:any)=>{
      let id=params.id;
      this._associates.getAssociate(id).subscribe((resp:any)=>{
        if(resp.ok){
          this.associate=resp.data;
        }
      });
    })
  }

  ngOnInit() {
    this._alert.showAlert(
      "Todo bien!",
      "Gracias por registrarte en Logrando Sueños 7",
      "success"
    );
  }

}

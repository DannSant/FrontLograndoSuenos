//Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms'
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatFormFieldModule,MatInputModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'ng2-file-upload/file-upload/file-upload.module';

//componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { BoucherUploadComponent } from './pages/boucher-upload/boucher-upload.component';

//Rutas
import {app_routing} from './app.routes';

//Servicios
import { UserService } from './services/user.service';
import { AlertService } from './services/alert.service';
import { RegisterComponent } from './pages/register/register.component';
import { BankService } from './services/bank.service';
import { AssociateService } from './services/associate.service';
import { StatesService } from './services/states.service';
import { SubirArchivoService } from './services/subir-archivo.service';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ImagenPipe } from './pipes/imagen.pipe';




registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    BoucherUploadComponent,
    ImagenPipe
  ],
  imports: [
    BrowserModule,
    RouterModule,
    app_routing,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,    
    BrowserAnimationsModule,
    FileUploadModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    UserService,
    AlertService,
    BankService,
    AssociateService,
    StatesService,
    SubirArchivoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

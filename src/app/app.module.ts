//Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms'
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatFormFieldModule,MatInputModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip'

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
import { LoginGuard } from './services/guards/login.guard';
import { AdminGuard } from './services/guards/admin.guard';
import { NotificationService } from './services/notification.service';

//Pipes
import { ImagenPipe } from './pipes/imagen.pipe';

//Otros
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { DownloadDatabaseComponent } from './pages/download-database/download-database.component';
import { NewUserComponent } from './pages/users/new-user/new-user.component';
import { ViewUserComponent } from './pages/users/view-user/view-user.component';
import { NewAssociatesComponent } from './pages/associates/new-associates/new-associates.component';
import { WelcomeAssociateComponent } from './pages/associates/welcome-associate/welcome-associate.component';
import { ProfileComponent } from './pages/users/profile/profile.component';
import { NotificationsAdminComponent } from './pages/notifications/notifications-admin/notifications-admin.component';
import { NotificationComponent } from './pages/notifications/notification/notification.component';
import { NotificationsFeedComponent } from './pages/notifications/notifications-feed/notifications-feed.component';
import { SearchSelectorComponent } from './components/search-selector/search-selector.component';
import { StatusHandlerPipe } from './pipes/status-handler.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';








registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    BoucherUploadComponent,
    ImagenPipe,
    DownloadDatabaseComponent,
    NewUserComponent,
    ViewUserComponent,
    NewAssociatesComponent,
    WelcomeAssociateComponent,
    ProfileComponent,
    NotificationsAdminComponent,
    NotificationComponent,
    NotificationsFeedComponent,
    SearchSelectorComponent,
    StatusHandlerPipe,
    PaginationComponent
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
    BrowserAnimationsModule    ,
    MatTooltipModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    UserService,
    AlertService,
    BankService,
    AssociateService,
    StatesService,
    SubirArchivoService,
    LoginGuard,
    AdminGuard,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

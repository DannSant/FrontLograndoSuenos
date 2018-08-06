import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { BoucherUploadComponent } from './pages/boucher-upload/boucher-upload.component';

const app_routes: Routes = [
  { path: 'home', component: HomeComponent }, 
  { path: 'register', component: RegisterComponent }, 
  { path: 'boucher/:id', component: BoucherUploadComponent }, 
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const app_routing = RouterModule.forRoot(app_routes);
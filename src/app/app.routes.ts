import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { BoucherUploadComponent } from './pages/boucher-upload/boucher-upload.component';
import { DownloadDatabaseComponent } from './pages/download-database/download-database.component';
import { LoginGuard } from './services/guards/login.guard';
import { AdminGuard } from './services/guards/admin.guard';
import { NewUserComponent } from './pages/new-user/new-user.component';

const app_routes: Routes = [
  { path: 'home', component: HomeComponent }, 
  { path: 'register', component: RegisterComponent }, 
  { path: 'boucher/:id', component: BoucherUploadComponent }, 
  { 
    path: 'downloadDB',
    component: DownloadDatabaseComponent ,
    canActivate: [AdminGuard]
  },
  { 
    path: 'newUser',
    component: NewUserComponent ,
    canActivate: [AdminGuard]
  },

  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const app_routing = RouterModule.forRoot(app_routes);
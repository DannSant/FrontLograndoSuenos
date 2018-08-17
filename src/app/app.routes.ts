import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { BoucherUploadComponent } from './pages/boucher-upload/boucher-upload.component';
import { DownloadDatabaseComponent } from './pages/download-database/download-database.component';
import { LoginGuard } from './services/guards/login.guard';
import { AdminGuard } from './services/guards/admin.guard';
import { NewUserComponent } from './pages/users/new-user/new-user.component';
import { ViewUserComponent } from './pages/users/view-user/view-user.component';
import { NewAssociatesComponent } from './pages/associates/new-associates/new-associates.component';
import { WelcomeAssociateComponent } from './pages/associates/welcome-associate/welcome-associate.component';
import { ProfileComponent } from './pages/users/profile/profile.component';

const app_routes: Routes = [
  { path: 'home', component: HomeComponent }, 
  { path: 'register', component: RegisterComponent }, 
  { path: 'boucher/:id', component: BoucherUploadComponent }, 
  { path: 'welcomeAssociate/:id', component: WelcomeAssociateComponent },
  { 
    path: 'profile/:id', 
    component: ProfileComponent,
    canActivate:[LoginGuard]
  }, 
  { 
    path: 'downloadDB',
    component: DownloadDatabaseComponent ,
    canActivate: [AdminGuard]
  },
  { 
    path: 'newAssociates',
    component: NewAssociatesComponent ,
    canActivate: [AdminGuard]
  },
  { 
    path: 'newUser/:associate_id',
    component: NewUserComponent ,
    canActivate: [AdminGuard]
  },
  { 
    path: 'viewUser/:id',
    component: ViewUserComponent ,
    canActivate: [AdminGuard]
  },

  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const app_routing = RouterModule.forRoot(app_routes);
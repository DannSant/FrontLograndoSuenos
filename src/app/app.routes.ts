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
import { NotificationsAdminComponent } from './pages/notifications/notifications-admin/notifications-admin.component';
import { NotificationComponent } from './pages/notifications/notification/notification.component';
import { NotificationsFeedComponent } from './pages/notifications/notifications-feed/notifications-feed.component';
import { VerifyTokenGuard } from './services/guards/verify-token.guard';
import { AboutComponent } from './pages/about/about.component';
import { AssociatesListComponent } from './pages/associates/associates-list/associates-list.component';
import { AssociateDetailComponent } from './pages/associates/associates-list/associate-detail.component';

const app_routes: Routes = [
  { path: 'home', component: HomeComponent }, 
  { path: 'register', component: RegisterComponent }, 
  { path: 'about', component: AboutComponent }, 
  { path: 'boucher/:id', component: BoucherUploadComponent }, 
  { path: 'welcomeAssociate/:id', component: WelcomeAssociateComponent },
  { 
    path: 'profile/:id', 
    component: ProfileComponent,
    canActivate:[LoginGuard,VerifyTokenGuard]
  }, 
  { 
    path: 'downloadDB',
    component: DownloadDatabaseComponent ,
    canActivate: [AdminGuard,VerifyTokenGuard]
  },
  { 
    path: 'newAssociates',
    component: NewAssociatesComponent ,
    canActivate: [AdminGuard,VerifyTokenGuard]
  },
  { 
    path: 'associateList',
    component: AssociatesListComponent ,
    canActivate: [AdminGuard,VerifyTokenGuard]
  },
  { 
    path: 'associateDetail/:id',
    component: AssociateDetailComponent ,
    canActivate: [AdminGuard,VerifyTokenGuard]
  },
  { 
    path: 'newUser/:associate_id',
    component: NewUserComponent ,
    canActivate: [AdminGuard,VerifyTokenGuard]
  },
  { 
    path: 'viewUser/:id',
    component: ViewUserComponent ,
    canActivate: [AdminGuard,VerifyTokenGuard]
  },
  { 
    path: 'notificationsAdmin',
    component: NotificationsAdminComponent ,
    canActivate: [AdminGuard,VerifyTokenGuard]
  },
  { 
    path: 'notification/:id',
    component: NotificationComponent ,
    canActivate: [AdminGuard,VerifyTokenGuard]
  },
  { 
    path: 'notifications',
    component: NotificationsFeedComponent ,
    canActivate: [LoginGuard,VerifyTokenGuard]
  },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const app_routing = RouterModule.forRoot(app_routes);
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent} from './user-detail/user-detail.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'schools', component: UserComponent},
  {path: 'school/:id', component: UserDetailComponent}, // TODO:url should only show name after slugify and trimming name

  // otherwise redirect to home
    { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

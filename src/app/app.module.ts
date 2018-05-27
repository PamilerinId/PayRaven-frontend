import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AlertComponent } from './alert/alert.component';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserSearchComponent } from './user-search/user-search.component';
import {AuthenticationService} from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import {AlertService} from './services/alert.service';
import {UserService} from './services/user.service';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    AlertComponent,
    UserComponent,
    UserDetailComponent,
    UserSearchComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
  ],
  providers: [
    AuthGuardService,
    AlertService,
    AuthenticationService,
    UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptorService,
            multi: true
        },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

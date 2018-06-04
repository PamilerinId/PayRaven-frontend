import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {AlertService} from './alert.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private alertService: AlertService) { }
  login(username: string, password: string) {
        return this.http.post<any>('http://api.payraven.com.ng/v1/auth-login/', { username: username, password: password })
          .pipe(
            map(result => {
              // login successful if there's a jwt token in the response
              if (result.token && result.user) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(result));
                console.log(result)
                this.successlog('Login Successful');
              }
                return result;
            })
          );
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        // this.successlog('Logout Successful');
    }
     /** success logging */
  private successlog(message: string) {
    this.alertService.success(message);
  }
}

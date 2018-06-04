import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router,
  private alertService: AlertService) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (localStorage.getItem('currentUser')) {
        // logged in so return true
        return true;
      }
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login']);
      this.errorlog('You are not authorized to view this page');
      return false;
    }
    /** success logging */
  private successlog(message: string) {
    this.alertService.success(message);
  }
  /** error logging */
  private errorlog(message: string) {
    this.alertService.error(message);
  }
}

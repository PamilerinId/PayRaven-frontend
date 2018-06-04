import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import { AlertService } from '../services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  model: any = {};
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
     private route: ActivatedRoute,
     private router: Router,
     private authenticationService: AuthenticationService,
     private alertService: AlertService,
     private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        // reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'dashboard';
  }
  // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
        if (this.loginForm.invalid) {
          this.errorlog('Invalid Details')
            return;
        }
    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.errorlog(error);
                    this.loading = false;
                });
    }// validate via api here
/** Log a UserService message with the AlertService */

  private log(message: string) {
    this.alertService.log(message);
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

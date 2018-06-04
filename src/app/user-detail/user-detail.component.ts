import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../_models/user';
import { UserService } from '../services/user.service';
import {FeeService} from "../services/fee.service";
import {Fee} from "../_models/fee";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  fees: Fee[];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private feeService: FeeService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getFees();
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)
      .subscribe(user => this.user = user);
  }

  getFees(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.feeService.getUserFees(id)
      .subscribe(fees => this.fees = fees);
  }

  goBack(): void {
    this.location.back();
  }
}

// TODO: (HTML) onselect button method => payment details page

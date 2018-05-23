import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { Fee } from '../_models/fee';
import { Transaction } from '../_models/txnlog';
import { UserService } from '../services/user.service';
import { FeeService } from '../services/fee.service';
import { TxnlogService } from '../services/txnlog.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User;
  fees: Fee[];
  txnLogs: Transaction;

  constructor(
    private txnLogService: TxnlogService,
    )  {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    // Load all fees related to current user::: Solved using currentUser
    // Load transaction logs related to user
    // this.loadTxnLog();
  }
  // Method: Load fees
  // Fees CRUD
  // Method: Load transaction logs
  loadTxnLog(): void {
    const id = this.currentUser.id;
    this.txnLogService.getUserTxnLogs(id)
      .subscribe(txnLogs => this.txnLogs = txnLogs);
  }

}

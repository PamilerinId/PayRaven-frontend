import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Transaction } from '../_models/txnlog';
import { AlertService } from './alert.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TxnlogService {
  private txnLogsUrl = 'http://127.0.0.1:8000/api/transactions';

  constructor(
    private http: HttpClient,
    private alertService: AlertService) { }

    /** GET transaction logs from the server */
  getTxnLogs(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.txnLogsUrl)
      .pipe(
        tap(txnlogs => this.successlog(`fetched transaction logs`)),
        catchError(this.handleError('getTxnLogs', []))
      );
  }

    /** GET transaction by user id. Return `undefined` when id not found */
  getTxnLogNo404<Data>(id: number): Observable<Transaction> {
    const url = `${this.txnLogsUrl}/?paid_to=${id}`;
    return this.http.get<Transaction>(url)
      .pipe(
        map(txnlogs => txnlogs[0]), // returns a {0|1} element array
        tap(u => {
          const outcome = u ? `fetched` : `did not find`;
          this.log(`${outcome}  id=${id}`);
        }),
        catchError(this.handleError<Transaction>(`getTxnLogNo404 id=${id}`))
      );
  }

    /** GET transaction by user id. Will 404 if id not found */
    // testing with observable array instead of single observable
  getUserTxnLogs(id: number): Observable<Transaction> {
    const url = `${this.txnLogsUrl}/?paid_to=${id}`;
    return this.http.get<Transaction>(url)
      .pipe(
        tap(_ => this.successlog(`fetched via user_id=${id}`)),
        catchError(this.handleError<Transaction>(`getUserTxnLogs user_id=${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.errorlog(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
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

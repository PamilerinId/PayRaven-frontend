import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Fee } from '../_models/fee';
import { AlertService } from './alert.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FeeService {
   private feesUrl = 'http://api.payraven.com.ng/v1/fees';

  constructor(
    private http: HttpClient,
    private alertService: AlertService) { }


  /** Get all fees from server **/
  getFees (): Observable<Fee[]> {
    return this.http.get<Fee[]>(this.feesUrl)
      .pipe(
        tap(fees => this.successlog(`Retrieved School List`)),
        catchError(this.handleError('getFees', []))
      );
  }


  /** GET  current user fees from the server */
  getUserFees(id: number): Observable<Fee[]> {
    const url = `${this.feesUrl}/?id=${id}`;
    return this.http.get<Fee[]>(url).pipe(
        tap(_ => this.log(`fetched user fees`)),
        catchError(this.handleError('getFees', []))
      );
  }
  // TODO: CRUD Methods here


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

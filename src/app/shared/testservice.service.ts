import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Subject, Subscription, Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { MatSnackBar } from '@angular/material';
import { Router, RoutesRecognized, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class TestserviceService {

  previousRoute: any = [];
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    private activeRoot: ActivatedRoute) { }

  postHeaders() {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return headers;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error Occured : ', error.error.message);
    } else {
      console.error('Backend ERROR : ', error.error);
    }

    return throwError(error);
  }

  departmentlist() {
    let url = `${this.baseUrl}designations`;
    let headers = this.postHeaders();
    return this.http.get(url, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  postDepartment(obj) {
    let url = `${this.baseUrl}designations`;
    let headers = this.postHeaders();
    return this.http.post(url, obj, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }
}
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
  postEmp(dataObj){
    let url = `${this.baseUrl}employees`;
    let headers = this.postHeaders();
    return this.http.post(url,dataObj,{headers:headers}).pipe(
      catchError(this.handleError),
    )
  }
  getEmp(){
    let url = `${this.baseUrl}employees?filter[include]=designation`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
    )}

  editDepartment(data) {
    let url = `${this.baseUrl}designations/${data.id}`;
    let headers = this.postHeaders();
    return this.http.patch(url, data, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  //Toast Message
  openSnackBar(message: string, action: string, className?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: [className]
    });
  }

  deleteDepts(id) {
    let url = `${this.baseUrl}designations/${id}`;
    let headers = this.postHeaders();
    return this.http.delete(url, { headers: headers }).pipe(
      catchError(this.handleError)
    )
  }
  PatchEmp(data){
    let url = `${this.baseUrl}employees/${data.id}`;
    let headers = this.postHeaders();
    return this.http.patch(url, data, { headers: headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteEmp(id){
    let url = `${this.baseUrl}employees/${id}`;
    let headers = this.postHeaders();
    return this.http.delete(url, { headers: headers }).pipe(
      catchError(this.handleError)
    )
  }
  
}

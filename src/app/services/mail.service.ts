import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Mail, Person} from './model';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  // private baseUrl = 'http://localhost:8080/api';

  private baseUrl = 'https://midoutraoretech.com/mailClassifier/api';
 // headers = new HttpHeaders().set('Content-Type', 'application/json');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Cache-Control': 'no-cache'
    })
  };

  constructor(private http: HttpClient) { }

  // Get all mail
  getAllMail(): Observable<Array<Mail>> {
    return this.http.get<Mail[]>(`${this.baseUrl}/mails`);
  }

  // Get all mail
  getMailListByPerson(id: number): Observable<Array<Mail>> {
    return this.http.get<Mail[]>(`${this.baseUrl}/mails/person/${id}`);
  }

  // Get all person
  getAllPerson(): Observable<Array<Person>> {
    return this.http.get<Person[]>(`${this.baseUrl}/personnes`);
  }

  // Get a person by id
  getPersonById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/personnes/${id}`);
  }

  // get all mails by idPerson
  getMailByPerson(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/mails/${id}`);
  }


  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}

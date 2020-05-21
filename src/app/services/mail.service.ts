import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Attachment, AttachType, BroadcastList, DataCount, Email, Link, Mail, Person, PersonMoral} from './model';

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

  // Get mail by email
  getMailListByEmail(idEmail: number): Observable<Array<Mail>> {
    return this.http.get<Mail[]>(`${this.baseUrl}/mails/email/${idEmail}`);
  }

  // Get all person
  getAllPerson(): Observable<Array<Person>> {
    return this.http.get<Person[]>(`${this.baseUrl}/personnes`);
  }

  // Get all person moral
  getAllPersonMoral(): Observable<Array<PersonMoral>> {
    return this.http.get<PersonMoral[]>(`${this.baseUrl}/personnes-morales`);
  }

  // Get a person by id
  getPersonById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/personnes/${id}`);
  }

  // Get a person moral by id
  getPersonMoralById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/personnes-morales/${id}`);
  }

  // Get a mail by id
  getMailById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/mails/${id}`);
  }

  // Get a person by name
  /*
  getPersonByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/personnes/${name}`);
  }
*/
  getPersonEmailList(idPerson: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/emails/personne/${idPerson}`);
  }

  getPersonMoralEmailList(idPersonM: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/emails/personne-morale/${idPersonM}`);
  }

  getReceivedMailByEmailId(idEmail: number): Observable<Array<Mail>> {
    return this.http.get<Array<Mail>>(`${this.baseUrl}/mails/received-mail/${idEmail}`);
  }

  getReceivedCcMailByEmailId(idEmail: number): Observable<Array<Mail>> {
    return this.http.get<Array<Mail>>(`${this.baseUrl}/mails/received-cc-mail/${idEmail}`);
  }

// Get all email
  getAllEmail(): Observable<Array<Email>> {
    return this.http.get<Email[]>(`${this.baseUrl}/emails`);
  }

// Get all links
  getAllLink(): Observable<Array<Link>> {
    return this.http.get<Array<Link>>(`${this.baseUrl}/links`);
  }

  // Get all attachments
  getAllAttachment(): Observable<Array<Attachment>> {
    return this.http.get<Attachment[]>(`${this.baseUrl}/attachments`);
  }

// Get all attachments types
  getAllAttachType(): Observable<Array<AttachType>> {
    return this.http.get<AttachType[]>(`${this.baseUrl}/attachTypes`);
  }

  // Get all broadcast list
  getAllBroadcastList(): Observable<Array<BroadcastList>> {
    return this.http.get<BroadcastList[]>(`${this.baseUrl}/broadcastList`);
  }

  dataCount(): Observable<DataCount> {
    return this.http.get<DataCount>(`${this.baseUrl}/data-count`);
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

import { Injectable } from '@angular/core';
import {Attachment, BroadcastList, Email, Link, Mail, Person, PersonMoral} from './model';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  mailList: Array<Mail> = null;
  personList: Array<Person> = null;
  personMList: Array<PersonMoral> = null;
  bclList: Array<BroadcastList> = null;
  emailList: Array<Email> = null;
  linkList: Array<Link> = null;
  attachList: Array<Attachment> = null;

  navId = 0;
}

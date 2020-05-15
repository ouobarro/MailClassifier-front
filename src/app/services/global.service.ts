import { Injectable } from '@angular/core';
import {Mail, Person} from './model';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  mailList: Array<Mail> = null;
  personList: Array<Person> = null;
}

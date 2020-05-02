import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Mail, Person} from '../../services/model';
import {MailService} from '../../services/mail.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  persons: Array<Person>;
  mailList: Array<Mail>;
  mailToShow: Mail = null;

  showMailList = false;

  constructor(
    private mailService: MailService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllMail();
    console.log(this.mailList);
  }
  getMailByPerson() {
    this.getMailListByPerson(7);
  }


  getAllMail() {
    this.mailService.getAllMail().subscribe(
      data => {
        this.mailList = data;
      },
      error => {
        console.log('Impossible de récupérer les données');
      }
    );
  }

  getMailListByPerson(idPerson: number) {
    this.mailService.getMailByPerson(idPerson).subscribe(
      data => {
        // this.mails = data;
      },
      error => {
        console.log('Impossible de récupérer les données');
      }
    );
  }

  getAllPerson() {
    this.mailService.getAllPerson().subscribe(
      result => {
        this.persons = result;
      },
      error => {
        console.log('Erreur d\'accès aux données');
      }
    );
  }

  switchToMail(id: number) {
    this.showMailList = true;
    console.log('MAIL_ID: ', id);
    for (const mail of this.mailList) {
      if (mail.id === id) {
        this.mailToShow = mail;
        console.log('MAIL: ', mail.subject);
      }
    }
  }

}

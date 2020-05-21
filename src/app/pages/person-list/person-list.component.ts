import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AttachType, Email, Link, Mail, Person, Attachment, BroadcastList} from '../../services/model';
import {MailService} from '../../services/mail.service';
import {Router} from '@angular/router';
import {GlobalService} from '../../services/global.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  mailList: Array<Mail>;
  currentMailId = 0;
  defaultMail: Mail = null;


  mailToShow: Mail = null;
  stat = false;
  pers = false;

  showMailList = false;

  constructor(
    private mailService: MailService,
    public globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.getDefaultMail(4743);
    if (!this.globalService.bclList) {
      this.getAllMail();
    } else {
      console.log('GLOBAL LIST IS NOT NULL');
      this.mailList = this.globalService.mailList;
    }
  }
  getMailByEmail() {
    this.getMailListByEmail(7);
  }

  // mails
  getAllMail() {
    this.mailService.getAllMail().subscribe(
      data => {
        this.mailList = data;
        this.globalService.mailList = data;
      },
      error => {
        console.log('Impossible de récupérer les données');
      }
    );
  }

  getMailListByEmail(idPerson: number) {
    this.mailService.getMailListByEmail(idPerson).subscribe(
      data => {
        // this.mails = data;
      },
      error => {
        console.log('Impossible de récupérer les données');
      }
    );
  }

  getPersonById(idPerson: number) {
    this.mailService.getPersonById(idPerson).subscribe(
      data => {
        // this.mails = data;
      },
      error => {
        console.log('Impossible de récupérer les données');
      }
    );
  }

  switchToMail(id: number) {
    this.showMailList = true;
    this.currentMailId = id;
    for (const mail of this.mailList) {
      if (mail.id === id) {
        this.mailToShow = mail;
        this.defaultMail = null;
        console.log('MAIL: ', mail.subject);
      }
    }
  }

  getDefaultMail(idMail: number) {
    this.mailService.getMailById(idMail).subscribe(
      data => {
        this.defaultMail = data;
      },
      error => {
        console.log('Impossible de récupérer les données');
      }
    );
  }

}

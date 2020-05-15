import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Email, Mail, Person, PersonMail} from '../../services/model';
import {ActivatedRoute, Router} from '@angular/router';
import {MailService} from '../../services/mail.service';

@Component({
  selector: 'app-person-infos',
  templateUrl: './person-infos.component.html',
  styleUrls: ['./person-infos.component.scss']
})
export class PersonInfosComponent implements OnInit, AfterViewInit {

  id: number;
  person: Person;
  emailAddressList: Array<Email>;

  mailListSended: Array<PersonMail> = new Array<PersonMail>();
  mailListReceived: Array<PersonMail> = new Array<PersonMail>();
  mailListReceivedCc: Array<PersonMail> = new Array<PersonMail>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mailservice: MailService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    console.log('ID >>>', this.id);
    this.getEmailAddressList();
  }

  ngAfterViewInit() {

  }

  async getEmailAddressList() {
    await this.mailservice.getPersonEmailList(this.id).subscribe(
      data => {
        this.emailAddressList = data;
        console.log('Recupération des adresses: ' + data.length);
        this.getMapSendedMailList(data);
        this.getMapReceivedMailList(data);
        this.getMapReceivedCcMailList(data);
      },
      error => {
        console.log('Erreur de recupération des données !');
      }
    );
  }

  async getMapSendedMailList(emailAddressList: Array<Email>) {
    for (const email of emailAddressList) {
      const personMail = new PersonMail();
      personMail.email = email.eaddress;
      await this.mailservice.getMailListByEmail(email.id).subscribe(
        data => {
          personMail.mailList = data;
        },
        error => {
          console.log('Impossible de récuperer les mails envoyés pour emailId = ', email.id);
        }
      );
      this.mailListSended.push(personMail);
    }
    console.log('end fetch !');
  }

  async getMapReceivedMailList(emailAddressList: Array<Email>) {
    for (const email of emailAddressList) {
      const personMail = new PersonMail();
      personMail.email = email.eaddress;
      await this.mailservice.getReceivedMailByEmailId(email.id).subscribe(
        data => {
          personMail.mailList = data;
        },
        error => {
          console.log('Impossible de récuperer les mails envoyés pour emailId = ', email.id);
        }
      );
      this.mailListReceived.push(personMail);
    }
    console.log('end fetch !');
  }

  async getMapReceivedCcMailList(emailAddressList: Array<Email>) {
    for (const email of emailAddressList) {
      const personMail = new PersonMail();
      personMail.email = email.eaddress;
      await this.mailservice.getReceivedCcMailByEmailId(email.id).subscribe(
        data => {
          personMail.mailList = data;
        },
        error => {
          console.log('Impossible de récuperer les mails envoyés pour emailId = ', email.id);
        }
      );
      this.mailListReceivedCc.push(personMail);
    }
    console.log('end fetch !');
  }


}

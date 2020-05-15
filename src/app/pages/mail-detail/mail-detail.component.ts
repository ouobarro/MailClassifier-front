import { Component, OnInit } from '@angular/core';
import {Attachment, AttachType, BroadcastList, Email, Link, Mail, Person, PersonMail} from '../../services/model';
import {MailService} from '../../services/mail.service';
import {Router} from '@angular/router';
import {GlobalService} from '../../services/global.service';

@Component({
  selector: 'app-mail-detail',
  templateUrl: './mail-detail.component.html',
  styleUrls: ['./mail-detail.component.scss']
})
export class MailDetailComponent implements OnInit {

  persons: Array<Person>;
  currentPersId = 0;
  personToShow: Person = null;

  emailAddressList: Array<Email>;

  mailListSended: Array<PersonMail> = new Array<PersonMail>();
  mailListReceived: Array<PersonMail> = new Array<PersonMail>();
  mailListReceivedCc: Array<PersonMail> = new Array<PersonMail>();

  showPersonInfo = false;

  constructor(
    private mailService: MailService,
    public globalService: GlobalService
  ) { }

  ngOnInit(): void {
    if (!this.globalService.personList) {
      this.getAllPerson();
    } else {
      this.persons = this.globalService.personList;
    }

  }


  getMailListByEmail(idEmail: number) {
    this.mailService.getMailListByEmail(idEmail).subscribe(
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
        this.globalService.personList = result;
      },
      error => {
        console.log('Erreur d\'accès aux données');
      }
    );
  }

  async switchToPerson(id: number) {
    this.showPersonInfo = true;
    this.currentPersId = id;
    console.log('Person_ID: ', id);
    for (const person of this.persons) {
      if (person.id === id) {
        this.personToShow = person;
        console.log('PERSON: ', Person.name);
      }
    }
    await this.getEmailAddressList(id);
  }

  /* ========================================================================================== \
   *            Person info manage functions
   *
   ============================================================================================ */

  async getEmailAddressList(id: number) {
    this.emailAddressList = new Array<Email>();
    this.mailListSended = new Array<PersonMail>();
    this.mailListReceived = new Array<PersonMail>();
    this.mailListReceivedCc = new Array<PersonMail>();
    await this.mailService.getPersonEmailList(id).subscribe(
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
      await this.mailService.getMailListByEmail(email.id).subscribe(
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
      await this.mailService.getReceivedMailByEmailId(email.id).subscribe(
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
      await this.mailService.getReceivedCcMailByEmailId(email.id).subscribe(
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

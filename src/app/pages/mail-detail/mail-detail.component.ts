import { Component, OnInit } from '@angular/core';
import {Attachment, AttachType, BroadcastList, Email, Link, Mail, Person, PersonMail} from '../../services/model';
import {MailService} from '../../services/mail.service';
import {ActivatedRoute, Router} from '@angular/router';
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
    private activeRoute: ActivatedRoute,
    private mailService: MailService,
    public globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.currentPersId = Number(params.personDtoId) || 0;
    });

    if (!this.globalService.personList) {
      this.getAllPerson();
    } else {
      this.persons = this.globalService.personList;
      if (this.currentPersId !== 0) {
        this.switchToPerson(this.currentPersId);
        this.scroll(this.currentPersId);
      } else {
        this.personToShow = this.persons[0];
        this.currentPersId = this.personToShow.id;
        this.getEmailAddressList(this.personToShow.id);
      }
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

  async getAllPerson() {
    this.mailService.getAllPerson().subscribe(
      async result => {
        this.persons = result;
        this.globalService.personList = result;
        if (this.currentPersId !== 0) {
          await this.switchToPerson(this.currentPersId);
          this.scroll(this.currentPersId);
        } else {
          this.personToShow = this.persons[0];
          this.currentPersId = this.personToShow.id;
          await this.getEmailAddressList(this.personToShow.id);
        }
      },
      error => {
        console.log('Erreur d\'accès aux données');
      }
    );
  }

  async switchToPerson(id: number) {
    this.showPersonInfo = true;
    this.currentPersId = id;
    if (this.persons) {
      for (const person of this.persons) {
        if (person.id === id) {
          this.personToShow = person;
        }
      }
    } else {
      await this.switchToPerson(id);
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
    console.log('\t >> ID: ', id);
    await this.mailService.getPersonEmailList(id).subscribe(
      data => {
        this.emailAddressList = data;
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
  }

  getDefaultPerson(idPerson: number) {
    this.mailService.getPersonById(idPerson).subscribe(
      data => {
        // this.defaultPerson = data;
      },
      error => {
        console.log('Impossible de récupérer les données');
      }
    );
  }

  async getSelectedPerson(personId: number) {
    if (this.persons) {
      for (const pers of this.persons) {
        if (pers.id === personId) {
          this.personToShow = pers;
          this.currentPersId = personId;
        }
      }
    }
  }

  scroll(id) {
    console.log(`scrolling to ${id}`);
    const identifier = 'person_id_' + id;
    const elt = document.getElementById(id);
    elt.scrollIntoView();
  }

}


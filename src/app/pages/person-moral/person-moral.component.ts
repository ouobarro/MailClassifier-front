import { Component, OnInit } from '@angular/core';
import {Email, Person, PersonMail, PersonMoral} from '../../services/model';
import {MailService} from '../../services/mail.service';
import {GlobalService} from '../../services/global.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-person-moral',
  templateUrl: './person-moral.component.html',
  styleUrls: ['./person-moral.component.scss']
})
export class PersonMoralComponent implements OnInit {

  personsM: Array<PersonMoral>;
  currentPersMId = 0;
  personMToShow: PersonMoral = null;
  defaultPersonM: PersonMoral = null;

  emailAddressList: Array<Email>;

  mailListSended: Array<PersonMail> = new Array<PersonMail>();
  mailListReceived: Array<PersonMail> = new Array<PersonMail>();
  mailListReceivedCc: Array<PersonMail> = new Array<PersonMail>();

  showPersonMInfo = false;

  constructor(
    private mailService: MailService,
    public globalService: GlobalService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      this.currentPersMId = Number(params.personDtoId) || 0;
    });
    if (!this.globalService.personMList) {
      this.getAllPersonMoral();
    } else {
      this.personsM = this.globalService.personMList;
      if (this.currentPersMId !== 0) {
        this.switchToPersonM(this.currentPersMId);
        this.scroll(this.currentPersMId);
      } else {
        this.personMToShow = this.personsM[0];
        this.currentPersMId = this.personMToShow.id;
        this.getEmailAddressList(this.personMToShow.id);
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

  getAllPersonMoral() {
    this.mailService.getAllPersonMoral().subscribe(
      async result => {
        this.personsM = result;
        this.globalService.personMList = result;
        if (this.currentPersMId !== 0) {
          await this.switchToPersonM(this.currentPersMId);
          this.scroll(this.currentPersMId);
        } else {
          this.personMToShow = this.personsM[0];
          this.currentPersMId = this.personMToShow.id;
          await this.getEmailAddressList(this.personMToShow.id);
        }
      },
        error => {
        console.log('Erreur d\'accès aux données');
      }
    );
  }

  async switchToPersonM(id: number) {
    this.showPersonMInfo = true;
    this.currentPersMId = id;

    if (this.personsM) {
      for (const person of this.personsM) {
        if (person.id === id) {
          this.personMToShow = person;
        }
      }
    } else {
      await this.switchToPersonM(id);
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
    await this.mailService.getPersonMoralEmailList(id).subscribe(
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

  getDefaultPersonMoral(idPersonM: number) {
    this.mailService.getPersonMoralById(idPersonM).subscribe(
      data => {
        this.defaultPersonM = data;
      },
      error => {
        console.log('Impossible de récupérer les données');
      }
    );
  }

  scroll(id) {
    console.log(`scrolling to ${id}`);
    const identifier = 'person_id_' + id;
    const elt = document.getElementById(id);
    elt.scrollIntoView();
  }

}

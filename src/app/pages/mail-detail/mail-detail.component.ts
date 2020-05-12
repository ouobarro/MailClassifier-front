import { Component, OnInit } from '@angular/core';
import {Attachment, AttachType, BroadcastList, Email, Link, Mail, Person} from '../../services/model';
import {MailService} from '../../services/mail.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mail-detail',
  templateUrl: './mail-detail.component.html',
  styleUrls: ['./mail-detail.component.scss']
})
export class MailDetailComponent implements OnInit {

  persons: Array<Person>;
  mailList: Array<Mail>;
  emailList: Array<Email>;
  linkList: Array<Link>;
  attachList: Array<Attachment>;
  attachTypeList: Array<AttachType>;
  broadList: Array<BroadcastList>;


  mailToShow: Mail = null;
  personToShow: Person = null;
  stat = false;
  pers = false;

  showMailList = false;
  showPersonInfo = false;

  constructor(
    private mailService: MailService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getAllPerson();
    this.getAllMail();
    this.getAllEmail();
    this.getAllLink();
    this.getAllAttachment();
    this.getAllAttachType();
    this.getAllBroadcastList();
    console.log(this.mailList);
  }
  getMailByEmail() {
    this.getMailListByEmail(7);
  }

  // mails
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

  // email
  getAllEmail() {
    this.mailService.getAllEmail().subscribe(
      data => {
        this.emailList = data;
      },
      error => {
        console.log('Impossible de récupérer les données');
      }
    );
  }

  // links
  getAllLink() {
    this.mailService.getAllLink().subscribe(
      data => {
        this.linkList = data;
      },
      error => {
        console.log('Impossible de récupérer les données');
      }
    );
  }

  // attachments
  getAllAttachment() {
    this.mailService.getAllAttachment().subscribe(
      data => {
        this.attachList = data;
      },
      error => {
        console.log('Impossible de récupérer les données');
      }
    );
  }

  // attachments type
  getAllAttachType() {
    this.mailService.getAllAttachType().subscribe(
      data => {
        this.attachTypeList = data;
      },
      error => {
        console.log('Impossible de récupérer les données');
      }
    );
  }

  // broadcast list
  getAllBroadcastList() {
    this.mailService.getAllBroadcastList().subscribe(
      data => {
        this.broadList = data;
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

  getPersonByName(name: string) {
    this.mailService.getPersonByName(name).subscribe(
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
    console.log('MAIL_ID: ', id);
    for (const mail of this.mailList) {
      if (mail.id === id) {
        this.mailToShow = mail;
        console.log('MAIL: ', mail.subject);
      }
    }
  }

  switchToPerson(id: number) {
    this.showPersonInfo = true;
    console.log('Person_ID: ', id);
    for (const person of this.persons) {
      if (person.id === id) {
        this.personToShow = person;
        console.log('PERSON: ', Person.name);
      }
    }
  }

  detailPerson(id: number) {
    this.router.navigate(['person-infos', id]);
  }


}

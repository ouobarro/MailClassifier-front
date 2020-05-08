import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AttachType, Email, Link, Mail, Person, Attachment, BroadcastList} from '../../services/model';
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
  emailList: Array<Email>;
  linkList: Array<Link>;
  attachList: Array<Attachment>;
  attachTypeList: Array<AttachType>;
  broadList: Array<BroadcastList>;


  mailToShow: Mail = null;
  stat = false;
  pers = false;

  showMailList = false;

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

  affichStat() {
    this.stat = true;
  }
  affichPers() {
    this.pers = true;
  }

}

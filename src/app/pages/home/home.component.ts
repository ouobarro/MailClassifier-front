import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Attachment, AttachType, BroadcastList, Email, Link, Mail, Person} from '../../services/model';
import {MailService} from '../../services/mail.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  stat = false;
  pers = false;

  persons: Array<Person>;
  mailList: Array<Mail>;
  emailList: Array<Email>;
  linkList: Array<Link>;
  attachList: Array<Attachment>;
  attachTypeList: Array<AttachType>;
  broadList: Array<BroadcastList>;

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

  // person
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

  affichStat() {
    this.stat = true;
  }
  affichPers() {
    this.pers = true;
  }

}

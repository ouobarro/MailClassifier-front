import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Attachment, AttachType, BroadcastList, DataCount, Email, Link, Mail, Person} from '../../services/model';
import {MailService} from '../../services/mail.service';
import {Router} from '@angular/router';
import {GlobalService} from '../../services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  persons: Array<Person>;
  dataCount: DataCount;

  constructor(
    private mailService: MailService,
    public globalService: GlobalService
  ) { }

  ngOnInit(): void {
    this.getDataCount();
    if (!this.globalService.mailList) {
      this.getAllMail();
    }
  }


  // mails
  getAllMail() {
    this.mailService.getAllMail().subscribe(
      data => {
        this.globalService.mailList = data;
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

  async getDataCount() {
     await this.mailService.dataCount().subscribe(
      result => {
        this.dataCount = result;
      },
      error => {
        console.log('Erreur d\'accès aux données');
      }
    );
  }

}

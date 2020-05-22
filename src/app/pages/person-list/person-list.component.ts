import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AttachType, Email, Link, Mail, Person, Attachment, BroadcastList} from '../../services/model';
import {MailService} from '../../services/mail.service';
import {ActivatedRoute, Router} from '@angular/router';
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

  showMailList = false;

  constructor(
    private router: Router,
    private mailService: MailService,
    public globalService: GlobalService
  ) {}

  ngOnInit(): void {
    // this.getDefaultMail(4743);
    if (!this.globalService.mailList) {
      this.getAllMail();
    } else {
      console.log('GLOBAL LIST IS NOT NULL');
      this.mailList = this.globalService.mailList;
      this.mailToShow = this.mailList[0];
      this.currentMailId = this.mailToShow.id;
    }

  }

  // mails
  getAllMail() {
    this.mailService.getAllMail().subscribe(
      data => {
        this.mailList = data;
        this.globalService.mailList = data;
        this.mailToShow = this.mailList[0];
        this.currentMailId = this.mailToShow.id;
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
      }
    }
  }

  redirectTo(email: Email) {
    if (email.personDto) {
      this.router.navigate(['/mail-detail'], { queryParams: { personDtoId: email.personDto.id } });
    } else if (email.personMoralDto) {
      console.log('\t>>>REDIRECT TO PERSON MORAL');
      this.router.navigate(['/person-moral'], { queryParams: { personDtoId: email.personMoralDto.id } });
    }
  }

}

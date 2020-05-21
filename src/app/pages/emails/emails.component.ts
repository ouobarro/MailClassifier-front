import { Component, OnInit } from '@angular/core';
import {BroadcastList, Email} from '../../services/model';
import {MailService} from '../../services/mail.service';
import {GlobalService} from '../../services/global.service';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.scss']
})
export class EmailsComponent implements OnInit {

  emailList: Array<Email>;

  constructor(
    private mailService: MailService,
    public globalService: GlobalService
  ) {}

  ngOnInit(): void {
    if (!this.globalService.emailList) {
      console.log('GLOBAL LIST IS NULL');
      this.getAllEmail();
    } else {
      console.log('GLOBAL LIST IS NOT NULL');
      this.emailList = this.globalService.emailList;
    }
  }

  getAllEmail() {
    this.mailService.getAllEmail().subscribe(
      data => {
        this.emailList = data;
        this.globalService.emailList = data;
      },
      error => {
        console.log('Impossible de récupérer les données');
      }
    );
  }

}

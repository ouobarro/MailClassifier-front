import { Component, OnInit } from '@angular/core';
import {MailService} from '../../services/mail.service';
import {GlobalService} from '../../services/global.service';
import {BroadcastList, Email, Mail, Person, PersonMail} from '../../services/model';

@Component({
  selector: 'app-diffusion',
  templateUrl: './diffusion.component.html',
  styleUrls: ['./diffusion.component.scss']
})
export class DiffusionComponent implements OnInit {

  bclList: Array<BroadcastList>;
  bclToShow: BroadcastList = null;
  currentBclId = 0;

  emailAddressList: Array<Email>;

  mailListSended: Array<PersonMail> = new Array<PersonMail>();
  mailListReceived: Array<PersonMail> = new Array<PersonMail>();
  mailListReceivedCc: Array<PersonMail> = new Array<PersonMail>();

  constructor(
    private mailService: MailService,
    public globalService: GlobalService
  ) {}

  ngOnInit(): void {
    if (!this.globalService.bclList) {
      this.getAllBroadcastList();
    } else {
      this.bclList = this.globalService.bclList;
      this.bclToShow = this.bclList[0];
      this.currentBclId = this.bclToShow.id;
      this.getEmailAddressList(this.bclToShow.id);
    }
  }

  getAllBroadcastList() {
    this.mailService.getAllBroadcastList().subscribe(
      async data => {
        this.bclList = data;
        this.globalService.bclList = data;
        this.bclToShow = this.bclList[0];
        this.currentBclId = this.bclToShow.id;
        await this.getEmailAddressList(this.bclToShow.id);
      },
      error => {
        console.log('Impossible de récupérer les données');
      }
    );
  }

  async switchTobcl(id: number) {
    this.currentBclId = id;
    for (const bcl of this.bclList) {
        if (bcl.id === id) {
          this.bclToShow = bcl;
        }
      }
      // await this.switchToPerson(id);
    await this.getEmailAddressList(id);
  }

  async getEmailAddressList(id: number) {
    this.emailAddressList = new Array<Email>();
    this.mailListSended = new Array<PersonMail>();
    this.mailListReceived = new Array<PersonMail>();
    this.mailListReceivedCc = new Array<PersonMail>();
    console.log('\t >> ID: ', id);
    await this.mailService.getBclEmailList(id).subscribe(
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
      const bclMail = new PersonMail();
      bclMail.email = email.eaddress;
      await this.mailService.getMailListByEmail(email.id).subscribe(
        data => {
          bclMail.mailList = data;
        },
        error => {
          console.log('Impossible de récuperer les mails envoyés pour emailId = ', email.id);
        }
      );
      this.mailListSended.push(bclMail);
    }
  }

  async getMapReceivedMailList(emailAddressList: Array<Email>) {
    for (const email of emailAddressList) {
      const bclMail = new PersonMail();
      bclMail.email = email.eaddress;
      await this.mailService.getReceivedMailByEmailId(email.id).subscribe(
        data => {
          bclMail.mailList = data;
        },
        error => {
          console.log('Impossible de récuperer les mails envoyés pour emailId = ', email.id);
        }
      );
      this.mailListReceived.push(bclMail);
    }
  }

  async getMapReceivedCcMailList(emailAddressList: Array<Email>) {
    for (const email of emailAddressList) {
      const bclMail = new PersonMail();
      bclMail.email = email.eaddress;
      await this.mailService.getReceivedCcMailByEmailId(email.id).subscribe(
        data => {
          bclMail.mailList = data;
        },
        error => {
          console.log('Impossible de récuperer les mails envoyés pour emailId = ', email.id);
        }
      );
      this.mailListReceivedCc.push(bclMail);
    }
  }

}

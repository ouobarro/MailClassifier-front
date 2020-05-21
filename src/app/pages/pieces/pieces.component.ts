import { Component, OnInit } from '@angular/core';
import {Attachment, BroadcastList} from '../../services/model';
import {MailService} from '../../services/mail.service';
import {GlobalService} from '../../services/global.service';

@Component({
  selector: 'app-pieces',
  templateUrl: './pieces.component.html',
  styleUrls: ['./pieces.component.scss']
})
export class PiecesComponent implements OnInit {

  attachList: Array<Attachment>;

  constructor(
    private mailService: MailService,
    public globalService: GlobalService
  ) {}

  ngOnInit(): void {
    if (!this.globalService.attachList) {
      console.log('GLOBAL LIST IS NULL');
      this.getAllAttachment();
    } else {
      console.log('GLOBAL LIST IS NOT NULL');
      this.attachList = this.globalService.attachList;
    }
  }

  getAllAttachment() {
    this.mailService.getAllAttachment().subscribe(
      data => {
        this.attachList = data;
        this.globalService.attachList = data;
      },
      error => {
        console.log('Impossible de récupérer les données');
      }
    );
  }

}

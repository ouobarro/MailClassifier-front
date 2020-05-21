import { Component, OnInit } from '@angular/core';
import {MailService} from '../../services/mail.service';
import {GlobalService} from '../../services/global.service';
import {BroadcastList, Mail} from '../../services/model';

@Component({
  selector: 'app-diffusion',
  templateUrl: './diffusion.component.html',
  styleUrls: ['./diffusion.component.scss']
})
export class DiffusionComponent implements OnInit {


  bclList: Array<BroadcastList>;

  constructor(
    private mailService: MailService,
    public globalService: GlobalService
  ) {}

  ngOnInit(): void {
    if (!this.globalService.bclList) {
      console.log('GLOBAL LIST IS NULL');
      this.getAllBroadcastList();
    } else {
      console.log('GLOBAL LIST IS NOT NULL');
      this.bclList = this.globalService.bclList;
    }
  }

  getAllBroadcastList() {
    this.mailService.getAllBroadcastList().subscribe(
      data => {
        this.bclList = data;
        this.globalService.bclList = data;
      },
      error => {
        console.log('Impossible de récupérer les données');
      }
    );
  }

}

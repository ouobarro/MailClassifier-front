import { Component, OnInit } from '@angular/core';
import {BroadcastList, Link} from '../../services/model';
import {MailService} from '../../services/mail.service';
import {GlobalService} from '../../services/global.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-liens',
  templateUrl: './liens.component.html',
  styleUrls: ['./liens.component.scss']
})
export class LiensComponent implements OnInit {

  linkList: Array<Link>;

  constructor(
    private router: Router,
    private mailService: MailService,
    public globalService: GlobalService
  ) {}

  ngOnInit(): void {
    if (!this.globalService.linkList) {
      this.getAllLink();
    } else {
      this.linkList = this.globalService.linkList;
    }
  }

  getAllLink() {
    this.mailService.getAllLink().subscribe(
      data => {
        this.linkList = data;
        this.globalService.linkList = data;
      },
      error => {
        console.log('Impossible de récupérer les données');
      }
    );
  }

}

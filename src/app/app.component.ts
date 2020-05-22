import { Component } from '@angular/core';
import {MailService} from './services/mail.service';
import {GlobalService} from './services/global.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Email} from './services/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Classification des messagerie électroniques professionnelles';

  constructor(
    public globalService: GlobalService,
    private router: Router
  ) { }

  clickable(id: number) {
    this.globalService.navId = id;
  }

}

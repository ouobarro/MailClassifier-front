import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Person} from '../../services/model';
import {MailService} from '../../services/mail.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}

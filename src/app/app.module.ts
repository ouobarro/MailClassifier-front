import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MailDetailComponent } from './pages/mail-detail/mail-detail.component';
import { PersonListComponent } from './pages/person-list/person-list.component';
import { HomeComponent } from './pages/home/home.component';
import {MailService} from './services/mail.service';
import { ChoixComponent } from './pages/choix/choix.component';
import { NgxLoadingModule } from 'ngx-loading';
import { PersonInfosComponent } from './pages/person-infos/person-infos.component';
import { PersonMoralComponent } from './pages/person-moral/person-moral.component';
import { DiffusionComponent } from './pages/diffusion/diffusion.component';
import { EmailsComponent } from './pages/emails/emails.component';
import { LiensComponent } from './pages/liens/liens.component';
import { PiecesComponent } from './pages/pieces/pieces.component';


@NgModule({
  declarations: [
    AppComponent,
    MailDetailComponent,
    PersonListComponent,
    HomeComponent,
    ChoixComponent,
    PersonInfosComponent,
    PersonMoralComponent,
    DiffusionComponent,
    EmailsComponent,
    LiensComponent,
    PiecesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [MailService],
  bootstrap: [AppComponent]
})
export class AppModule { }

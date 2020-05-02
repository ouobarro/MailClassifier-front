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


@NgModule({
  declarations: [
    AppComponent,
    MailDetailComponent,
    PersonListComponent,
    HomeComponent,
    ChoixComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [MailService],
  bootstrap: [AppComponent]
})
export class AppModule { }

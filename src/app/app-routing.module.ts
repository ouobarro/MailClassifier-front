import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { MailDetailComponent } from './pages/mail-detail/mail-detail.component';
import { PersonListComponent } from './pages/person-list/person-list.component';
import { ChoixComponent } from './pages/choix/choix.component';
import {PersonInfosComponent} from './pages/person-infos/person-infos.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent },
  { path: 'mail-detail', component: MailDetailComponent },
  { path: 'person-list', component: PersonListComponent },
  { path: 'choix', component: ChoixComponent },
  { path: 'person-infos/:id', component: PersonInfosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

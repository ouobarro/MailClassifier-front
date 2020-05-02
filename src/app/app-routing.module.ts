import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { MailDetailComponent } from './pages/mail-detail/mail-detail.component';
import { PersonListComponent } from './pages/person-list/person-list.component';
import { ChoixComponent } from './pages/choix/choix.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'person-list'},
  { path: 'home', component: HomeComponent },
  { path: 'mail-detail/:id', component: MailDetailComponent },
  { path: 'person-list', component: PersonListComponent },
  { path: 'choix', component: ChoixComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

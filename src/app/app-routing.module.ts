import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MailDetailComponent } from './pages/mail-detail/mail-detail.component';
import { PersonListComponent } from './pages/person-list/person-list.component';
import { ChoixComponent } from './pages/choix/choix.component';
import { PersonInfosComponent } from './pages/person-infos/person-infos.component';
import { PersonMoralComponent } from './pages/person-moral/person-moral.component';
import { LiensComponent } from './pages/liens/liens.component';
import { DiffusionComponent } from './pages/diffusion/diffusion.component';
import { PiecesComponent } from './pages/pieces/pieces.component';
import { EmailsComponent } from './pages/emails/emails.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: HomeComponent },
  { path: 'mail-detail', component: MailDetailComponent },
  { path: 'person-list', component: PersonListComponent },
  { path: 'choix', component: ChoixComponent },
  { path: 'person-infos/:id', component: PersonInfosComponent },
  { path: 'liens', component: LiensComponent },
  { path: 'diffusion', component: DiffusionComponent },
  { path: 'pieces', component: PiecesComponent },
  { path: 'emails', component: EmailsComponent },
  { path: 'person-moral', component: PersonMoralComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

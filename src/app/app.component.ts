import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Classification des messagerie électroniques professionnelles';
  id = 0;

  clickable(id: number) {
    this.id = id;
  }
}

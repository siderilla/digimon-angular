import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DetailComponent } from './components/detail/detail.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, DetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'digimon-angular';
}

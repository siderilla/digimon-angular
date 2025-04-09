import { Component, input } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
	widthPx = input('', { // inizializza il valore come stringa
		transform: (val: number) => `${val}px` // transform function number 200 in stringa 200px
	});
}

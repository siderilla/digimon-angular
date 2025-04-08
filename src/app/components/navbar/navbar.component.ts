import { Component } from '@angular/core';
import { DigimonService } from '../../services/digimon.service';
import { type DigimonModel } from '../../interfaces/digimon-model';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

	startIndex = 0;
	visibleDigimon: DigimonModel[] = [];

	constructor(private digimonService: DigimonService) {
		this.loadDigimon(); // ✅ chiamata iniziale corretta
	}

	async loadDigimon() {
		await this.digimonService.fetchAllNames();
		await this.loadCurrentPage();
	}

	async loadCurrentPage() {
		const slice = this.digimonService.getNamesSlice(this.startIndex, 5);
		const ids = slice.map(d => d.id);
		const promises = ids.map(id => this.digimonService.fetchDigimonById(id));
		this.visibleDigimon = await Promise.all(promises);
	}

	nextPage() {
		const total = this.digimonService.getNamesSlice(0, 99999).length;
		console.log('[nextPage] total', total);
		console.log('[nextPage] before increment', this.startIndex);
	  
		if (this.startIndex + 5 < total) {
		  this.startIndex += 5;
		  console.log('[nextPage] after increment', this.startIndex);
		  this.loadCurrentPage();
		}
	  }
	  

	prevPage() {
		if (this.startIndex - 5 >= 0) {
			this.startIndex -= 5;
			this.loadCurrentPage();
		}
	}

	onDigimonClick(id: number) {
		this.digimonService.selectDigimon(id);
	}
}

import { Component } from '@angular/core';
import { DigimonService } from '../../services/digimon.service';
import { type DigimonModel } from '../../interfaces/digimon-model';
import { CommonModule } from '@angular/common';
import { effect, signal } from '@angular/core';


@Component({
	selector: 'app-detail',
	imports: [CommonModule],
	templateUrl: './detail.component.html',
	styleUrl: './detail.component.scss'
})
export class DetailComponent {
	digimon = signal<DigimonModel | null>(null);

	constructor(private digimonService: DigimonService) {
		effect(() => {
			const id = this.digimonService.selectedDigimonId();
			if (id !== null) {
				this.loadDigimon(id);
			}
		});
	}

	async loadDigimon(id: number) {
		const data = await this.digimonService.fetchDigimonById(id);
		this.digimon.set(data);
	}

	get description(): string {
		const d = this.digimon();
		return d?.descriptions.find(desc => desc.language === 'en')?.description ?? 'No description';
	}

}
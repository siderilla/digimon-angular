import { Injectable, signal } from '@angular/core';
import { DigimonModel } from '../interfaces/digimon-model';


@Injectable({
  providedIn: 'root'
})
export class DigimonService {
  private apiUrl = 'https://digi-api.com/api/v1/digimon';
  private allDigimonNames: { name: string; id: number }[] = [];

  selectedDigimonId = signal<number | null>(null);

  selectDigimon(id: number) {
    this.selectedDigimonId.set(id);
  }

  async fetchAllNames(): Promise<{ name: string; id: number }[]> {
	if (this.allDigimonNames.length > 0) {
	  console.log('[fetchAllNames] Already loaded');
	  return this.allDigimonNames;
	}
  
	console.log('[fetchAllNames] Fetching from API...');
	const res = await fetch(`${this.apiUrl}?pageSize=1460`);
	const data = await res.json();
  
	this.allDigimonNames = data.content.map((digimon: any) => ({
	  name: digimon.name,
	  id: digimon.id
	}));
  
	console.log('[fetchAllNames] Loaded', this.allDigimonNames.length, 'digimon');
  
	return this.allDigimonNames;
  }
  

  getNamesSlice(start: number, count: number): { name: string; id: number }[] {
	const slice = this.allDigimonNames.slice(start, start + count);
	console.log('[getNamesSlice]', start, '→', start + count, '=>', slice.map(d => d.name));
	return slice;
  }
  

  async fetchDigimonById(id: number): Promise<DigimonModel> {
    const res = await fetch(`${this.apiUrl}/${id}`);
    const data = await res.json();
    return data;
  }
}

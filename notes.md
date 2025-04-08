STRUTTURA
src/
 ┣ app/
 ┃ ┣ components/
 ┃ ┃ ┣ homepage/         ← qui componi tutta la pagina
 ┃ ┃ ┣ header/
 ┃ ┃ ┣ navbar/
 ┃ ┃ ┣ detail/
 ┃ ┃ ┣ footer/
 ┃ ┣ services/
 ┃ ┃ ┗ digimon.service.ts
 ┃ ┣ models/
 ┃ ┃ ┗ digimon.model.ts
 ┃ ┣ app.component.ts
 ┃ ┣ app.module.ts
 ┃ ┗ app-routing.module.ts (se usi routing, anche solo per completezza)

------------------------------------------------------------------------------

CONVERSIONE JSON to TYPESCRIPT ONLINE
e filtro delle info essenziali per iniziare un progetto base... poi si vedrà

------------------------------------------------------------------------------

Cos’è un endpoint API
Un endpoint è semplicemente una “porta” dell’API che si può chiamare per ottenere (o inviare) dati.
L’API https://digi-api.com/api/v1/digimon ha diversi endpoint, ad esempio:

ENDPOINT:											|	COSA FA:
https://digi-api.com/api/v1/digimon					|	Ti restituisce una lista completa di Digimon
https://digi-api.com/api/v1/digimon/1				|	Restituisce i dati dettagliati del Digimon con ID 1
https://digi-api.com/api/v1/digimon/name/Agumon		|	Restituisce Agumon se esiste

Ogni endpoint può avere parametri o percorsi diversi, e può restituire:
    un array (es: lista di Digimon)
    un oggetto singolo (es: dettagli di uno solo)

------------------------------------------------------------------------------

USO DI startIndex (carichiamo 100 digimon a ogni chiamata)
si fa una variabile che controlla da quale posizione dell'array si parte per mostrare i dati. Serve per creare una specie di "paginazione" o "scorrimento".

allDigimon: DigimonModel[] = [...]; // contiene tutti
startIndex: number = 0; // all’inizio si parte da zero

Mostrare solo 5 Digimon per volta nella navbar, quindi usi lo slice:
get visibleDigimon(): DigimonModel[] {
  return this.allDigimon.slice(this.startIndex, this.startIndex + 5);
}

Quando si clicca sulla freccia destra (→):
this.startIndex += 5;

------------------------------------------------------------------------------

Scrittura					Significato
private						Visibile solo dentro la classe stessa
public						Visibile ovunque, anche nell'HTML se la classe è un componente
protected					Visibile nella classe e nelle classi figlie (ereditarietà)
(nessuna parola)			È come public ma meno esplicito


ALTERNATIVA per iniettare il servizio direttamente via costruttore:
	constructor(private digimonService: DigimonService)
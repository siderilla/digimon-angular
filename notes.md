STRUTTURA
src/
 ┣ app/
 ┃ ┣ components/
 ┃ ┃ ┣ homepage/
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

------------------------------------------------------------------------------

@input property
quando usi un componente, normalmente vuoi passarci dei dati dentro
un componente specifica i dati che accetta dichiarandone gli inputs:

con import
	value = input(0);
alternativa decorator
	@Input() value = 0;

a questo punto si può fare il binding (collegare il valore del template a una proprietà del compomente), in questo caso possiamo collegare il valore della proprietà value dentro l'html, potenzialmente così:

<custom-slider [value]="currentValue"></custom-slider>

- Cosa succede?
il valore di currentValue (una variabile del genitore) viene "legato" alla proprietà value del figlio
quindi, se currentValue = 5, il figlio riceve value = 5

--

Typescript capisce da solo il tipo di dato del valore input, non c'è bisogno di specificare il tipo, l'importante è immettere il valore di default tra parentesi

- i nomi input sono case-sensitive
- gli input sono registrati STATICAMENTE in compilazione, ergo non 	possono essere aggiunti o rimossi in runtime
- input non può essere usato dentro a un metodo, solo nella dichiarazione delle proprietà di classe
- se fai una classe figlia che estende un altro compoennte, gli input definiti nella classe padre vengono automaticamente inclusi nella figlia (class childcomponente extends fathercomponent)

--

la funzione input() restituisce un InputSignal
dunque per creare un valore reattivo derivato a uno o più signal (in questo caso lo abbiamo come return della funzione input()) dobbiamo usare computed()

label = computed(() => `The slider's value is ${this.value()}`);
	“crea un etichetta che dice "Il valore della slide è .." e aggiornala ogni volta che value cambia”

--

si può RICHIEDERE un input con value = input.required<tipo>()
i required input non includono automaticamente undefined nel parametro generico di ritorno in InputSignal

--

input() può accettare un secondo parametro come oggetto di configurazione, che può contenere una funzione chiamata transform

TRANSFORM:
serve a modificare il valore dell'input prima che venga usato nel componente

label = input('', { transform: trimString });
	“Sto accettando un input chiamato label. Quando Angular lo imposta, prima di usarlo, lo passo alla funzione trimString().”

e per esempio se abbiamo bisogno di rimuovere degli spazi da un valore passato in input, lo passiamo al secondo parametro transform che chiama la funzione trimString che gestisce questo caso in particolare

in questo modo:
- evita problemi nel componente: tu ricevi già i dati puliti e sistemati
- puoi gestire casi ambigui come null, undefined, spazi inutili, numeri trasformati in stringhe, ecc.

--

TYPE CHECKING:
quando si specifica un input transform, il tipo della transform function determina il tipo del valore che può essere settato all'input dentro al template

in sostanza, chiamando una funzione che prende un number come input e che restituisce però una stringa che va bene per il template ovvero
numero 50, stringa 50px per il template in questo modo si passano le informazioni trasformandole nei tipi necessari al componente per essere gestite correttamente

------------------------------------------------------------------------------

@output property
è il canale di comunicazione opposto a input()
si permette a un componente figlio di inviare un evento al genitore quando succede qualcosa (evento, click, modifica, selezione...)

ritorna un OutputEmitterRef, l'evento si emette chiamando il metodo emit:
this.clicked.emit();

ESEMPIO: 
import output, EventEmitter
dentro la classe:
  clicked = output<void>();  // tipo void perché non inviamo dati

   notifyParent() {
    this.clicked.emit(); // invia l'evento al genitore
  }

BUBBLING:
- gli eventi creati con output() non *risalgono* l'albero dei componenti DOM come fanno gli eventi nativi (es. click, input, etc..)

cos'è il bubbling?
bollire/risalire: nel browser, quando fai click su un elemento
	- l'evento parte dall'elemento cliccato (fase di target)
	- poi RISALE il DOM fino al body, document, etc...

con output() NON SUCCEDE, l'evento va solo a quel binding specifico, perché non sono eventi DOM veri, ma un meccanismo interno di angular basato su EventEmitter

- i nomi output sono case-sensitive
- anche gli output si estendono sulle classe componenti estese figlie

--

quando si passa un eventListener al template, si accede all'evento con la variabile $event:
	<custom-slider (valueChanged)="logValue($event)" />

--

le output function accettano un parametro che permette di specificare il nome per l'evento nel template:
	component:
		changed = output({alias: 'valueChanged'});
	template:
		<custom-slider (valueChanged)="saveVolume()" />

--

output DINAMICO:
in sostanza, anziché generare i file componente prima, posso via codice dire nel mio servizio o app di creare runtime un componente che ha il solo scopo di emettere un output, dopo di ché con un comando apposito (unsibscribe) esaurito il suo scopo, angular se ne sbarazza

createComponent(...)				Crea un componente via codice
.instance.someOutput.subscribe()	Ti permette di ascoltare un @Output() dinamico
Angular pulisce in automatico		Quando il componente viene distrutto
.unsubscribe()						Serve per interrompere l’ascolto in anticipo

può servire ad esempio per:
-aprire una modale
-mostrare una card temporanea
-creare dinamicamente una lista interattiva
-un tooltip
-un wizard che cambia struttura passo dopo passo
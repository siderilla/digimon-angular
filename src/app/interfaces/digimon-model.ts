export interface DigimonModel {
	
	id: number;
	name: string;
	images: {
		href: string;
	}[];
	levels: {
		id: number;
		level: string;
	}[];
	types: {
		id: number;
		type: string;
	}[];
	attributes: {
		id: number;
		attribute: string;
	}[];
	descriptions: {
		language: string;
		description: string;
	}[];
}


// id, name

// images[0].href

// descriptions.find(d => d.language === 'en')

// levels[0].level

// types[0].type

// attributes[0].attribute
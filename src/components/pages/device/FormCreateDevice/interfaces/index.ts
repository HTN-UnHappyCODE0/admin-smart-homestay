export interface PropsFormCreateDevice {
	onClose: () => void;
}

export interface ICreateDevice {
	name: string;
	description: string;
	codeConnection: string;
	codeApartment: string;
	nameApartment: string;
	address: string;
	date: string;
	installer: string;
}

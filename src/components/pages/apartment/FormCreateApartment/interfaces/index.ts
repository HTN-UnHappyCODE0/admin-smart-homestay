export interface PropsFormCreateApartment {}

export interface IDataUploadFile {
	url: string;
	file: File | null;
	path: string;
}

export interface IFormCreateApartment {
	name: string;
	apartmentTypeUu: string;
	owner: string;
	apartmentSize: number;
	managerUu: string;
	lock: string;
	provinceId: string;
	wardId: string;
	address: string;
	description: string;
	rooms: {name: string; quantity: string}[];
}

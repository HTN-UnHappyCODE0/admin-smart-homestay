import {TYPE_USER} from '~/constants/config/enum';

export interface PropsDetailEmployeeProfile {
	onClose: () => void;
}

export interface IApartmentManager {
	ownerUu: {
		code: string;
		name: string;
		id: number;
		uuid: string;
		status: number;
	};
	province: {
		code: string;
		fullName: string;
		fullNameEn: string;
	};
	ward: {
		code: string;
		fullName: string;
		fullNameEn: string;
		provinceCode: string;
	};
	address: string;
	code: string;
	name: string;
	id: number;
	uuid: string;
	status: number;
}

export interface IDetailEmployeeProfile {
	name: string;
	managerUu: string;
	phoneNumber: string;
	numApartment: number;
	email: string;
	userName: string;
	type: number;
	apartmentManagerUus: IApartmentManager[];
	description: string;
	id: number;
	uuid: string;
	status: number;
}

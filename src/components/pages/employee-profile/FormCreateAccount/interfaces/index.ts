export interface PropsFormCreateAccount {
	data: {
		userUuid: string;
		name: string;
	};
	onClose: () => void;
}

export interface IDetailEmployeeProfile {
	name: string;
	managerUu: string;
	phoneNumber: string;
	numApartment: number;
	email: string;
	userName: string;
	type: number;
	apartmentManagerUus: [];
	description: string;
	id: number;
	uuid: string;
	status: number;
}

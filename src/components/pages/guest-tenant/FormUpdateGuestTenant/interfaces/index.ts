export interface PropsFormUpdateGuestTenant {
	onClose: () => void;
}

export interface IDetailGuest {
	email: string;
	identification: {
		identityNumber: string;
		issuedDate: string;
		issuedPlace: string;
		idBackImage: string;
		idFrontImage: string;
	};
	contractRenterUus: {
		code: number;
		from: string;
		to: string;
		id: number;
		uuid: string;
		status: string;
	}[];
	userName: string;
	name: string;
	code: string;
	phoneNumber: string;
	description: number;
	id: number;
	uuid: string;
	status: number;
}

export interface IUpdateGuestTenant {
	code: string;
	name: string;
	userName: string;
	phoneNumber: string;
	email: string;
	identityNumber: string;
	issuedDate: string;
	issuedPlace: string;
}

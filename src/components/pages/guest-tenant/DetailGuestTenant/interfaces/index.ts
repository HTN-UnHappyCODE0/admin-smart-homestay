export interface PropsDetailGuestTenant {
	onClose?: () => void;
}

export interface IDetailGuestTenant {
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

export interface IGuestContract {
	code: string;
	from: string;
	to: string;
	name: string;
	id: number;
	uuid: string;
	status: number;
}

export interface PropsRentalContractApartment {}

export interface IUserContract {
	userUu: {
		bankNumber: string;
		bankName: string;
		phoneNumber: string;
		uuid: string;
		code: string;
		name: string;
	};
	deviceId: string;
	description: string;
	type: number;
	hasResidenceRegistered: number;
}

export interface ICurrentContract {
	code: number;
	userSignUu: {
		uuid: string;
		code: number;
		name: string;
	};
	numPerson: number;
	deposit: number;
	price: number;
	from: string;
	to: string;
	id: number;
	uuid: string;
	status: number;
}

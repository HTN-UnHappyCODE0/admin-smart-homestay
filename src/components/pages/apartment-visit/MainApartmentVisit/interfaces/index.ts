export interface PropsMainApartmentVisit {}

export interface IApartmentVisit {
	identification: {
		userUu: {
			bankNumber: string;
			bankName: string;
			phoneNumber: string;
			code: string;
			name: string;
			id: number;
			uuid: string;
			status: number;
		};
		fullName: string;
		birthDate: string;
		gender: number;
		identityNumber: string;
		issuedDate: string;
		issuedPlace: string;
		address: string;
		selfieImage: string;
		idBackImage: string[];
		idFrontImage: string[];
		description: string;
		id: number;
		uuid: string;
		status: number;
	};
	description: string;
	apartmentUu: {
		name: string;
		apartmentTypeUu: {
			code: string;
			name: string;
			id: number;
			uuid: string;
			status: number;
		};
		numFloor: number;
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
		apartmentSize: number;
		id: number;
		uuid: string;
		status: number;
	};
	from: string;
	to: string;
	id: number;
	uuid: string;
	status: number;
}

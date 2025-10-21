export interface PropsDetailRequestViewApartment {
	onClose: () => void;
}

export interface IDetailRequestView {
	identification: {
		userUu: {
			bankNumber: string;
			bankName: string;
			phoneNumber: string;
			uuid: string;
			code: number;
			name: string;
		};
		fullName: string;
		birthDate: string;
		gender: number;
		identityNumber: string;
		issuedDate: string;
		issuedPlace: string;
		address: string;
		selfieImage: string;
		idBackImage: string;
		idFrontImage: string;
		description: string;
		id: number;
		uuid: string;
		status: number;
	};
	description: string;
	apartmentUu: {
		name: string;
		apartmentTypeUu: {
			uuid: string;
			code: string;
			name: string;
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

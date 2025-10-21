export interface PropsRequestViewApartment {}

export interface IApartmentVisit {
	userUu: {
		name: string;
		identityNumber: number;
		profileImage: number;
		phoneNumber: string;
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
	status: number;
	uuid: string;
}

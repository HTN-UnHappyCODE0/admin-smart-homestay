export interface PropsFormUpdateEmployeeProfile {
	onClose: () => void;
}

export interface IStaffDetail {
	code: string;
	name: string;
	phoneNumber: string;
	numApartment: number;
	email: string;
	userName: string;
	type: number;
	description: string;
	apartmentManagerUus: {
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
	}[];
	id: number;
	uuid: string;
	status: number;
}

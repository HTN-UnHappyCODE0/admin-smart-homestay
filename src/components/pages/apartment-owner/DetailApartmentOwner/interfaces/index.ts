export interface PropsDetailApartmentOwner {
	onClose: () => void;
}

export interface IDetailApartmentOwner {
	bankInfos: {
		bankName: string;
		bankNumber: string;
		bankAccount: string;
	}[];
	apartmentOwnerUus: IApartmentOwner[];
	name: string;
	numApartment: number;
	phoneNumber: string;
	description: string | null;
	id: number;
	uuid: string;
	status: number;
}

export interface IApartmentOwner {
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

export interface PropsInfoApartment {}

export interface IDetailInfoApartment {
	lock: {
		uuid: string;
		code: string;
		name: string;
	};
	managerUu: {
		bankNumber: string;
		bankName: string;
		phoneNumber: string;
		uuid: string;
		code: number;
		name: string;
	};
	ownerUu: {
		bankNumber: string;
		bankName: string;
		phoneNumber: number;
		uuid: string;
		code: number;
		name: string;
	};
	numVisitRequest: number;
	numIncidentRequest: number;
	maxPeople: number;
	rentPrice: number;
	adPrice: number;
	meters: {
		meterUu: {
			serialNumber: string;
			uuid: string;
			code: string;
			name: string;
		};
		meterTypeUu: {
			type: number;
			uuid: string;
			code: string;
			name: string;
		};
		currentValue: number;
		initialValue: number;
		onState: number;
		description: number;
		id: number;
		uuid: string;
		status: number;
	}[];
	apartmentRooms: {
		item: {
			uuid: string;
			code: string;
			name: string;
		};
		count: number;
		description: string;
		serialNumber: number;
		id: number;
		uuid: string;
		status: number;
	}[];
	apartmentFurnitures: {
		item: {
			uuid: string;
			code: string;
			name: string;
		};
		count: number;
		description: string;
		serialNumber: number;
		id: number;
		uuid: string;
		status: number;
	}[];
	description: string;
	attachments: string[];
	state: number;
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
}

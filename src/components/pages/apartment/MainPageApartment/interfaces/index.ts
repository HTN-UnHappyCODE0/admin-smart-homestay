export interface PropsMainPageApartment {}

export interface IApartment {
	lock: {
		uuid: string;
		code: string;
		name: string;
		id: number;
		status: number;
	};
	numChild: number;
	children: [];
	inverseParentUu: null;
	managerUu: {
		bankNumber: string;
		bankName: string;
		phoneNumber: string;
		id: number;
		status: number;
		uuid: string;
		code: string;
		name: string;
	};
	numVisitRequest: number;
	numIncidentRequest: number;
	maxPeople: number;
	rentPrice: number;
	adPrice: number;
	meters: {
		meterUu: {
			name: string;
			serialNumber: string;
			installedDate: string;
			isOnline: boolean;
			onState: number;
			id: number;
			uuid: string;
			status: number;
		};
		meterTypeUu: {
			type: number;
			code: string;
			name: string;
			id: number;
			uuid: string;
			status: number;
		};
		currentValue: number;
		initialValue: number;
		description: string;
		id: number;
		uuid: string;
		status: number;
	}[];
	description: string;
	attachments: string[];
	apartmentTypeUu: {
		code: string;
		name: string;
		id: number;
		uuid: string;
		status: number;
	};
	name: string;
	apartmentSize: number;
	numFloor: number;
	ownerUu: {
		bankNumber: string;
		bankName: string;
		phoneNumber: string;
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
	id: number;
	uuid: string;
	status: number;
	state: number;
}

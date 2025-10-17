export interface PropsMainInfoApartment {}

export interface IDetailInfoApartment {
	contract: {
		code: number;
		userSignUu: {
			uuid: string;
			code: number;
			name: string;
		};
		numPerson: number;
		userContracts: {
			userUu: {
				uuid: string;
				code: string;
				name: string;
			};
			deviceId: string;
			description: string;
			type: number;
			hasResidenceRegistered: number;
		}[];
		contractServicePrices: {
			serviceUu: {
				uuid: string;
				code: string;
				name: string;
			};
			apartmentMeterUu: number;
			price: number;
			paymentCycle: number;
			type: number;
		}[];
		deposit: number;
		price: number;
		from: string;
		to: string;
		id: number;
		uuid: string;
		status: number;
	};
	apartmentRooms: {
		item: string;
		count: number;
		description: string;
		serialNumber: number;
		id: number;
		uuid: string;
		status: number;
	}[];
	apartmentFurnitures: [
		{
			item: string;
			count: number;
			description: string;
			serialNumber: number;
			id: number;
			uuid: string;
			status: number;
		}
	];
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
	waterMeter: {
		serialNumber: number;
		type: number;
		currentValue: number;
		initialValue: number;
		onState: number;
		description: number;
		id: number;
		uuid: string;
		status: number;
	};
	electricMeter: {
		serialNumber: number;
		type: number;
		currentValue: number;
		initialValue: number;
		onState: number;
		description: number;
		id: number;
		uuid: string;
		status: number;
	};
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

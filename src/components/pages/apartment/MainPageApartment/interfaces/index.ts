export interface PropsMainPageApartment {}

export interface IApartment {
	managerUu: {
		uuid: string;
		code: string;
		name: string;
	};
	ownerUu: null;
	lock: {
		uuid: string;
		code: string;
		name: string;
	};
	numVisitRequest: number;
	numIncidentRequest: number;
	maxPeople: number;
	rentPrice: number;
	adPrices: number;
	// adPrices: {
	// 	serviceUu: {
	// 		name: string;
	// 		description: string;
	// 		state: number;
	// 		type: number;
	// 		id: number;
	// 		uuid: string;
	// 		status: number;
	// 	};
	// 	price: number;
	// 	paymentCycle: number;
	// 	type: number;
	// }[];
	apartmentMeters: {
		serialNumber: string;
		type: number;
		value: number;
		onState: number;
		id: number;
		uuid: string;
		status: number;
	}[];
	description: string;
	attachments: string[];
	apartmentTypeUu: {
		uuid: string;
		code: string;
		name: string;
	};
	name: string;
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
	state: number;
	status: number;
}

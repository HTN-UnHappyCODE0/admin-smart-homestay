export interface PropsMainAdvertisement {}

export interface IAdvertisement {
	code: null;
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
	userPostUu: {
		code: string;
		name: string;
		id: number;
		uuid: string;
		status: number;
	};
	adPrices: {
		serviceUu: {
			name: string;
			description: string;
			state: number;
			type: number;
			id: number;
			uuid: string;
			status: number;
		};
		price: number;
		paymentCycle: number;
		type: number;
	}[];
	title: string;
	price: number;
	deposit: number;
	images: string[];
	phoneNumber: number;
	startDate: string;
	expireDate: string;
	description: string;
	id: number;
	state: number;
	uuid: string;
	status: number;
}

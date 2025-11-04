export interface PropsMainAdvertisement {}

export interface IAdvertisement {
	code: string;
	apartmentUu: {
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
	};
	userPostUu: {
		code: string;
		name: string;
		id: number;
		uuid: string;
		status: number;
	};
	adWaterInfo: {
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
	};
	adElectricInfo: {
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
	};
	title: string;
	price: number;
	deposit: number;
	images: string[];
	phoneNumber: string;
	startDate: string;
	expireDate: string;
	description: string;
	state: number;
	id: number;
	uuid: string;
	status: number;
}

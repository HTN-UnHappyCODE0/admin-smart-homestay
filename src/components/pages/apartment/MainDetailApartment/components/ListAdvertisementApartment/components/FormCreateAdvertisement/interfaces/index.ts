export interface PropsFormCreateAdvertisement {
	onClose?: () => void;
}

export interface IRoom {
	assetUuid: string;
	name: string;
	count: string;
	description: string;
}

export interface IFurniture {
	assetUuid: string;
	name: string;
	count: string;
	description: string;
}

export interface IFormCreateAdvertisement {
	title: string;
	apartmentUuid: string;
	apartmentTypeUu: string;
	address: string;
	apartmentSize: string;
	deposit: number;
	price: number;
	images: string[];
	adPrices: {
		serviceUuid: string;
		price: number;
		paymentCycle: number;
		type: number;
	}[];
	startDate: string;
	expireDate: string;
	description: string;
	rooms: IRoom[];
	furnitures: IFurniture[];
}

export interface IMeterApartment {
	meterUu: {
		uuid: string;
		serialNumber: string;
		code: string;
		name: string;
	};
	meterTypeUu: {
		uuid: string;
		code: string;
		name: string;
	};
	currentValue: number;
	initialValue: number;
	onState: number;
	description: string;
	id: number;
	uuid: string;
	status: number;
}

export interface IDetailApartmentForUpdate {
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
		code: string;
		name: string;
	};
	ownerUu: {
		bankNumber: string;
		bankName: string;
		phoneNumber: string;
		uuid: string;
		code: string;
		name: string;
	};
	numVisitRequest: number;
	numIncidentRequest: number;
	maxPeople: number;
	rentPrice: number;
	adPrice: number;
	meters: IMeterApartment[];
	apartmentRooms: {
		item: {
			uuid: string;
			code: string;
			name: string;
		};
		count: number;
		description: string;
		serialNumber: string;
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
		serialNumber: string;
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

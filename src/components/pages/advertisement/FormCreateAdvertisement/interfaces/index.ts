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

export interface IAdvPrice {
	serviceUuid: string;
	price: number;
	paymentCycle: number;
	type: number;
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
	startDate: string;
	expireDate: string;
	description: string;
	rooms: IRoom[];
	furnitures: IFurniture[];

	advPrices: IAdvPrice[];
	electricPrice: number;
	waterPrice: number;
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
		code: string;
		name: string;
		id: number;
		uuid: string;
		status: number;
	};
	managerUu: {
		bankNumber: string;
		bankName: string;
		phoneNumber: string;
		code: number;
		name: string;
		id: number;
		uuid: string;
		status: number;
	};
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
	numVisitRequest: number;
	numIncidentRequest: number;
	maxPeople: number;
	rentPrice: number;
	adPrice: number;
	meters: {
		meterUu: {
			serialNumber: string;
			installedDate: string;
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
		onState: number;
		description: string;
		id: number;
		uuid: string;
		status: number;
	}[];
	apartmentRooms: {
		room: {
			code: string;
			name: string;
			id: number;
			uuid: string;
			status: number;
		};
		roomFurnitures: {
			furnitureUu: {
				code: string;
				name: string;
				id: number;
				uuid: string;
				status: number;
			};
			count: number;
			id: number;
			uuid: string;
			status: number;
		}[];
		name: string;
		description: string;
		floor: number;
		id: number;
		uuid: string;
		status: number;
	}[];
	description: string;
	attachments: string[];
	state: number;
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
}

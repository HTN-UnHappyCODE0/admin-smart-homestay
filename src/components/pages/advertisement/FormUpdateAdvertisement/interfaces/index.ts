export interface PropsFormUpdateAdvertisement {
	onClose?: () => void;
}

export interface IDetailAdvertisement {
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
		code: number;
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
	childAds: {
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

export interface IServices {
	name: string;
	description: string;
	state: number;
	type: number;
	id: number;
	uuid: string;
	status: number;
}

export interface IFormUpdateAdvertisement {
	title: string;
	apartmentUuid: string;
	apartmentTypeUu?: string;
	address?: string;
	apartmentSize?: string | number;
	deposit: number | string;
	price: number | string;
	startDate: string;
	expireDate: string;
	description: string;
	rooms: IRoom[];
	furnitures: IFurniture[];
	electricPrice: number | string;
	waterPrice: number | string;
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
	roomTypeGroups: {
		roomUu: {
			code: string;
			name: string;
			id: number;
			uuid: string;
			status: number;
		};
		count: number;
	}[];
	furnitureTypeGroups: {
		furnitureUu: {
			code: string;
			name: string;
			id: number;
			uuid: string;
			status: number;
		};
		count: number;
	}[];
	lock: {
		code: string;
		name: string;
		id: number;
		uuid: string;
		status: number;
	};
	numChild: number;
	children: [];
	inverseParentUu: number;
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
			type: null;
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
	state: number;
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
}

export interface PropsInfoApartment {}

export interface IDetailInfoApartment {
	apartmentRooms: [
		{
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
		}
	];
	roomTypeGroups: {
		roomTypeUu: {
			code: string;
			name: string;
			id: number;
			uuid: string;
			status: number;
		};
		count: 1;
	}[];
	furnitureTypeGroups: {
		furnitureTypeUu: {
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
	children: {
		ownerUu: {
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
		code: string;
		name: string;
		id: number;
		uuid: string;
		status: number;
	}[];
	inverseParentUu: {
		ownerUu: {
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
	numVisitRequest: number;
	numIncidentRequest: number;
	maxPeople: number;
	rentPrice: number;
	adPrice: number;
	meters: [
		{
			meterUu: {
				name: string;
				serialNumber: string;
				installedDate: string;
				isOnline: boolean;
				onState: number;
				id: string;
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
			id: string;
			uuid: string;
			status: string;
		}
	];
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

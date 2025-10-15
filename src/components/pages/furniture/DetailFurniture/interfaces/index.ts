export interface PropsDetailFurniture {
	onClose: () => void;
}

export interface IListoffurnishedapartments {
	apartmentUu: {
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
		uuid: string;
		code: string;
		name: string;
	};
	count: number;
	lastAdded: string;
	id: number;
	uuid: string;
	status: number;
}

export interface IDetailFurniture {
	name: string;
	description: string;
	lastAdded: string;
	using: number;
	id: number;
	uuid: string;
	status: number;
}

export interface PropsMainHistoryUnlock {
	onClose: () => void;
}

export interface IHistoryUnlock {
	id: number;
	uuid: string;
	status: number;
	lock: {
		id: number;
		uuid: string;
		status: number;
		code: string;
		password: string;
		state: number;
		description: string;
		apartmentUu: {
			id: number;
			uuid: string;
			status: number;
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
		};
	};
	apartment: {
		id: number;
		uuid: string;
		status: number;
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
	};
	user: {
		id: number;
		uuid: string;
		status: number;
		code: string;
		name: string;
		type: number;
	};
	type: number;
	created: string;
}

export interface IDetailLock {
	code: string;
	password: string;
	state: number;
	description: string;
	apartmentUu: {
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
	};
	id: number;
	uuid: string;
	status: number;
}

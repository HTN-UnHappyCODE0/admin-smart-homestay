export interface PropsDetailRequestRepairApartment {
	onClose: () => void;
}

export interface IDetailRequestRepair {
	code: string;
	userReportUu: {
		uuid: string;
		code: number;
		name: string;
		email: string;
		phoneNumber: string;
		id: number;
		status: number;
	};
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
	resolveInfo: {
		resolveDate: string;
		price: number;
		userResolveUu: {
			uuid: string;
			code: number;
			name: string;
		};
		documents: string[];
		description: number;
	};
	reportDate: string;
	reason: string;
	images: string[];
	id: number;
	uuid: string;
	status: number;
}

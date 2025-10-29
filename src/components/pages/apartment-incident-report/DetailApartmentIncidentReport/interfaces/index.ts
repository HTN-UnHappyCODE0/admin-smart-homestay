export interface PropsDetailApartmentIncidentReport {
	onClose?: () => void;
}

export interface IDetailIncidentReport {
	code: string;
	userReportUu: {
		bankNumber: string;
		bankName: string;
		phoneNumber: string;
		code: string;
		name: string;
		id: number;
		uuid: string;
		status: number;
	};
	apartmentUu: {
		ownerUu: number;
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
	reportDate: string;
	reason: string;
	images: string[];
	resolveInfo: {
		resolveDate: string;
		price: number;
		userResolveUu: {
			code: number;
			name: string;
			id: number;
			uuid: string;
			status: number;
		};
		documents: string[];
		description: string;
	};
	id: number;
	uuid: string;
	status: number;
}

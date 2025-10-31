export interface PropsMainElectricWater {}

export interface IMeter {
	serialNumber: string;
	meterTypeUu: {
		type: number;
		name: string;
		description: string;
		id: number;
		uuid: string;
		status: number;
	};
	installedDate: string;
	userInstallUu: number;
	apartment: {
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
	id: number;
	uuid: string;
	status: number;
}

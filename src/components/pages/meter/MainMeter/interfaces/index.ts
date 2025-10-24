export interface PropsMainMeter {}

export interface IMeter {
	name: string;
	serialNumber: string;
	meterTypeUu: {
		code: string;
		name: string;
		id: number;
		uuid: string;
		status: number;
	};
	installedDate: string;
	userInstallUu: null;
	apartment: {
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

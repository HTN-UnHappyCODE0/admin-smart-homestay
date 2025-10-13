export interface PropsMainLocks {}

export interface ILock {
	code: string;
	password: string;
	apartmentUu: {
		apartmentTypeUu: {
			uuid: string;
			code: string;
			name: string;
		};
		name: string;
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

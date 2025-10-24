export interface PropsListMeterApartment {}

export interface IListMeterApartment {
	meterUu: {
		userInstallUu: string;
		serialNumber: string;
		installedDate: string;
		code: string;
		name: string;
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
	onState: number;
	description: string;
	id: number;
	uuid: string;
	status: number;
}

export interface PropsRequestRepairApartment {}

export interface IIncidentApartment {
	code: string;
	userReportUu: {
		code: string;
		name: string;
		id: number;
		uuid: string;
		status: number;
	};
	apartmentUu: {
		code: string;
		name: string;
		id: number;
		uuid: string;
		status: number;
	};
	reportDate: string;
	reason: string;
	userResolveUu: {
		code: string;
		name: string;
		id: number;
		uuid: string;
		status: number;
	};
	resolveDate: string;
	description: string;
	images: string[];
	id: number;
	uuid: string;
	status: number;
}

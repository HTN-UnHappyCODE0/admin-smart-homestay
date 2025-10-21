export interface PropsMainRequestRepairApartment {}

export interface IIncidentApartment {
	userReportUu: {
		uuid: string;
		code: number;
		name: string;
	};
	apartmentUu: {
		uuid: string;
		code: string;
		name: string;
	};
	reportDate: string;
	reason: string;
	userResolveUu: number;
	resolveDate: number;
	description: number;
	images: string[];
	id: number;
	uuid: string;
	status: number;
}

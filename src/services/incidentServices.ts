import axiosClient from '.';

const incidentServices = {
	getIncidentReports: (
		data: {
			keyword: string;
			isPaging: number;
			pageSize: number;
			page: number;
			typeFinding: number | null;
			status: number | null;
			userUuid: string;
			apartmentUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Incident/get-incident-reports`, data, {
			cancelToken: tokenAxios,
		});
	},

	detailIncidentReport: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Incident/detail-incident-report`, data, {
			cancelToken: tokenAxios,
		});
	},

	changeStatusIncidentReport: (
		data: {
			reportUuid: string;
			userResolveUuid: string;
			resolveDate: string;
			price: number;
			images: string[];
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Incident/change-status-incident-report`, data, {
			cancelToken: tokenAxios,
		});
	},

	acceptOrRejectIncident: (data: {uuid: string; status: number | null; description: string}, tokenAxios?: any) => {
		return axiosClient.post(`/Incident/accept-or-reject-incident`, data, {
			cancelToken: tokenAxios,
		});
	},

	finishIncident: (
		data: {
			reportUuid: string;
			resolveDate: string;
			price: number | null;
			images: string[];
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Incident/finish-incident`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default incidentServices;

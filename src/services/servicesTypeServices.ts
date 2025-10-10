import axiosClient from '.';

const servicesTypeServices = {
	listServicesType: (
		data: {
			isPaging: number;
			typeFinding: number;
			keyword: string;
			page: number;
			pageSize: number;
			status: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Service/get-services`, data, {
			cancelToken: tokenAxios,
		});
	},
	changeStatusServicesType: (
		data: {
			uuid: string;
			status: number;
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Service/change-status`, data, {
			cancelToken: tokenAxios,
		});
	},
	createServicesType: (
		data: {
			name: string;
			description: string;
			state: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Service/create-service`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default servicesTypeServices;

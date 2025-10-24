import axiosClient from '.';

const meterTypeServices = {
	listMeterType: (
		data: {
			keyword: string;
			isPaging: number;
			pageSize: number;
			page: number;
			typeFinding: number | null;
			status: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/MeterType/list-meter-types`, data, {
			cancelToken: tokenAxios,
		});
	},
	changeStatusMeterType: (
		data: {
			uuid: string;
			status: number;
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/MeterType/change-status`, data, {
			cancelToken: tokenAxios,
		});
	},
	createMeterType: (
		data: {
			name: string;
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/MeterType/create`, data, {
			cancelToken: tokenAxios,
		});
	},
	updateMeterType: (
		data: {
			name: string;
			description: string;
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/MeterType/update`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailMeterType: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/MeterType/detail`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default meterTypeServices;

import axiosClient from '.';

const meterServices = {
	listmeter: (
		data: {
			keyword: string;
			isPaging: number;
			pageSize: number;
			page: number;
			typeFinding: number | null;
			status: number | null;
			installDateFrom: string | null;
			installDateTo: string | null;
			isUsed: number | null;
			meterTypeUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Meter/list-meters`, data, {
			cancelToken: tokenAxios,
		});
	},
	createMeter: (
		data: {
			meterType: string;
			serialNumber: string;
			apartmentUuid: string;
			userInstallUuid: string;
			installedDate: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Meter/create-meter`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default meterServices;

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
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Meter/list-meters`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default meterServices;

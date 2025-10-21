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
};

export default meterTypeServices;

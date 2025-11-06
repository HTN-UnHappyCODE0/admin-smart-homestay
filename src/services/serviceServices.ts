import axiosClient from '.';

const serviceServices = {
	getServices: (
		data: {
			keyword: string;
			isPaging: number;
			pageSize: number;
			page: number;
			typeFinding: number | null;
			state: number | null;
			status: number | null;
			type: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Service/get-services`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default serviceServices;

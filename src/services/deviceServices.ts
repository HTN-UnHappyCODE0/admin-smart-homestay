import axiosClient from '.';

const deviceServices = {
	getListDevices: (
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
		return axiosClient.post(`/Device/get-list-devices`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default deviceServices;

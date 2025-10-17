import axiosClient from '.';

const provinceServiecs = {
	listProvince: (
		data: {
			keyword: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Province/get-list-province`, data, {
			cancelToken: tokenAxios,
		});
	},
	listWard: (
		data: {
			keyword: string;
			provinceCode: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Province/get-list-ward`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default provinceServiecs;

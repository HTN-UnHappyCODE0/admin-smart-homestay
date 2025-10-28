import axiosClient from '.';

const contractServices = {
	getListContracts: (
		data: {
			keyword: string;
			isPaging: number;
			pageSize: number;
			page: number;
			typeFinding: number | null;
			status: number | null;
			apartmentUuid: string;
			renterUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contract/get-list-contracts`, data, {
			cancelToken: tokenAxios,
		});
	},
	getUserContract: (
		data: {
			keyword: string;
			isPaging: number;
			pageSize: number;
			page: number;
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contract/get-user-contract`, data, {
			cancelToken: tokenAxios,
		});
	},
	getCurrentContract: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Contract/get-current-contract`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default contractServices;

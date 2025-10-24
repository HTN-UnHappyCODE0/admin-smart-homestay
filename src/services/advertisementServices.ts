import axiosClient from '.';

const advertisementServices = {
	getListAdvertisement: (
		data: {
			keyword: string;
			isPaging: number;
			pageSize: number;
			page: number;
			typeFinding: number | null;
			state: number | null;
			status: number | null;
			provinceId: string;
			wardId: string;
			adCode: string;
			apartmentCode: string;
			address: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Advertisement/get-list-advertisement`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default advertisementServices;

import axiosClient from '.';

const advertisementServices = {
	getListPagedAdvertisement: (
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
			apartmentUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Advertisement/get-list-paged-advertisement`, data, {
			cancelToken: tokenAxios,
		});
	},
	getListCatalogAdvertisement: (
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
			apartmentUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Advertisement/get-list-catalog-advertisement`, data, {
			cancelToken: tokenAxios,
		});
	},
	createAdvertisement: (
		data: {
			apartmentUuid: string;
			title: string;
			deposit: number;
			price: number;
			images: string[];
			advPrices: {
				serviceUuid: string;
				price: number;
				paymentCycle: number;
				type: number;
			}[];
			phoneNumber: string;
			startDate: string;
			expireDate: string;
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Advertisement/create-advertisement`, data, {
			cancelToken: tokenAxios,
		});
	},
	changeStateAdvertisement: (
		data: {
			uuid: string;
			state: number;
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Advertisement/change-state-advertisement`, data, {
			cancelToken: tokenAxios,
		});
	},
	getAdvertisementByUuid: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Advertisement/get-advertisement-by-uuid`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default advertisementServices;

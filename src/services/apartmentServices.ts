import axiosClient from '.';

const apartmentServices = {
	getListApartments: (
		data: {
			keyword: string;
			isPaging: number;
			pageSize: number;
			page: number;
			typeFinding: number | null;
			state: number | null;
			status: number | null;
			sizeFrom: number | null;
			sizeTo: number | null;
			province: string;
			ward: string;
			hasWaterMeter: number | null;
			hasElectricMeter: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Apartment/get-list-apartments`, data, {
			cancelToken: tokenAxios,
		});
	},
	changeStatus: (data: {uuid: string; status: number; description: string}, tokenAxios?: any) => {
		return axiosClient.post(`/Apartment/change-status`, data, {
			cancelToken: tokenAxios,
		});
	},
	createApartment: (
		data: {
			apartmentTypeUuid: string;
			lockUuid: string;
			ownerUuid: string;
			managerUuid: string;
			name: string;
			provinceId: string;
			wardId: string;
			address: string;
			apartmentSize: number;
			rooms: {
				assetUuid: string;
				count: number;
				description: string;
			}[];
			furnitures: {
				assetUuid: string;
				count: number;
				description: string;
			}[];
			meters: string[];
			attachments: string[];
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Apartment/create-apartment`, data, {
			cancelToken: tokenAxios,
		});
	},
	updateApartment: (
		data: {
			uuid: string;
			apartmentTypeUuid: string;
			lockUuid: string;
			ownerUuid: string;
			managerUuid: string;
			name: string;
			provinceId: string;
			wardId: string;
			address: string;
			apartmentSize: number;
			rooms: {
				assetUuid: string;
				count: number;
				description: string;
			}[];
			furnitures: {
				assetUuid: string;
				count: number;
				description: string;
			}[];
			meters: string[];
			attachments: string[];
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Apartment/update-apartment`, data, {
			cancelToken: tokenAxios,
		});
	},
	getApartmentDetail: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Apartment/get-apartment-detailed`, data, {
			cancelToken: tokenAxios,
		});
	},
	apartmentDetail: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Apartment/get-apartment-detailed`, data, {
			cancelToken: tokenAxios,
		});
	},
	changeStateMeter: (
		data: {
			apartmentMeterUuid: string;
			state: boolean;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Apartment/change-state-meter`, data, {
			cancelToken: tokenAxios,
		});
	},
	requestSummary: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Apartment/request-summary`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default apartmentServices;

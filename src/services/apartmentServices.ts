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
			meters: {
				meterUuid: string;
				serialNumber: string;
			}[];
			attachments: string[];
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Apartment/create-apartment`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default apartmentServices;

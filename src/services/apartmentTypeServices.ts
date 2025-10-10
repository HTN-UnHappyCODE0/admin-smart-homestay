import axiosClient from '.';

const apartmentTypeServices = {
	listApartmentType: (
		data: {
			isPaging: number;
			typeFinding: number;
			keyword: string;
			page: number;
			pageSize: number;
			status: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ApartmentType/get-list-apartment-type`, data, {
			cancelToken: tokenAxios,
		});
	},
	changeStatusApartmentType: (
		data: {
			uuid: string;
			status: number;
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ApartmentType/change-apartment-type-status`, data, {
			cancelToken: tokenAxios,
		});
	},
	createApartmentType: (
		data: {
			name: string;
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ApartmentType/create-apartment-type`, data, {
			cancelToken: tokenAxios,
		});
	},
	detailApartmentType: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ApartmentType/apartment-type-detail`, data, {
			cancelToken: tokenAxios,
		});
	},
	updateApartmentType: (
		data: {
			name: string;
			description: string;
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ApartmentType/update-apartment-type`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default apartmentTypeServices;

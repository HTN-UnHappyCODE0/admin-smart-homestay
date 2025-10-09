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
};

export default apartmentTypeServices;

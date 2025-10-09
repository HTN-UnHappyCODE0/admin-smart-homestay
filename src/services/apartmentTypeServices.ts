import axiosClient from '.';

const apartmentTypeServices = {
	getListApartmentType: (
		data: {
			keyword: string;
			status: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ApartmentType/get-list-apartment-type`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default apartmentTypeServices;

import axiosClient from '.';

const apartmentTypeServices = {
	getListApartmentType: (data: {}, tokenAxios?: any) => {
		return axiosClient.post(`/ApartmentType/get-list-apartment-type`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default apartmentTypeServices;

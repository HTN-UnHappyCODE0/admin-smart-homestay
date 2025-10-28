import axiosClient from '.';

const guestTenantServices = {
	getListGuests: (
		data: {
			keyword: string;
			isPaging: number;
			pageSize: number;
			page: number;
			typeFinding: number | null;
			status: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Guest/get-list-guests`, data, {
			cancelToken: tokenAxios,
		});
	},
	getDetailGuest: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Guest/get-detail-guest`, data, {
			cancelToken: tokenAxios,
		});
	},
	updateGuest: (
		data: {
			uuid: string;
			name: string;
			phoneNumber: string;
			email: string;
			identityNumber: string;
			issuedDate: string;
			issuedPlace: string;
			idBackImage: string;
			idFrontImage: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Guest/update-guest`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default guestTenantServices;

import axiosClient from '.';

const userServices = {
	getCurrentUser: (data: {}, tokenAxios?: any) => {
		return axiosClient.post(`/User/get-current-user`, data, {
			cancelToken: tokenAxios,
		});
	},

	getUsers: (
		data: {
			keyword: string;
			isPaging: number;
			page: number;
			pageSize: number;
			typeFinding: number;
			hasRented: number | null;
			status: number | null;
			userUuid: string;
			type: number[] | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/User/get-users`, data, {
			cancelToken: tokenAxios,
		});
	},

	getApartmentOwners: (
		data: {
			keyword: string;
			isPaging: number;
			page: number;
			pageSize: number;
			typeFinding: number;
			hasRented: number | null;
			status: number | null;
			userUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/User/get-apartment-owners`, data, {
			cancelToken: tokenAxios,
		});
	},

	getApartmentOwnersDetail: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/User/get-apartment-owners-detail`, data, {
			cancelToken: tokenAxios,
		});
	},

	createUser: (
		data: {
			managerUuid: string;
			name: string | null;
			email: string | null;
			username: string | null;
			password: string | null;
			phoneNumber: string | null;
			profileImage: string | null;
			birthDate: string | null;
			gender: number | null;
			identityNumber: string | null;
			provinceId: string | null;
			wardId: string | null;
			address: string | null;
			description: string;
			bankName: string | null;
			bankNumber: string | null;
			bankAccount: string | null;
			type: number[] | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/User/create-user`, data, {
			cancelToken: tokenAxios,
		});
	},

	changeStatus: (
		data: {
			uuid: string;
			status: number;
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/User/change-status`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default userServices;

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
			status: number | null;
			typeFinding: number;
			hasRented: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/User/get-users`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default userServices;

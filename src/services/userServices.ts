import axiosClient from '.';

const userServices = {
	getCurrentUser: (data: {}, tokenAxios?: any) => {
		return axiosClient.post(`/User/get-current-user`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default userServices;

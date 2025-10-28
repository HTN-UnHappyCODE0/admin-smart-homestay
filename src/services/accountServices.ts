import axiosClient from '.';

const accountServices = {
	superResetPassword: (
		data: {
			newPassword: string;
			confirmNewPassword: string;
			userUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Account/super-reset-password`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default accountServices;

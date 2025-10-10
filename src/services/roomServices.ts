import axiosClient from '.';

const roomServices = {
	listRoom: (
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
		return axiosClient.post(`/Room/get-list-rooms`, data, {
			cancelToken: tokenAxios,
		});
	},
	changeStatusRoom: (
		data: {
			uuid: string;
			status: number;
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Room/change-room-status`, data, {
			cancelToken: tokenAxios,
		});
	},
	createRoom: (
		data: {
			name: string;
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Room/create-room`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default roomServices;

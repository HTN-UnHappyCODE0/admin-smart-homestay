import axiosClient from '.';

const lockServices = {
	listLock: (
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
		return axiosClient.post(`/Lock/get-list-lock`, data, {
			cancelToken: tokenAxios,
		});
	},
	resetUserPassword: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Lock/reset-user-password`, data, {
			cancelToken: tokenAxios,
		});
	},
	changeDefaultPassword: (
		data: {
			lockUuid: string;
			oldPassword: string;
			newPassword: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Lock/change-default-password`, data, {
			cancelToken: tokenAxios,
		});
	},
	createLock: (
		data: {
			serialNumber: string;
			apartmentUuid: string;
			defaultPassword: string;
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Lock/create-lock`, data, {
			cancelToken: tokenAxios,
		});
	},
	getDetailLock: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Lock/get-detail-lock`, data, {
			cancelToken: tokenAxios,
		});
	},
	getLockHistory: (
		data: {
			keyword: string;
			isPaging: number;
			page: number;
			pageSize: number;
			lockUuid: string;
			type: number | null;
			startTime: string | null;
			endTime: string | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Lock/get-lock-history`, data, {
			cancelToken: tokenAxios,
		});
	},
	listActiveLock: (
		data: {
			keyword: string;
			isPaging: number;
			page: number;
			pageSize: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Lock/get-list-active-lock`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default lockServices;

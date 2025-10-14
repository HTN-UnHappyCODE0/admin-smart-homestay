import axiosClient from '.';

const unlockHistoryServices = {
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
};

export default unlockHistoryServices;

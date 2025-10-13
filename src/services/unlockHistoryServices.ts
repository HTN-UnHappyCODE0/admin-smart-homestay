import axiosClient from '.';

const unlockHistoryServices = {
	getListUnlockHistory: (
		data: {
			keyword: string;
			isPaging: number;
			pageSize: number;
			page: number;
			typeFinding: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/UnlockHistory/get-list-unlock-history`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default unlockHistoryServices;

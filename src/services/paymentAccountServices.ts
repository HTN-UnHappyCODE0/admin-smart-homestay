import axiosClient from '.';

const paymentAccountServices = {
	getListBankPayment: (
		data: {
			keyword: string;
			isPaging: number;
			page: number;
			pageSize: number;
			status: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BankPayment/get-list-bank-payment`, data, {
			cancelToken: tokenAxios,
		});
	},
	updateStatus: (
		data: {
			uuid: string;
			status: number;
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BankPayment/update-status`, data, {
			cancelToken: tokenAxios,
		});
	},
	createBankPayment: (
		data: {
			userUuid: string;
			bankName: string;
			bankNumber: string;
			bankAccount: string;
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BankPayment/create-bank-payment`, data, {
			cancelToken: tokenAxios,
		});
	},
	getListBank: (
		data: {
			keyword: string;
			isPaging: number;
			page: number;
			pageSize: number;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BankPayment/get-list-bank`, data, {
			cancelToken: tokenAxios,
		});
	},
	getBankPaymentDetail: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BankPayment/get-bank-payment-detail`, data, {
			cancelToken: tokenAxios,
		});
	},
	updateBankPayment: (
		data: {
			uuid: string;
			userUuid: string;
			bankName: string;
			bankNumber: string;
			bankAccount: string;
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/BankPayment/update-bank-payment`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default paymentAccountServices;

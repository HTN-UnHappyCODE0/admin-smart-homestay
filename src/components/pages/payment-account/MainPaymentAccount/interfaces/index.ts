export interface PropsMainPaymentAccount {}

export interface IPaymentAccount {
	bankName: string;
	bankNumber: string;
	bankAccount: string;
	description: string;
	userUu: {
		code: string;
		name: string;
		id: number;
		uuid: string;
		status: number;
	};
	id: number;
	uuid: string;
	status: number;
}

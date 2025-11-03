export interface PropsDetailAdvertisement {
	onClose?: () => void;
}

export interface IDetailAdvertisement {
	code: string;
	apartmentUu: null;
	userPostUu: null;
	adPrices: [];
	adWaterInfo: null;
	adElectricInfo: null;
	title: string;
	price: number;
	deposit: number;
	images: string[];
	phoneNumber: string;
	startDate: string;
	expireDate: string;
	description: string;
	state: number;
	id: number;
	uuid: string;
	status: number;
}

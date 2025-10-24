export interface PropsFormUpdateListMeter {
	onClose?: () => void;
}

export interface IMeter {
	meterTypeName: string;
	meterTypeUuid: string;
	meterUuid: string;
	meterSerialNumber: string;
	meterName: string;
	meterCode: string;
}

export interface IFormUpdateApartment {
	meters: IMeter[];
}

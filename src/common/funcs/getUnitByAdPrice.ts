import {STATE_APARTMENT_PAYMENT_TYPE} from '~/constants/config/enum';

export function getUnitByAdPrice(serviceType: number, type: number): string {
	if (serviceType === 0) return 'KW';

	if (serviceType === 1) {
		if (type === STATE_APARTMENT_PAYMENT_TYPE.MONTHLY) return 'tháng';
		if (type === STATE_APARTMENT_PAYMENT_TYPE.USAGE_BASED) return 'khối';
		if (type === STATE_APARTMENT_PAYMENT_TYPE.PERSON) return 'người';
	}

	return '';
}

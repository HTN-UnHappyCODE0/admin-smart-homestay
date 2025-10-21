import {IMeterApartment} from '~/components/pages/apartment/FormUpdateApartment/interfaces';
import {IMeter} from '../../../FormCreateApartment';

export interface PropsFormChooseMeter {
	meterApartment?: IMeterApartment[];
	loading: boolean;
	meters: IMeter[];
	setMeters: (meters: IMeter[]) => void;
}

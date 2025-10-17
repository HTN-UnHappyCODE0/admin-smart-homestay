import {IRoom} from '../../../FormCreateApartment';

export interface PropsFormChooseRoom {
	onClose: () => void;
	loading: boolean;
	rooms: IRoom[];
	setRooms: (rooms: IRoom[]) => void;
}

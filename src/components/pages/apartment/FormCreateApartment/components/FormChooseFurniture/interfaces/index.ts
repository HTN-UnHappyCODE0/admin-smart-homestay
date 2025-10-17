import {IFurniture} from '../../../FormCreateApartment';

export interface PropsFormChooseFurniture {
	onClose: () => void;
	loading: boolean;
	furnitures: IFurniture[];
	setFurnitures: (furnitures: IFurniture[]) => void;
}

import {PATH} from '.';
import {STATE_APARTMENT, STATUS_CONFIG} from './enum';

export const tabsCatalogs: {
	title: string;
	path: string;
}[] = [
	{
		title: 'Loại hình căn hộ',
		path: PATH.Catalog,
	},
	{
		title: 'Loại phòng',
		path: PATH.CatalogRoomType,
	},
	{
		title: 'Loại chi phí',
		path: PATH.CatalogCostType,
	},
];

export const statusConfigs: {
	state: number;
	text: string;
	backgroundColor?: string;
	textColor?: string;
}[] = [
	{
		state: STATUS_CONFIG.LOCKED,
		text: 'Đã khóa',
		backgroundColor: '#E03',
		textColor: '#FFF',
	},
	{
		state: STATUS_CONFIG.ACTIVE,
		text: 'Đang hoạt động',
		backgroundColor: '#17B26A',
		textColor: '#FFF',
	},
];

export const stateApartments: {
	state: number;
	text: string;
	backgroundColor?: string;
	textColor?: string;
}[] = [
	{
		state: STATE_APARTMENT.INACTIVE,
		text: 'Ngừng kinh doanh',
		backgroundColor: '#E03',
		textColor: '#FFF',
	},
	{
		state: STATE_APARTMENT.VACANT,
		text: 'Trống',
		backgroundColor: '#06AED4',
		textColor: '#FFF',
	},
	{
		state: STATE_APARTMENT.DEPOSITED,
		text: 'Đặt cọc',
		backgroundColor: '#F79009',
		textColor: '#FFF',
	},
	{
		state: STATE_APARTMENT.RENTED,
		text: 'Đang thuê',
		backgroundColor: '#17B26A',
		textColor: '#FFF',
	},
];

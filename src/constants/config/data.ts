import {PATH} from '.';
import {STATE_APARTMENT, STATE_LOCK, STATUS_CONFIG} from './enum';

export function tabsDetailApartments(uuid: string): {
	title: string;
	path: string;
	pathActive: string;
}[] {
	return [
		{
			title: 'Thông tin căn hộ',
			path: `${PATH.InfoApartment}?_uuid=${uuid}`,
			pathActive: PATH.InfoApartment,
		},
		{
			title: 'Yêu cầu xem căn hộ',
			path: `${PATH.RequestViewApartment}?_uuid=${uuid}`,
			pathActive: PATH.RequestViewApartment,
		},
		{
			title: 'Yêu cầu sửa chữa',
			path: PATH.Any,
			pathActive: PATH.Any,
		},
		{
			title: 'Danh sách phòng',
			path: PATH.Any,
			pathActive: PATH.Any,
		},
		{
			title: 'Danh sách thiết bị',
			path: PATH.Any,
			pathActive: PATH.Any,
		},
		{
			title: 'Danh sách nội thất',
			path: PATH.Any,
			pathActive: PATH.Any,
		},
		{
			title: 'Danh sách đánh giá',
			path: PATH.Any,
			pathActive: PATH.Any,
		},
		{
			title: 'Lịch sử thanh toán',
			path: PATH.Any,
			pathActive: PATH.Any,
		},
		{
			title: 'Danh sách hợp đồng',
			path: PATH.Any,
			pathActive: PATH.Any,
		},
	];
}

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

export const stateLocks: {
	state: number;
	text: string;
	backgroundColor?: string;
	textColor?: string;
}[] = [
	{
		state: STATE_LOCK.ONLINE,
		text: 'Online',
		backgroundColor: '#06AED4',
		textColor: '#FFF',
	},
	{
		state: STATE_LOCK.OFFLINE,
		text: 'Offline',
		backgroundColor: '#F79009',
		textColor: '#FFF',
	},
];

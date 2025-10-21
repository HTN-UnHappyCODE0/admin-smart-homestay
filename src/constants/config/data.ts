import {PATH} from '.';
import {
	STATE_APARTMENT,
	STATE_LOCK,
	STATUS_CONFIG,
	TYPE_LOCK,
	STATUS_FURNITURE,
	STATUS_TEMPORARILY_ABSENT,
	STATUS_CONTRACT,
	STATE_APARTMENT_VISIT,
} from './enum';

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
			title: 'Hợp đồng thuê',
			path: `${PATH.RentalContractApartment}?_uuid=${uuid}`,
			pathActive: PATH.RentalContractApartment,
		},
		{
			title: 'Yêu cầu xem căn hộ',
			path: `${PATH.RequestViewApartment}?_uuid=${uuid}`,
			pathActive: PATH.RequestViewApartment,
		},
		{
			title: 'Yêu cầu sửa chữa',
			path: `${PATH.RequestRepairApartment}?_uuid=${uuid}`,
			pathActive: PATH.RequestRepairApartment,
		},
		{
			title: 'Danh sách thiết bị',
			path: `${PATH.ListDeviceApartment}?_uuid=${uuid}`,
			pathActive: PATH.ListDeviceApartment,
		},
		{
			title: 'Danh sách quảng cáo',
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

export const statusFurniture: {
	state: number;
	text: string;
	backgroundColor?: string;
	textColor?: string;
}[] = [
	{
		state: STATUS_FURNITURE.LOCKED,
		text: 'Không sử dụng',
		backgroundColor: '#F79009',
		textColor: '#FFF',
	},
	{
		state: STATUS_FURNITURE.ACTIVE,
		text: 'Đang sử dụng',
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

// Tạm trú tạm vắng
export const statusRentalContract: {
	state: number;
	text: string;
	backgroundColor?: string;
	textColor?: string;
}[] = [
	{
		state: STATUS_TEMPORARILY_ABSENT.NO,
		text: 'Chưa có',
		backgroundColor: '#F79009',
		textColor: '#FFF',
	},
	{
		state: STATUS_TEMPORARILY_ABSENT.YES,
		text: 'Đã có',
		backgroundColor: '#17B26A',
		textColor: '#FFF',
	},
];

export const statusContract: {
	state: number;
	text: string;
}[] = [
	{
		state: STATUS_CONTRACT.OCCUPANT,
		text: 'Người ở',
	},
	{
		state: STATUS_CONTRACT.OWNER,
		text: 'Chủ hợp đồng',
	},
];

export const statusApartmentVisit: {
	state: number;
	text: string;
	backgroundColor?: string;
	textColor?: string;
}[] = [
	{
		state: STATE_APARTMENT_VISIT.CANCELED,
		text: 'Đã hủy',
		backgroundColor: '#06AED4',
		textColor: '#FFF',
	},
	{
		state: STATE_APARTMENT_VISIT.PENDING,
		text: 'Chờ duyệt',
		backgroundColor: '#F79009',
		textColor: '#FFF',
	},
	{
		state: STATE_APARTMENT_VISIT.APPROVED,
		text: 'Đã duyệt',
		backgroundColor: '#17B26A',
		textColor: '#FFF',
	},
	{
		state: STATE_APARTMENT_VISIT.OVERDUE,
		text: 'Quá hạn',
		backgroundColor: '#E03',
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

export const typeLocks: {
	state: number;
	text: string;
	backgroundColor?: string;
	textColor?: string;
}[] = [
	{
		state: TYPE_LOCK.DEVICE_PASS,
		text: 'Mở bằng mật khẩu',
		backgroundColor: '#E03',
		textColor: '#FFF',
	},
	{
		state: TYPE_LOCK.APP_PASS,
		text: 'Mở bằng app',
		backgroundColor: '#06AED4',
		textColor: '#FFF',
	},
	{
		state: TYPE_LOCK.TEMP_PASS,
		text: 'Mở bằng mã tạm thời',
		backgroundColor: '#F79009',
		textColor: '#FFF',
	},
	{
		state: TYPE_LOCK.USER_PASS,
		text: 'Mở bằng mã người dùng',
		backgroundColor: '#17B26A',
		textColor: '#FFF',
	},
];

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
	STATE_APARTMENT_INCIDENT_REPORTS,
	STATE_APARTMENT_ADVERTISEMENT,
	STATE_APARTMENT_PAYMENT_TYPE,
	STATE_SWITCH,
	STATE_ACCOUNT,
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
			path: `${PATH.ListMeterApartment}?_uuid=${uuid}`,
			pathActive: PATH.ListMeterApartment,
		},
		{
			title: 'Danh sách quảng cáo',
			path: `${PATH.ListAdvertisementApartment}?_uuid=${uuid}`,
			pathActive: PATH.ListAdvertisementApartment,
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

export const stateAccounts: {
	state: number;
	text: string;
	backgroundColor?: string;
	textColor?: string;
}[] = [
	{
		state: STATE_ACCOUNT.ISSUED,
		text: 'Đã cấp',
		backgroundColor: '#ABEFC6',
		textColor: '#333',
	},
	{
		state: STATE_ACCOUNT.NOT_ISSUE,
		text: 'Chưa cấp',
		backgroundColor: '#FEDF89',
		textColor: '#333',
	},
];

export const roleAccounts: {
	state: number;
	text: string;
	backgroundColor?: string;
	textColor?: string;
}[] = [
	{
		state: 1,
		text: 'Người dùng',
		backgroundColor: '#ABEFC6',
		textColor: '#333',
	},
	{
		state: 10,
		text: 'Chủ căn hộ',
		backgroundColor: '#FEDF89',
		textColor: '#333',
	},

	{
		state: 25,
		text: 'Nhân viên',
		backgroundColor: '#FEDF89',
		textColor: '#333',
	},
	{
		state: 50,
		text: 'Quản lý',
		backgroundColor: '#FEDF89',
		textColor: '#333',
	},
	{
		state: 100,
		text: 'Quản trị viên',
		backgroundColor: '#FEDF89',
		textColor: '#333',
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

// Yêu cầu xem căn hộ
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

// Yêu cầu sửa chữa căn hộ
export const statusApartmentIncidentReport: {
	state: number;
	text: string;
	backgroundColor?: string;
	textColor?: string;
}[] = [
	{
		state: STATE_APARTMENT_INCIDENT_REPORTS.CANCELED,
		text: 'Đã hủy',
		backgroundColor: '#E03',
		textColor: '#FFF',
	},
	{
		state: STATE_APARTMENT_INCIDENT_REPORTS.PENDING,
		text: 'Chờ xử lý',
		backgroundColor: '#F79009',
		textColor: '#FFF',
	},
	{
		state: STATE_APARTMENT_INCIDENT_REPORTS.IN_PROGRESS,
		text: 'Đã tiếp nhận/Đang xử lý',
		backgroundColor: '#06AED4',
		textColor: '#FFF',
	},
	{
		state: STATE_APARTMENT_INCIDENT_REPORTS.RESOLVED,
		text: 'Đã xử lý',
		backgroundColor: '#17B26A',
		textColor: '#FFF',
	},
];

// Quảng cáo căn hộ
export const statusApartmentAdvertisement: {
	state: number;
	text: string;
	backgroundColor?: string;
	textColor?: string;
}[] = [
	{
		state: STATE_APARTMENT_ADVERTISEMENT.DELETED,
		text: 'Đã xóa',
		backgroundColor: '#E03',
		textColor: '#FFF',
	},
	{
		state: STATE_APARTMENT_ADVERTISEMENT.PENDING,
		text: 'Chờ duyệt',
		backgroundColor: '#17B26A',
		textColor: '#FFF',
	},
	{
		state: STATE_APARTMENT_ADVERTISEMENT.POSTED,
		text: 'Đã đăng',
		backgroundColor: '#06AED4',
		textColor: '#FFF',
	},
	{
		state: STATE_APARTMENT_ADVERTISEMENT.EXPIRED,
		text: 'Hết hạn',
		backgroundColor: '#F79009',
		textColor: '#FFF',
	},
];

// Chu kì thanh toán
export const paymentTypeApartmentAdvertisement: {
	state: number;
	text: string;
}[] = [
	{
		state: STATE_APARTMENT_PAYMENT_TYPE.SELF,
		text: 'Tự thanh toán',
	},
	{
		state: STATE_APARTMENT_PAYMENT_TYPE.DEPOSIT,
		text: 'Cọc',
	},
	{
		state: STATE_APARTMENT_PAYMENT_TYPE.MONTHLY,
		text: 'Phát sinh theo tháng',
	},
	{
		state: STATE_APARTMENT_PAYMENT_TYPE.APARTMENT,
		text: 'Phát sinh theo căn hộ',
	},
	{
		state: STATE_APARTMENT_PAYMENT_TYPE.USAGE_BASED,
		text: 'Phát sinh theo lượng sử dụng',
	},
	{
		state: STATE_APARTMENT_PAYMENT_TYPE.PERSON,
		text: 'Phát sinh theo người',
	},
];

// State quảng cáo căn hộ
export const stateApartmentAdvertisement: {
	state: number;
	text: string;
}[] = [
	{
		state: STATE_SWITCH.ON,
		text: 'Hiển thị',
	},
	{
		state: STATE_SWITCH.OFF,
		text: 'Không hiển thị',
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

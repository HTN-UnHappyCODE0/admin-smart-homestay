import {Alarm, ArchiveBook, Cpu, Element3, FavoriteChart, FingerScan, Flash, House2, Lamp, Lock, NotificationFavorite} from 'iconsax-react';
import {TYPE_DATE} from './enum';

export enum PATH {
	Home = '/',
	Any = '/any',

	Login = '/auth/login',
	ForgotPassword = '/auth/forgot-password',

	Catalog = '/catalog',
}

export const Menus: {
	title: string;
	group: {
		path: string;
		pathActive: string;
		title: string;
		icon: any;
	}[];
}[] = [
	{
		title: 'Dashboard',
		group: [
			{
				title: 'Tổng quan',
				icon: Element3,
				path: PATH.Home,
				pathActive: PATH.Home,
			},
		],
	},
	{
		title: 'QUẢN LÝ DANH MỤC',
		group: [
			{
				title: 'Danh mục',
				icon: ArchiveBook,
				path: PATH.Catalog,
				pathActive: PATH.Catalog,
			},
		],
	},
	{
		title: 'QUẢN LÝ CĂN HỘ',
		group: [
			{
				title: 'Căn hộ',
				icon: House2,
				path: PATH.Any,
				pathActive: PATH.Any,
			},
			{
				title: 'Bài đăng & quảng cáo',
				icon: FavoriteChart,
				path: PATH.Any,
				pathActive: PATH.Any,
			},
			{
				title: 'Yêu cầu xem nhà',
				icon: NotificationFavorite,
				path: PATH.Any,
				pathActive: PATH.Any,
			},
			{
				title: 'Yêu cầu sửa chữa',
				icon: Alarm,
				path: PATH.Any,
				pathActive: PATH.Any,
			},
			{
				title: 'Quản lý điện nước',
				icon: Flash,
				path: PATH.Any,
				pathActive: PATH.Any,
			},
			{
				title: 'Danh sách thiết bị',
				icon: Cpu,
				path: PATH.Any,
				pathActive: PATH.Any,
			},
		],
	},
	{
		title: 'QUẢN LÝ KHÓA',
		group: [
			{
				title: 'Danh sách khóa',
				icon: Lock,
				path: PATH.Any,
				pathActive: PATH.Any,
			},
			{
				title: 'Lịch sử mở khóa',
				icon: FingerScan,
				path: PATH.Any,
				pathActive: PATH.Any,
			},
		],
	},
	{
		title: 'QUẢN LÝ NỘI THẤT',
		group: [
			{
				title: 'Danh sách nội thất',
				icon: Lamp,
				path: PATH.Any,
				pathActive: PATH.Any,
			},
		],
	},
];

export const ListOptionFilterDate: {
	name: string;
	value: number;
}[] = [
	{
		name: 'Tất cả',
		value: TYPE_DATE.ALL,
	},
	{
		name: 'Hôm nay',
		value: TYPE_DATE.TODAY,
	},
	{
		name: 'Hôm qua',
		value: TYPE_DATE.YESTERDAY,
	},
	{
		name: 'Tuần này',
		value: TYPE_DATE.THIS_WEEK,
	},
	{
		name: 'Tuần trước',
		value: TYPE_DATE.LAST_WEEK,
	},
	{
		name: '7 ngày trước',
		value: TYPE_DATE.LAST_7_DAYS,
	},
	{
		name: 'Tháng này',
		value: TYPE_DATE.THIS_MONTH,
	},
	{
		name: 'Tháng trước',
		value: TYPE_DATE.LAST_MONTH,
	},
	{
		name: 'Năm này',
		value: TYPE_DATE.THIS_YEAR,
	},
	{
		name: 'Lựa chọn',
		value: TYPE_DATE.LUA_CHON,
	},
];

export const KEY_STORE = 'admin-smart-homestay';

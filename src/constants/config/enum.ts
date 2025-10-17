export enum QUERY_KEY {
	table_apartment_type,
	table_apartment,
	table_room_type,
	table_cost_type,
	table_lock,
	table_unlock_history,
	table_device,
	table_detail_lock_history,
	table_furniture,
	table_using_department,

	detail_apartment_type,
	detail_room_type,
	detail_cost_type,
	detail_lock,
	detail_furniture,

	dropdown_apartment_type,
	dropdown_user,
	dropdown_lock,
	dropdown_province,
	dropdown_ward,

	list_room,
	list_furniture,
	list_meter,
}

export enum TYPE_DATE {
	ALL = -1,
	TODAY = 1,
	YESTERDAY = 2,
	THIS_WEEK = 3,
	LAST_WEEK = 4,
	THIS_MONTH = 5,
	LAST_MONTH = 6,
	THIS_YEAR = 7,
	LAST_7_DAYS = 8,
	LUA_CHON = 9,
}

export const COOKIE_KEY = {
	ACCESS_TOKEN: 'accessToken',
	REFRESH_TOKEN: 'refreshToken',
};

export enum CONFIG_PAGING {
	NO_PAGING,
	IS_PAGING,
}

export enum CONFIG_TYPE_FIND {
	DROPDOWN,
	TABLE,
}

export enum STATUS_CONFIG {
	LOCKED = 0,
	ACTIVE,
}

export enum STATUS_FURNITURE {
	LOCKED = 0,
	ACTIVE,
}

export enum STATE_APARTMENT {
	INACTIVE, // ngừng hoạt động
	VACANT, // trống
	DEPOSITED, // đã đặt cọc
	RENTED, // đang cho thuê
}

export enum STATE_LOCK {
	ONLINE = 1,
	OFFLINE,
}

export enum TYPE_LOCK {
	DEVICE_PASS = 1,
	USER_PASS,
	TEMP_PASS,
	APP_PASS,
}

export enum IS_USED {
	NOT_USED,
	USED,
}

export enum PURPOSE_UPLOAD {
	IDENTIFICATION = 1,
	CONTRACT,
	OTHER,
	ALL,
	LICENSE,
	CERTIFICATE,
	REGISTRATION,
	INVOICE,
	BILL,
	RECEIPT,
	AGREEMENT,
}

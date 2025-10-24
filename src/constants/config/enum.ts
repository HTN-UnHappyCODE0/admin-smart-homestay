export enum QUERY_KEY {
	table_apartment_type,
	table_apartment,
	table_apartment_visit,
	table_apartment_incident,
	table_rental_contract,
	table_room_type,
	table_cost_type,
	table_lock,
	table_unlock_history,
	table_device,
	table_detail_lock_history,
	table_furniture,
	table_using_department,
	table_meter,
	table_meter_type,

	detail_info_apartment,
	detail_apartment_type,
	detail_request_view,
	detail_user_contract,
	detail_room_type,
	detail_cost_type,
	detail_lock,
	detail_furniture,
	detail_apartment_for_update,

	dropdown_apartment_type,
	dropdown_user,
	dropdown_apartment,
	dropdown_lock,
	dropdown_province,
	dropdown_ward,
	dropdown_meter_type,

	list_room,
	list_furniture,
	list_meter,
	list_meter_type,
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
	CUSTOM = 4,
}

export enum CONFIG_TYPE_FINDING {
	CATALOG = 0,
	DTO,
	DETAIL,
	SIMPLE,
	CUSTOM,
}

export enum STATUS_CONFIG {
	LOCKED = 0,
	ACTIVE,
}

export enum STATUS_TEMPORARILY_ABSENT {
	NO = 0, // chưa có tạm trú tạm vắng
	YES, // có tạm trú tạm vắng
}

export enum STATUS_CONTRACT {
	OCCUPANT = 0, // người ở
	OWNER, // chủ hợp đồng
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

export enum STATE_APARTMENT_VISIT {
	CANCELED, // đã hủy
	PENDING, // chờ duyệt
	APPROVED, // đã duyệt
	OVERDUE, // quá hạn
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

export enum STATE_SWITCH {
	OFF,
	ON,
}

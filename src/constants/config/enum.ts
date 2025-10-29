export enum QUERY_KEY {
	table_apartment_type,
	table_apartment,
	table_apartment_visit_detail,
	table_apartment_incident_detail,
	table_apartment_list_meter_detail,
	table_apartment_advertisement_detail,
	table_rental_contract_detail,
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
	table_apartment_owner,
	table_apartment_advertisement,
	table_apartment_visit_module,
	table_apartment_incident_module,
	table_employee_profile,
	table_guest_tenant,
	table_employee_profile_apartment,

	detail_info_apartment,
	detail_apartment_type,
	detail_request_view_detail,
	detail_request_repair_detail,
	detail_user_contract_detail,
	detail_room_type,
	detail_meter_type,
	detail_cost_type,
	detail_lock,
	detail_furniture,
	detail_apartment_for_update,
	detail_meter_apartment_update,
	detail_apartment_owner,
	detail_apartment_visit_module,
	detail_apartment_incident_report_module,
	detail_guest_tenant,
	detail_employee_profile,

	dropdown_apartment_type,
	dropdown_user,
	dropdown_apartment,
	dropdown_lock,
	dropdown_province,
	dropdown_ward,
	dropdown_meter_type,
	dropdown_role,

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

export enum STATE_ACCOUNT {
	NOT_ISSUE = 0, // chưa cấp tài khoản
	ISSUED, // đã cấp tài khoản
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
	APPROVED, // đã duyệt
	OVERDUE, // quá hạn
}

export enum STATE_APARTMENT_INCIDENT_REPORTS {
	CANCELED, // đã hủy
	PENDING, // chờ xử lý
	IN_PROGRESS, // đã tiếp nhận/đang xử lý
	RESOLVED, // đã xử lý
}

export enum STATE_APARTMENT_ADVERTISEMENT {
	DELETED, // đã xóa
	PENDING, // chờ duyệt
	POSTED, // đã đăng
	EXPIRED, // hết hạn
}

export enum STATE_APARTMENT_PAYMENT_TYPE {
	SELF, // TỰ THANH TOÁN
	DEPOSIT, // CỌC
	MONTHLY, // PHÁT SINH THEO THÁNG
	APARTMENT, // PHÁT SINH THEO CĂN HỘ
	USAGE_BASED, // PHÁT SINH THEO LƯỢNG SỬ DỤNG
	PERSON, // PHÁT SINH THEO NGƯỜI
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

export enum TYPE_USER {
	USER = 1, // người dùng
	APARTMENT_OWNER = 10, // chủ căn hộ
	STAFF = 25, // nhân viên
	MANAGE = 50, // quản lý
	ADMINISTRATOR = 100, // quản trị viên
}

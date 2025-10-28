export interface PropsMainEmployeeProfile {}

export interface IEmployeeProfile {
	code: string | null;
	name: string;
	email: string;
	numApartment: number;
	phoneNumber: number | null;
	userName: string;
	phoneVerified: number;
	emailVerified: number;
	profileImage: string | null;
	birthDate: string | null;
	gender: string | null;
	identityNumber: null;
	isIdentified: number;
	lastDeviceId: string | null;
	province: [];
	ward: [];
	address: [];
	description: string | null;
	type: number;
	id: number;
	uuid: string;
	status: number;
}

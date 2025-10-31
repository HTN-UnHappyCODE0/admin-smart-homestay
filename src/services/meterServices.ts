import axiosClient from '.';

const meterServices = {
	listmeter: (
		data: {
			keyword: string;
			isPaging: number;
			pageSize: number;
			page: number;
			typeFinding: number | null;
			status: number | null;
			installDateFrom: string | null;
			installDateTo: string | null;
			isUsed: number | null;
			meterTypeUuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Meter/list-meters`, data, {
			cancelToken: tokenAxios,
		});
	},
	createMeter: (
		data: {
			meterType: string;
			serialNumber: string;
			apartmentUuid: string;
			userInstallUuid: string;
			installedDate: string | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Meter/create-meter`, data, {
			cancelToken: tokenAxios,
		});
	},
	listMeterInApartment: (
		data: {
			keyword: string;
			isPaging: number;
			pageSize: number;
			page: number;
			typeFinding: number | null;
			meterTypeUuid: string;
			apartmentUuid: string;
			status: number | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Meter/list-meter-in-apartment`, data, {
			cancelToken: tokenAxios,
		});
	},
	updateMeterInApartment: (
		data: {
			apartmentUuid: string;
			listMeter: {
				apartmentMeterUuid: string;
				meterUuid: string;
			}[];
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Meter/update-meters-in-apartment`, data, {
			cancelToken: tokenAxios,
		});
	},
	meterDetail: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Meter/meter-detail`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default meterServices;

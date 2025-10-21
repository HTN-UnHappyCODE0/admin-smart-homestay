import axiosClient from '.';

const apartmentVisitServices = {
	getApartmentVisit: (
		data: {
			keyword: string;
			isPaging: number;
			pageSize: number;
			page: number;
			typeFinding: number | null;
			status: number | null;
			userUuid: string;
			apartmentUuid: string;
			from: string | null;
			to: string | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ApartmentVisit/get-apartment-visit`, data, {
			cancelToken: tokenAxios,
		});
	},

	getDetailLApartmentVisit: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/ApartmentVisit/get-detail-apartment-visit`, data, {
			cancelToken: tokenAxios,
		});
	},

	approveVisitRequest: (data: {uuid: string}, tokenAxios?: any) => {
		return axiosClient.post(`/ApartmentVisit/approve-visit-request`, data, {
			cancelToken: tokenAxios,
		});
	},

	rejectVisitRequest: (data: {uuid: string}, tokenAxios?: any) => {
		return axiosClient.post(`/ApartmentVisit/reject-visit-request`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default apartmentVisitServices;

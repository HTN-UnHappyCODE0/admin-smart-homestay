import axiosClient from '.';

const furnitureServices = {
	getListFurnitures: (
		data: {
			keyword: string;
			isPaging: number;
			page: number;
			pageSize: number;
			typeFinding: number | null;
			status: number | null;
			addedDateFrom: string | null;
			addedDateTo: string | null;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Furniture/get-list-furnitures`, data, {
			cancelToken: tokenAxios,
		});
	},
	createFurniture: (
		data: {
			name: string;
			description: string;
			lastAdded: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Furniture/create-furniture`, data, {
			cancelToken: tokenAxios,
		});
	},
	furnitureDetail: (
		data: {
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Furniture/furniture-detail`, data, {
			cancelToken: tokenAxios,
		});
	},
	apartmentUsing: (
		data: {
			keyword: string;
			isPaging: number;
			page: number;
			pageSize: number;
			uuid: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Furniture/apartment-using`, data, {
			cancelToken: tokenAxios,
		});
	},
	changeStatus: (
		data: {
			uuid: string;
			status: number;
			description: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Furniture/change-status`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default furnitureServices;

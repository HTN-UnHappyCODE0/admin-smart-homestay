import axios from 'axios';
import {getCookie} from 'cookies-next';
import axiosClient from '.';
import {COOKIE_KEY} from '~/constants/config/enum';

const axiosAuth = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API,
	headers: {'Content-Type': 'application/json'},
	timeout: 15000,
});

const authServices = {
	login: (
		data: {
			username: string;
			password: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/Auth/login`, data, {
			cancelToken: tokenAxios,
		});
	},
	refreshToken: (data: {}, tokenAxios?: any) => {
		const refreshToken = getCookie(COOKIE_KEY.REFRESH_TOKEN);

		return axiosAuth.post(`/Auth/refresh`, data, {
			headers: {
				Authorization: `Bearer ${refreshToken}`,
			},
			cancelToken: tokenAxios,
		});
	},
	logout: (data: {}, tokenAxios?: any) => {
		return axiosClient.post(`/Auth/logout`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default authServices;

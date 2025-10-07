import axios from 'axios';
import {getCookie, setCookie, deleteCookie} from 'cookies-next';
import {store} from '~/redux/store';
import {setInfoUser} from '~/redux/reducer/user';
import {setAccessToken, setRefreshToken, logout} from '~/redux/reducer/auth';
import authServices from '~/services/authServices';
import {COOKIE_KEY} from '~/constants/config/enum';
import {toastInfo, toastSuccess, toastWarn} from '~/common/funcs/toast';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
	failedQueue.forEach((prom) => {
		if (error) prom.reject(error);
		else prom.resolve(token);
	});
	failedQueue = [];
};

const axiosClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API,
	headers: {'Content-Type': 'application/json'},
	timeout: 15000,
});

axiosClient.interceptors.request.use((config) => {
	const accessToken = getCookie(COOKIE_KEY.ACCESS_TOKEN);
	if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
	return config;
});

axiosClient.interceptors.response.use(
	(response) => response.data,
	async (error) => {
		const originalRequest = error.config;

		if (error.response?.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({resolve, reject});
				})
					.then((token) => {
						originalRequest.headers.Authorization = `Bearer ${token}`;
						return axiosClient(originalRequest);
					})
					.catch((err) => Promise.reject(err));
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				// Gọi api refresh token
				const res = await authServices.refreshToken({});

				const newAccessToken = res?.data?.data?.accessToken;
				const newRefreshToken = res?.data?.data?.refreshToken;

				if (newAccessToken && newRefreshToken) {
					setCookie(COOKIE_KEY.ACCESS_TOKEN, newAccessToken, {maxAge: 60 * 60 * 24 * 7});
					setCookie(COOKIE_KEY.REFRESH_TOKEN, newRefreshToken, {maxAge: 60 * 60 * 24 * 7});
					store.dispatch(setAccessToken(newAccessToken));
					store.dispatch(setRefreshToken(newRefreshToken));

					processQueue(null, newAccessToken);
					originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
					return axiosClient(originalRequest);
				}
			} catch (err) {
				processQueue(err, null);
				deleteCookie(COOKIE_KEY.ACCESS_TOKEN);
				deleteCookie(COOKIE_KEY.REFRESH_TOKEN);

				store.dispatch(logout());
				store.dispatch(setInfoUser(null));

				return Promise.reject(err);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	}
);

export default axiosClient;

async function delay(duration: number) {
	return await new Promise((resolve) => setTimeout(resolve, duration));
}

export const httpRequest = async ({
	http,
	setLoading,
	msgSuccess,
	showMessageSuccess = false,
	showMessageFailed = false,
}: {
	http: Promise<any>;
	setLoading?: (loading: boolean) => void;
	showMessageSuccess?: boolean;
	showMessageFailed?: boolean;
	msgSuccess?: string;
}) => {
	setLoading?.(true);

	try {
		await delay(500);

		const res: any = await http;

		// Call API thành công
		if (res?.error?.code === 1) {
			if (showMessageSuccess) {
				toastSuccess({msg: msgSuccess || res?.error?.message || 'Thành công!'});
			}

			return res?.data || true;
		} else {
			throw res?.error?.message || 'Thất bại!';
		}
	} catch (err: any) {
		console.error('Lỗi gọi api:', err);

		if (typeof err == 'string') {
			if (showMessageFailed) toastWarn({msg: err || 'Có lỗi đã xảy ra!'});
			return;
		}

		if (err?.response?.status === 401) {
			return Promise.reject(err);
		}

		if (err?.code === 'ERR_NETWORK' || err?.code === 'ECONNABORTED') {
			if (showMessageFailed) toastInfo({msg: 'Kiểm tra kết nối Internet của bạn.'});
			return;
		}

		throw err;
	} finally {
		setLoading?.(false);
	}
};

import {useEffect, useRef} from 'react';
import Lottie from 'react-lottie';
import {useSelector} from 'react-redux';
import {RootState, store} from '~/redux/store';
import clsx from 'clsx';
import styles from './SplashScreen.module.scss';
import {KEY_STORE} from '~/constants/config';
import {setLoading, setRememberPassword} from '~/redux/reducer/site';
import {setAccessToken, setRefreshToken, setStateLogin, setDataLoginStorage} from '~/redux/reducer/auth';
import {setInfoUser} from '~/redux/reducer/user';
import {getCookie, setCookie, deleteCookie} from 'cookies-next';
import * as loadingAnim from '../../../../public/static/anim/loading_screen.json';
import {getItemStorage, setItemStorage} from '~/common/funcs/localStorage';
import {COOKIE_KEY} from '~/constants/config/enum';
import userServices from '~/services/userServices';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: loadingAnim,
	rendererSettings: {preserveAspectRatio: 'xMidYMid slice'},
};

function SplashScreen() {
	const hasFetchedUser = useRef(false);

	const {infoUser} = useSelector((state: RootState) => state.user);
	const {loading, isRememberPassword} = useSelector((state: RootState) => state.site);
	const {accessToken, refreshToken, isLogin, dataLoginStorage} = useSelector((state: RootState) => state.auth);

	useEffect(() => {
		(async () => {
			try {
				const accessToken = getCookie(COOKIE_KEY.ACCESS_TOKEN) as string | undefined;
				const refreshToken = getCookie(COOKIE_KEY.REFRESH_TOKEN) as string | undefined;

				const state = await getItemStorage(KEY_STORE);

				if (accessToken) store.dispatch(setAccessToken(accessToken));
				if (refreshToken) store.dispatch(setRefreshToken(refreshToken));

				if (state?.isLogin) store.dispatch(setStateLogin(state.isLogin));
				if (state?.infoUser) store.dispatch(setInfoUser(state.infoUser));
				if (state?.isRememberPassword) store.dispatch(setRememberPassword(state.isRememberPassword));
				if (state?.dataLoginStorage) store.dispatch(setDataLoginStorage(state.dataLoginStorage));
			} finally {
				store.dispatch(setLoading(false));
			}
		})();
	}, []);

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const res = await userServices.getCurrentUser({});
				if (res?.data) store.dispatch(setInfoUser(res.data));
			} catch {
				store.dispatch(setInfoUser(null));
			} finally {
				hasFetchedUser.current = false;
			}
		};

		if (accessToken && !hasFetchedUser.current) {
			hasFetchedUser.current = true;
			fetchUserInfo();
		}
	}, [accessToken]);

	useEffect(() => {
		if (!loading) {
			if (accessToken) setCookie(COOKIE_KEY.ACCESS_TOKEN, accessToken, {maxAge: 60 * 60 * 24 * 7});
			else deleteCookie(COOKIE_KEY.ACCESS_TOKEN);

			if (refreshToken) setCookie(COOKIE_KEY.REFRESH_TOKEN, refreshToken, {maxAge: 60 * 60 * 24 * 7});
			else deleteCookie(COOKIE_KEY.REFRESH_TOKEN);

			setItemStorage(KEY_STORE, {
				isLogin,
				infoUser,
				isRememberPassword,
				dataLoginStorage,
			});
		}
	}, [loading, isLogin, accessToken, refreshToken, infoUser, isRememberPassword, dataLoginStorage]);

	return (
		<div className={clsx(styles.container, {[styles.close]: !loading})}>
			<div className={styles.logo}>
				<Lottie options={defaultOptions} />
			</div>
		</div>
	);
}

export default SplashScreen;

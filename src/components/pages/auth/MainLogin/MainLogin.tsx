import Image from 'next/image';
import styles from './MainLogin.module.scss';
import {PropsMainLogin} from './interfaces';
import icons from '~/constants/images/icons';
import {RootState, store} from '~/redux/store';
import {useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {ShieldSecurity, User} from 'iconsax-react';
import Form, {ContextForm, Input} from '~/components/common/Form';
import {setRememberPassword} from '~/redux/reducer/site';
import Link from 'next/link';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import {useRouter} from 'next/router';
import {useMutation} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import authServices from '~/services/authServices';
import {setAccessToken, setDataLoginStorage, setRefreshToken, setStateLogin} from '~/redux/reducer/auth';
import Loading from '~/components/common/Loading';

function MainLogin({}: PropsMainLogin) {
	const router = useRouter();

	const {isRememberPassword} = useSelector((state: RootState) => state.site);
	const {dataLoginStorage} = useSelector((state: RootState) => state.auth);

	const [form, setForm] = useState<{
		username: string;
		password: string;
	}>({
		username: '',
		password: '',
	});

	useEffect(() => {
		if (isRememberPassword) {
			setForm({
				username: dataLoginStorage?.usernameStorage || '',
				password: dataLoginStorage?.passwordStorage || '',
			});
		} else {
			setForm({
				username: '',
				password: '',
			});
		}
	}, []);

	const funcLogin = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Đăng nhập thành công!',
				http: authServices.login({
					username: form.username,
					password: form?.password,
				}),
			}),
		onSuccess(data) {
			if (data) {
				store.dispatch(setAccessToken(data.accessToken));
				store.dispatch(setRefreshToken(data.refreshToken));
				store.dispatch(setStateLogin(true));
				router.replace(PATH.Home, undefined, {scroll: false});
			}
		},
	});

	const handleLogin = () => {
		if (isRememberPassword) {
			store.dispatch(
				setDataLoginStorage({
					usernameStorage: form.username,
					passwordStorage: form.password,
				})
			);
		} else {
			store.dispatch(setDataLoginStorage(null));
		}

		return funcLogin.mutate();
	};

	return (
		<div className={styles.login}>
			<Loading loading={funcLogin.isLoading} />
			<Form form={form} setForm={setForm} onSubmit={handleLogin}>
				<Image alt='Logo' src={icons.logo} className={styles.logo} />
				<h4 className={styles.title}>Mừng trở lại</h4>
				<p className={styles.des}>Vui lòng đăng nhập vào tài khoản của bạn</p>
				<div className={styles.form}>
					<Input
						label={
							<span>
								Tài khoản <span style={{color: 'red'}}>*</span>
							</span>
						}
						placeholder='Tài khoản'
						type='text'
						name='username'
						onClean
						isRequired
						isBlur
						showDone
						icon={<User size='22' variant='Bold' />}
					/>
					<Input
						label={
							<span>
								Mật khẩu <span style={{color: 'red'}}>*</span>
							</span>
						}
						placeholder='Mật khẩu'
						type='password'
						name='password'
						value={form?.password}
						onClean
						isRequired
						isBlur
						showDone
						icon={<ShieldSecurity size='22' variant='Bold' />}
					/>

					<div className={styles.flex}>
						<div className={styles.remember_password}>
							<input
								id='rememberPassword'
								type='checkbox'
								name='isRememberPassword'
								checked={isRememberPassword}
								onChange={() => store.dispatch(setRememberPassword(!isRememberPassword))}
							/>
							<label htmlFor='rememberPassword'>Nhớ mật khẩu</label>
						</div>
						<Link href={PATH.ForgotPassword} className={styles.link}>
							Quên mật khẩu?
						</Link>
					</div>

					<ContextForm.Consumer>
						{({isDone}) => (
							<div className={styles.btn}>
								<Button disable={!isDone} p_10_24 green rounded_8 bold>
									Đăng nhập
								</Button>
							</div>
						)}
					</ContextForm.Consumer>
				</div>
			</Form>
		</div>
	);
}

export default MainLogin;

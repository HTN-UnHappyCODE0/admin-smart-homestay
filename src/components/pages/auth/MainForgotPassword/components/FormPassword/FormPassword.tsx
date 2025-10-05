import React, {useContext} from 'react';

import {PropsFormPassword} from './interfaces';
import styles from './FormPassword.module.scss';
import {ContextForgotPassword, IContextForgotPassword} from '../../context';
import Form, {ContextForm, Input} from '~/components/common/Form';
import Button from '~/components/common/Button';
import {ShieldSecurity} from 'iconsax-react';
import {useRouter} from 'next/router';
import {PATH} from '~/constants/config';

function FormPassword({}: PropsFormPassword) {
	const router = useRouter();
	const regex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

	const {form, setForm} = useContext<IContextForgotPassword>(ContextForgotPassword);

	// const funcChangePassForget = useMutation({
	// 	mutationFn: () => {
	// 		return httpRequest({
	// 			showMessageFailed: true,
	// 			showMessageSuccess: true,
	// 			msgSuccess: 'Đổi mật khẩu thành công',
	// 			http: accountServices.changePassForget({
	// 				email: form?.email!,
	// 				otp: form?.otp!,
	// 				newPass: md5(`${form?.password}${process.env.NEXT_PUBLIC_KEY_PASS}`),
	// 			}),
	// 		});
	// 	},
	// 	onSuccess(data) {
	// 		if (data) {
	// 			router.push(PATH.Login);
	// 		}
	// 	},
	// });

	const handleSubmit = () => {
		// if (!regex.test(form?.password!)) {
		// 	return toastWarn({
		// 		msg: 'Mật khẩu mới phải chứa ít nhất 6 ký tự, bao gồm chữ cái và số',
		// 	});
		// }
		// return funcChangePassForget.mutate();

		router.push(PATH.Login);
	};

	return (
		<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
			{/* <Loading loading={funcChangePassForget.isLoading} /> */}
			<Input
				label={
					<span>
						Mật khẩu mới <span style={{color: 'red'}}>*</span>
					</span>
				}
				placeholder='Nhập mật khẩu mới'
				type='password'
				name='password'
				value={form?.password}
				onClean
				isRequired
				isBlur
				showDone
				icon={<ShieldSecurity size='22' variant='Bold' />}
			/>
			<Input
				label={
					<span>
						Xác nhận mật khẩu mới <span style={{color: 'red'}}>*</span>
					</span>
				}
				placeholder='Xác nhận mật khẩu mới'
				type='password'
				name='rePassword'
				value={form?.rePassword}
				valueConfirm={form.password}
				onClean
				isRequired
				isBlur
				showDone
				icon={<ShieldSecurity size='22' variant='Bold' />}
			/>
			<div className={styles.btn}>
				<ContextForm.Consumer>
					{({isDone}) => (
						<Button p_10_24 green rounded_8 bold disable={!isDone}>
							Xác nhận
						</Button>
					)}
				</ContextForm.Consumer>
			</div>
		</Form>
	);
}

export default FormPassword;

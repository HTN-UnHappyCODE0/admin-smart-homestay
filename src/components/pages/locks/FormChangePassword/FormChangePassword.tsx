import {useState} from 'react';
import styles from './FormChangePassword.module.scss';
import {PropsFormChangePassword} from './interfaces';
import Form, {ContextForm, Input} from '~/components/common/Form';
import {ShieldSecurity} from 'iconsax-react';
import Button from '~/components/common/Button';
import {IoClose} from 'react-icons/io5';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import lockServices from '~/services/lockServices';
import {QUERY_KEY} from '~/constants/config/enum';
import Loading from '~/components/common/Loading';

function FormChangePassword({uuidLock, onClose}: PropsFormChangePassword) {
	const queryClient = useQueryClient();

	const [form, setForm] = useState<{oldPassword: string; newPassword: string; reNewPassword: string}>({
		oldPassword: '',
		newPassword: '',
		reNewPassword: '',
	});

	const funcChangePassword = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageSuccess: true,
				showMessageFailed: true,
				msgSuccess: 'Đổi mật khẩu thành công!',
				http: lockServices.changeDefaultPassword({
					lockUuid: uuidLock,
					oldPassword: form?.oldPassword,
					newPassword: form?.newPassword,
				}),
			}),
		onSuccess(data) {
			if (data) {
				onClose();
				setForm({
					oldPassword: '',
					newPassword: '',
					reNewPassword: '',
				});
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_lock],
				});
			}
		},
	});

	return (
		<Form form={form} setForm={setForm} onSubmit={funcChangePassword.mutate}>
			<Loading loading={funcChangePassword.isLoading} />
			<div className={styles.form_change_password}>
				<h4>Đổi mật khẩu</h4>
				<div className={styles.line}></div>
				<Input
					label={
						<span>
							Mật khẩu cũ <span style={{color: 'red'}}>*</span>
						</span>
					}
					placeholder='Nhập mật khẩu cũ'
					type='password'
					name='oldPassword'
					value={form?.oldPassword}
					onClean
					isRequired
					isBlur
					showDone
					icon={<ShieldSecurity size='22' variant='Bold' />}
				/>

				<Input
					label={
						<span>
							Mật khẩu mới <span style={{color: 'red'}}>*</span>
						</span>
					}
					placeholder='Nhập mật khẩu mới'
					type='password'
					name='newPassword'
					value={form?.newPassword}
					onClean
					isRequired
					isBlur
					showDone
					icon={<ShieldSecurity size='22' variant='Bold' />}
				/>

				<Input
					label={
						<span>
							Xác nhận mật khẩu <span style={{color: 'red'}}>*</span>
						</span>
					}
					placeholder='Nhập lại mật khẩu mới'
					type='password'
					name='reNewPassword'
					value={form?.reNewPassword}
					valueConfirm={form?.newPassword}
					onClean
					isRequired
					isBlur
					showDone
					icon={<ShieldSecurity size='22' variant='Bold' />}
				/>

				<div className={styles.list_btn}>
					<div>
						<Button p_10_24 white rounded_8 bold onClick={onClose}>
							Hủy bỏ
						</Button>
					</div>
					<ContextForm.Consumer>
						{({isDone}) => (
							<div>
								<Button p_10_24 green rounded_8 bold disable={!isDone}>
									Xác nhận
								</Button>
							</div>
						)}
					</ContextForm.Consumer>
				</div>

				<div className={styles.close} onClick={onClose}>
					<IoClose size={28} color='#353945' />
				</div>
			</div>
		</Form>
	);
}

export default FormChangePassword;

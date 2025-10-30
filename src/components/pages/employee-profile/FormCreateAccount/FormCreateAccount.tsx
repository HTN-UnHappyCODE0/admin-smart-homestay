import Form, {ContextForm, Input, Select} from '~/components/common/Form';
import styles from './FormCreateAccount.module.scss';
import {PropsFormCreateAccount} from './interfaces';
import Loading from '~/components/common/Loading';
import {useState} from 'react';
import Button from '~/components/common/Button';
import {IoClose} from 'react-icons/io5';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {QUERY_KEY, TYPE_USER} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import userServices from '~/services/userServices';
import {roleAccounts} from '~/constants/config/data';

function FormCreateAccount({data, onClose}: PropsFormCreateAccount) {
	const queryClient = useQueryClient();

	const [form, setForm] = useState<{name: string; userName: string; type: string}>({
		name: data.name,
		userName: '',
		type: '',
	});

	const funcCreateAccount = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageSuccess: true,
				showMessageFailed: true,
				msgSuccess: 'Thêm tài khoản thành công!',
				http: userServices.createAccountForUser({
					userUuid: data.userUuid,
					username: form?.userName,
					type: Number(form?.type),
				}),
			}),
		onSuccess(data) {
			if (data) {
				onClose();
				setForm({
					name: '',
					userName: '',
					type: '',
				});
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_employee_profile],
				});
			}
		},
	});

	return (
		<Form form={form} setForm={setForm} onSubmit={funcCreateAccount.mutate}>
			<Loading loading={funcCreateAccount.isLoading} />
			<div className={styles.form_create_account}>
				<h4>Cấp tài khoản</h4>
				<div className={styles.line}></div>
				<Input
					label={
						<span>
							Tên nhân viên<span style={{color: 'red'}}>*</span>
						</span>
					}
					placeholder='Tên nhân viên'
					type='text'
					name='name'
					readOnly
				/>
				<Input
					label={
						<span>
							Tên tài khoản<span style={{color: 'red'}}>*</span>
						</span>
					}
					placeholder='Nhập tên tài khoản'
					type='text'
					name='userName'
					isRequired
					isBlur
					value={form?.userName}
				/>
				<div style={{marginTop: '16px'}}>
					<Select
						placeholder='Lựa chọn'
						label={
							<span>
								Vai trò <span style={{color: 'red'}}>*</span>
							</span>
						}
						value={form.type}
						options={roleAccounts
							?.filter(
								(role) =>
									role.state == TYPE_USER.STAFF || role.state == TYPE_USER.MANAGE || role.state == TYPE_USER.ADMINISTRATOR
							)
							?.map((type) => ({
								...type,
								state: String(type.state),
							}))}
						onSelect={(data) =>
							setForm((prev) => ({
								...prev,
								type: String(data.state),
							}))
						}
						getOptionLabel={(opt) => opt.text}
						getOptionValue={(opt) => opt.state}
					/>
				</div>
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
					<div className={styles.close} onClick={onClose}>
						<IoClose size={28} color='#8492A6' />
					</div>
				</div>
			</div>
		</Form>
	);
}

export default FormCreateAccount;

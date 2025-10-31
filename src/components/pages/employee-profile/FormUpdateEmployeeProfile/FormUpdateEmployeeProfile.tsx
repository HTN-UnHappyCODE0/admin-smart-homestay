import Form, {ContextForm, Input, Select, TextArea} from '~/components/common/Form';
import styles from './FormUpdateEmployeeProfile.module.scss';
import {IStaffDetail, PropsFormUpdateEmployeeProfile} from './interfaces';
import Loading from '~/components/common/Loading';
import {useState} from 'react';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import WrapperForm from '~/components/utils/WrapperForm';
import GridColumn from '~/components/layouts/GridColumn';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {QUERY_KEY, TYPE_USER} from '~/constants/config/enum';
import {useRouter} from 'next/router';
import {httpRequest} from '~/services';
import userServices from '~/services/userServices';
import {roleAccounts} from '~/constants/config/data';
import {toastWarn} from '~/common/funcs/toast';

export interface IFormUpdateEmployeeProfile {
	name: string;
	description: string;
	phoneNumber: string;
	email: string;
	userName: string;
	role: string;
}

const initForm: IFormUpdateEmployeeProfile = {
	name: '',
	description: '',
	phoneNumber: '',
	email: '',
	userName: '',
	role: '',
};

function FormUpdateEmployeeProfile({onClose}: PropsFormUpdateEmployeeProfile) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuidUpdate} = router.query;

	const [form, setForm] = useState<IFormUpdateEmployeeProfile>(initForm);

	useQuery<IStaffDetail>([QUERY_KEY.detail_employee_profile, _uuidUpdate], {
		queryFn: () =>
			httpRequest({
				http: userServices.getStaffDetail({
					uuid: _uuidUpdate as string,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({
					name: data.name,
					description: data.description || '',
					phoneNumber: data.phoneNumber,
					email: data.email,
					userName: data.userName || '',
					role: String(data.type),
				});
			}
		},
		select(data) {
			return data;
		},
		enabled: !!_uuidUpdate,
	});

	const funcUpdateEmployeeProfile = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa hồ sơ nhân viên thành công!',
				http: userServices.updateUser({
					uuid: _uuidUpdate as string,
					name: form?.name,
					email: form?.email,
					username: form?.userName,
					phoneNumber: form?.phoneNumber,
					description: form?.description,
					type: Number(form?.role) || TYPE_USER.STAFF,
					password: '',
					managerUuid: '',
					profileImage: '',
					birthDate: null,
					gender: 0,
					identityNumber: '',
					provinceId: '',
					wardId: '',
					address: '',
					bankName: '',
					bankNumber: '',
					bankAccount: '',
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm(initForm);
				onClose();
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_employee_profile],
				});
			}
		},
	});

	const handleUpdateEmployeeProfile = () => {
		if (!form?.name) {
			return toastWarn({msg: 'Vui lòng nhập tên !'});
		}
		if (!form?.phoneNumber) {
			return toastWarn({msg: 'Vui lòng nhập số điện thoại!'});
		}
		if (!form?.email) {
			return toastWarn({msg: 'Vui lòng nhập email!'});
		}

		return funcUpdateEmployeeProfile.mutate();
	};

	return (
		<Form form={form} setForm={setForm} onSubmit={handleUpdateEmployeeProfile}>
			<Loading loading={funcUpdateEmployeeProfile.isLoading} />
			<WrapperFormPostion
				width={1200}
				title='Chỉnh sửa hồ sơ nhân viên'
				actions={
					<FlexLayout row gap-8>
						<Button p_8_24 rounded_8 white bold onClick={onClose}>
							Hủy bỏ
						</Button>
						<ContextForm.Consumer>
							{({isDone}) => (
								<Button disable={!isDone} p_8_24 rounded_8 bright-cyan bold>
									Lưu lại
								</Button>
							)}
						</ContextForm.Consumer>
					</FlexLayout>
				}
			>
				<WrapperForm title='Thông tin hồ sơ nhân viên'>
					<GridColumn col_3>
						<Input
							label={
								<span>
									Họ tên <span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Nhập tên'
							type='text'
							name='name'
							isRequired
							isBlur
						/>
						<div>
							<Input
								label={
									<span>
										Số điện thoại <span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Nhập số'
								type='text'
								name='phoneNumber'
								isPhone
								isRequired
								isBlur
							/>
						</div>
						<div>
							<Input
								label={
									<span>
										Email <span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Nhập email'
								type='text'
								name='email'
								isEmail
								isRequired
								isBlur
							/>
						</div>
					</GridColumn>
					<div style={{marginTop: '16px'}}>
						<TextArea name='description' placeholder='Nhập ghi chú' label='Ghi chú' />
					</div>
				</WrapperForm>

				<WrapperForm title='Thông tin tài khoản'>
					<GridColumn col_2>
						<Input
							label={<span>Tên tài khoản</span>}
							placeholder='Chưa có tài khoản'
							type='text'
							name='userName'
							readOnly
							isBlur
						/>
						<div>
							<Select
								placeholder='Lựa chọn'
								label={<span>Vai trò</span>}
								value={form.role}
								options={roleAccounts
									?.filter(
										(role) =>
											role.state == TYPE_USER.STAFF ||
											role.state == TYPE_USER.MANAGE ||
											role.state == TYPE_USER.ADMINISTRATOR
									)
									?.map((role) => ({
										...role,
										state: String(role.state),
									}))}
								onSelect={(data) =>
									setForm((prev) => ({
										...prev,
										role: String(data.state),
									}))
								}
								getOptionLabel={(opt) => opt.text}
								getOptionValue={(opt) => opt.state}
							/>
						</div>
					</GridColumn>
				</WrapperForm>
			</WrapperFormPostion>
		</Form>
	);
}

export default FormUpdateEmployeeProfile;

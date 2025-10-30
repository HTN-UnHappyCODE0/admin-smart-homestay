import Form, {ContextForm, Input, Select, TextArea} from '~/components/common/Form';
import styles from './FormCreateEmployeeProfile.module.scss';
import {PropsFormCreateEmployeeProfile} from './interfaces';
import {useState} from 'react';
import Loading from '~/components/common/Loading';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import WrapperForm from '~/components/utils/WrapperForm';
import GridColumn from '~/components/layouts/GridColumn';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import userServices from '~/services/userServices';
import {QUERY_KEY, TYPE_USER} from '~/constants/config/enum';
import {roleAccounts} from '~/constants/config/data';

export interface IFormCreateEmployeeProfile {
	name: string;
	description: string;
	phoneNumber: string;
	email: string;
	username: string;
	role: string;
}

const initForm: IFormCreateEmployeeProfile = {
	name: '',
	description: '',
	phoneNumber: '',
	email: '',
	username: '',
	role: '',
};

function FormCreateEmployeeProfile({onClose}: PropsFormCreateEmployeeProfile) {
	const queryClient = useQueryClient();

	const [form, setForm] = useState<IFormCreateEmployeeProfile>(initForm);

	const funcCreateEmployeeProfile = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm hồ sơ nhân viên thành công!',
				http: userServices.createUser({
					name: form?.name,
					email: form?.email,
					phoneNumber: form?.phoneNumber,
					username: form?.username,
					type: Number(form?.role) || TYPE_USER.STAFF,
					managerUuid: '',
					password: '',
					profileImage: '',
					birthDate: null,
					gender: 0,
					identityNumber: '',
					provinceId: '',
					wardId: '',
					address: '',
					description: '',
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

	const handleCreateEmpoyeeProfile = async () => {
		return funcCreateEmployeeProfile.mutate();
	};

	return (
		<Form form={form} setForm={setForm} onSubmit={handleCreateEmpoyeeProfile}>
			<Loading loading={funcCreateEmployeeProfile.isLoading} />
			<WrapperFormPostion
				width={1200}
				title='Thêm mới hồ sơ nhân viên'
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
						<Input label={<span>Tên tài khoản</span>} placeholder='Nhập tên' type='text' name='username' isBlur />
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

export default FormCreateEmployeeProfile;

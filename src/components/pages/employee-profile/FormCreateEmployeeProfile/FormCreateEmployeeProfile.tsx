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
import {useMutation, useQuery} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import userServices from '~/services/userServices';
import {useRouter} from 'next/router';
import {toastWarn} from '~/common/funcs/toast';
import {QUERY_KEY} from '~/constants/config/enum';
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
	const router = useRouter();

	const [form, setForm] = useState<IFormCreateEmployeeProfile>(initForm);

	const funcCreateApartment = useMutation({
		mutationFn: (body: {paths: string[]}) =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm hồ sơ nhân viên thành công!',
				http: userServices.createUser({
					managerUuid: '',
					name: form?.name,
					email: form?.email,
					username: form?.username,
					password: '',
					phoneNumber: form?.phoneNumber,
					profileImage: '',
					birthDate: '',
					gender: 0,
					identityNumber: '',
					provinceId: '',
					wardId: '',
					address: '',
					description: '',
					bankName: '',
					bankNumber: '',
					bankAccount: '',
					type: [25, 50, 100],
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm(initForm);
				router.back();
			}
		},
	});

	const handleCreateEmpoyeeProfile = async () => {
		if (!form.name) {
			return toastWarn({msg: 'Nhập họ tên người quản lý!'});
		}
		if (!form.phoneNumber) {
			return toastWarn({msg: 'Nhập số điện thoại!'});
		}
		if (!form.email) {
			return toastWarn({msg: 'Nhập email!'});
		} else {
			return funcCreateApartment.mutate({
				paths: [],
			});
		}
	};

	return (
		<Form form={form} setForm={setForm}>
			<Loading loading={false} />
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
									Họ tên người quản lý <span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Nhập tên'
							type='text'
							name='name'
							onClean
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
								onClean
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
								onClean
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
						<Input label={<span>Tên tài khoản</span>} placeholder='Nhập tên' type='text' name='username' onClean />
						<div>
							<Select
								placeholder='Lựa chọn'
								label={<span>Vai trò</span>}
								value={form.role}
								options={roleAccounts.map((role) => ({
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

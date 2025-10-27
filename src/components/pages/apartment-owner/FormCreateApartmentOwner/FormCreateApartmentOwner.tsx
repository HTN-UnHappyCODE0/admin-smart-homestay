import Form, {ContextForm, Input, TextArea} from '~/components/common/Form';
import styles from './FormCreateApartmentOwner.module.scss';
import {PropsFormCreateApartmentOwner} from './interfaces';
import Loading from '~/components/common/Loading';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import {Fragment, useState} from 'react';
import Header from '~/components/utils/Header';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import WrapperForm from '~/components/utils/WrapperForm';
import GridColumn from '~/components/layouts/GridColumn';
import {useMutation} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import userServices from '~/services/userServices';
import {useRouter} from 'next/router';
import {toastWarn} from '~/common/funcs/toast';

export interface IFormCreateApartmentOwner {
	name: string;
	phoneNumber: string;
	bankNumber: string;
	bankAccount: string;
	bankName: string;
	description: string;
}

const initForm: IFormCreateApartmentOwner = {
	name: '',
	phoneNumber: '',
	bankNumber: '',
	bankAccount: '',
	bankName: '',
	description: '',
};

function FormCreateApartmentOwner({onClose}: PropsFormCreateApartmentOwner) {
	const router = useRouter();

	const [form, setForm] = useState<IFormCreateApartmentOwner>(initForm);

	const [loading, setLoading] = useState<boolean>(false);

	const funcCreateApartmentOwner = useMutation({
		mutationFn: (body: {paths: string[]}) =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm chủ căn hộ thành công!',
				http: userServices.createUser({
					name: form?.name,
					email: '',
					username: '',
					password: '',
					phoneNumber: form?.phoneNumber,
					profileImage: '',
					birthDate: null,
					gender: null,
					identityNumber: '',
					provinceId: '',
					wardId: '',
					address: '',
					description: form?.description,
					bankName: form?.bankName,
					bankNumber: form?.bankNumber,
					bankAccount: form?.bankAccount,
					type: 10,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm(initForm);
				router.back();
			}
		},
	});

	const handleCreateApartmentOwner = async () => {
		if (!form.name) {
			return toastWarn({msg: 'Nhập tên chủ căn hộ!'});
		}
		if (!form.phoneNumber) {
			return toastWarn({msg: 'Nhập số điện thoại'});
		}
		if (!form.bankNumber) {
			return toastWarn({msg: 'Nhập số tài khoản'});
		}
		if (!form.bankAccount) {
			return toastWarn({msg: 'Nhập tên chủ tài khoản'});
		}
		if (!form.bankName) {
			return toastWarn({msg: 'Nhập ngân hàng'});
		} else {
			return funcCreateApartmentOwner.mutate({
				paths: [],
			});
		}
	};

	return (
		<Fragment>
			<Loading loading={loading || funcCreateApartmentOwner.isLoading} />
			<Form heightFull={true} form={form} setForm={setForm} onSubmit={handleCreateApartmentOwner}>
				<WrapperFormPostion
					width={1200}
					title='Thêm chủ căn hộ'
					actions={
						<FlexLayout row gap-8>
							<Button p_8_24 rounded_8 white bold onClick={onClose}>
								Hủy bỏ
							</Button>
							<ContextForm.Consumer>
								{({isDone}) => (
									<Button disable={!isDone} p_8_24 rounded_8 bright-cyan bold onSubmit={funcCreateApartmentOwner.mutate}>
										Lưu lại
									</Button>
								)}
							</ContextForm.Consumer>
						</FlexLayout>
					}
				>
					<FlexItem flex-1 overflow-x>
						<FlexLayout column gap-12>
							<WrapperForm title=''>
								<div className={styles.form}>
									<GridColumn col_3>
										<Input
											name='name'
											type='text'
											isRequired={true}
											label={
												<span>
													Tên chủ căn hộ <span style={{color: 'red'}}>* </span>
												</span>
											}
											placeholder='Nhập tên chủ căn hộ'
										/>
										<div>
											<Input
												name='phoneNumber'
												type='text'
												isRequired={true}
												label={
													<span>
														Số điện thoại <span style={{color: 'red'}}>* </span>
													</span>
												}
												placeholder='Nhập số điện thoại'
											/>
										</div>
									</GridColumn>

									<GridColumn col_3>
										<Input
											name='bankNumber'
											type='text'
											isRequired={true}
											label={
												<span>
													Số tài khoản <span style={{color: 'red'}}>* </span>
												</span>
											}
											placeholder='Nhập số tài khoản'
										/>
										<div>
											<Input
												name='bankAccount'
												type='text'
												isRequired={true}
												label={
													<span>
														Tên chủ tài khoản <span style={{color: 'red'}}>* </span>
													</span>
												}
												placeholder='Nhập tên chủ tài khoản'
											/>
										</div>
										<div>
											<Input
												name='bankName'
												type='text'
												isRequired={true}
												label={
													<span>
														Ngân hàng <span style={{color: 'red'}}>* </span>
													</span>
												}
												placeholder='Nhập tên ngân hàng'
											/>
										</div>
									</GridColumn>
									<TextArea name='description' label={<span>Ghi chú</span>} placeholder='Nhập ghi chú' />
								</div>
							</WrapperForm>
						</FlexLayout>
					</FlexItem>
				</WrapperFormPostion>
			</Form>
		</Fragment>
	);
}

export default FormCreateApartmentOwner;

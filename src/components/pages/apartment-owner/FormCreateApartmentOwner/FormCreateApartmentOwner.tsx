import Form, {ContextForm, Input, Select, TextArea} from '~/components/common/Form';
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
import {useMutation, useQuery} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import userServices from '~/services/userServices';
import {useRouter} from 'next/router';
import {toastWarn} from '~/common/funcs/toast';
import {CONFIG_PAGING, QUERY_KEY} from '~/constants/config/enum';
import paymentAccountServices from '~/services/paymentAccountServices';

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

	const {data: bankNames = []} = useQuery<
		{
			id: number;
			name: string;
			shortName: string;
			code: string;
			bin: string;
		}[]
	>([QUERY_KEY.dropdown_payment_account], {
		queryFn: () =>
			httpRequest({
				http: paymentAccountServices.getListBank({
					keyword: '',
					isPaging: CONFIG_PAGING.NO_PAGING,
					page: 1,
					pageSize: 100,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const funcCreateApartmentOwner = useMutation({
		mutationFn: (body: {paths: string[]}) =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm chủ căn hộ thành công!',
				http: userServices.createUser({
					name: form?.name,
					phoneNumber: form?.phoneNumber,
					description: form?.description,
					bankName: form?.bankName,
					bankAccount: form?.bankAccount,
					bankNumber: form?.bankNumber,
					type: 10,
					email: '',
					username: '',
					password: '',
					profileImage: '',
					birthDate: null,
					gender: 1,
					identityNumber: '',
					provinceId: '',
					wardId: '',
					address: '',
					managerUuid: '',
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm(initForm);
				onClose();
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
		<Form heightFull={true} form={form} setForm={setForm} onSubmit={handleCreateApartmentOwner}>
			<Loading loading={loading || funcCreateApartmentOwner.isLoading} />
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
				<WrapperForm title=''>
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
								label={
									<span>
										Số điện thoại <span style={{color: 'red'}}>* </span>
									</span>
								}
								name='phoneNumber'
								type='text'
								isRequired={true}
								placeholder='Nhập số điện thoại'
								isPhone
							/>
						</div>
					</GridColumn>

					<div className={styles.form}>
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
									isUppercase
								/>
							</div>
							<div>
								<Select
									placeholder='Lựa chọn'
									label={
										<span>
											Tên ngân hàng <span style={{color: 'red'}}>* </span>
										</span>
									}
									value={form?.bankName}
									options={bankNames}
									onSelect={(data) =>
										setForm((prev) => ({
											...prev,
											bankName: data.name,
										}))
									}
									getOptionLabel={(opt) => opt.name}
									getOptionValue={(opt) => opt.name}
								/>
							</div>
						</GridColumn>
					</div>
					<TextArea name='description' label={<span>Ghi chú</span>} placeholder='Nhập ghi chú' />
				</WrapperForm>
			</WrapperFormPostion>
		</Form>
	);
}

export default FormCreateApartmentOwner;

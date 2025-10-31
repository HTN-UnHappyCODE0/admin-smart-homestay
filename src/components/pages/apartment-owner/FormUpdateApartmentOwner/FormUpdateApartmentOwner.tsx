import {Fragment, useState} from 'react';
import styles from './FormUpdateApartmentOwner.module.scss';
import {PropsFormUpdateApartmentOwner} from './interfaces';
import Loading from '~/components/common/Loading';
import Form, {ContextForm, Input, Select, TextArea} from '~/components/common/Form';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import WrapperForm from '~/components/utils/WrapperForm';
import GridColumn from '~/components/layouts/GridColumn';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {IDetailApartmentOwner} from '../DetailApartmentOwner/interfaces';
import {CONFIG_PAGING, QUERY_KEY} from '~/constants/config/enum';
import {useRouter} from 'next/router';
import {httpRequest} from '~/services';
import userServices from '~/services/userServices';
import paymentAccountServices from '~/services/paymentAccountServices';
import {toastWarn} from '~/common/funcs/toast';

export interface IFormUpdateApartmentOwner {
	name: string;
	phoneNumber: string;
	bankNumber: string;
	bankAccount: string;
	bankName: string;
	description: string | null;
}

const initForm: IFormUpdateApartmentOwner = {
	name: '',
	phoneNumber: '',
	bankNumber: '',
	bankAccount: '',
	bankName: '',
	description: '',
};

function FormUpdateApartmentOwner({onClose}: PropsFormUpdateApartmentOwner) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuidUpdate} = router.query;

	const [form, setForm] = useState<IFormUpdateApartmentOwner>(initForm);

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

	useQuery<IDetailApartmentOwner>([QUERY_KEY.detail_apartment_owner, _uuidUpdate], {
		queryFn: () =>
			httpRequest({
				http: userServices.getApartmentOwnersDetail({uuid: _uuidUpdate as string}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({
					name: data.name || '',
					phoneNumber: data.phoneNumber || '',
					bankNumber: data.bankInfos?.[0]?.bankNumber || '',
					bankAccount: data.bankInfos?.[0]?.bankAccount || '',
					bankName: data.bankInfos?.[0]?.bankName || '',
					description: data.description || '',
				});
			}
		},
		select(data) {
			return data;
		},
		enabled: !!_uuidUpdate,
	});

	const funcUpdateApartmentOwner = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa chủ căn hộ thành công!',
				http: userServices.updateUser({
					managerUuid: '',
					name: form?.name,
					email: '',
					username: '',
					password: '',
					phoneNumber: form?.phoneNumber,
					profileImage: '',
					birthDate: null,
					gender: 0,
					identityNumber: '',
					provinceId: '',
					wardId: '',
					address: '',
					description: form?.description,
					bankName: form?.bankName,
					bankNumber: form?.bankNumber,
					bankAccount: form?.bankAccount,
					type: 10,
					uuid: _uuidUpdate as string,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({name: '', phoneNumber: '', bankNumber: '', bankAccount: '', bankName: '', description: ''});
				onClose();
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_apartment_owner],
				});
			}
		},
	});

	const handleUpdateApartmentOwner = () => {
		if (!form?.name) {
			return toastWarn({msg: 'Vui lòng nhập tên chủ căn hộ!'});
		}
		if (!form?.phoneNumber) {
			return toastWarn({msg: 'Vui lòng nhập số điện thoại!'});
		}
		if (!form?.bankName) {
			return toastWarn({msg: 'Vui lòng chọn tên ngân hàng!'});
		}
		if (!form?.bankAccount) {
			return toastWarn({msg: 'Vui lòng nhập tên tài khoản!'});
		}
		if (!form?.bankNumber) {
			return toastWarn({msg: 'Vui lòng nhập số tài khoản!'});
		}

		return funcUpdateApartmentOwner.mutate();
	};

	return (
		<Form heightFull={true} form={form} setForm={setForm} onSubmit={handleUpdateApartmentOwner}>
			<Loading loading={funcUpdateApartmentOwner.isLoading} />
			<WrapperFormPostion
				width={1200}
				title='Chỉnh sửa chủ căn hộ'
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

export default FormUpdateApartmentOwner;

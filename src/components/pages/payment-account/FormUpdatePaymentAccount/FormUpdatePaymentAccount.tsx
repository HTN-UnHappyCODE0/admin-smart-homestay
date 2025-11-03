import Form, {ContextForm, Input, Select} from '~/components/common/Form';
import styles from './FormUpdatePaymentAccount.module.scss';
import {PropsFormUpdatePaymentAccount} from './interfaces';
import Loading from '~/components/common/Loading';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import {useState} from 'react';
import WrapperForm from '~/components/utils/WrapperForm';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {CONFIG_PAGING, QUERY_KEY} from '~/constants/config/enum';
import {useRouter} from 'next/router';
import {httpRequest} from '~/services';
import paymentAccountServices from '~/services/paymentAccountServices';
import {toastWarn} from '~/common/funcs/toast';

export interface IFormUpdatePaymentAccouunt {
	uuid: string;
	userUuid: string;
	bankName: string;
	bankNumber: string;
	bankAccount: string;
	description: string;
}

const initForm: IFormUpdatePaymentAccouunt = {
	uuid: '',
	userUuid: '',
	bankName: '',
	bankNumber: '',
	bankAccount: '',
	description: '',
};

function FormUpdatePaymentAccount({onClose}: PropsFormUpdatePaymentAccount) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuidUpdate} = router.query;

	const [form, setForm] = useState<IFormUpdatePaymentAccouunt>(initForm);

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

	useQuery<{userUuid: string; bankName: string; bankNumber: string; bankAccount: string; description: string}>(
		[QUERY_KEY.detail_payment_account, _uuidUpdate],
		{
			queryFn: () =>
				httpRequest({
					http: paymentAccountServices.getBankPaymentDetail({
						uuid: _uuidUpdate as string,
					}),
				}),
			onSuccess(data) {
				if (data) {
					setForm({
						uuid: '',
						userUuid: '',
						bankName: data.bankName,
						bankNumber: data.bankNumber,
						bankAccount: data.bankAccount,
						description: '',
					});
				}
			},
			select(data) {
				return data;
			},
			enabled: !!_uuidUpdate,
		}
	);

	const funcUpdatePaymentAccount = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa tài khoản thanh toán thành công!',
				http: paymentAccountServices.updateBankPayment({
					uuid: _uuidUpdate as string,
					userUuid: '',
					bankName: form?.bankName,
					bankNumber: form?.bankNumber,
					bankAccount: form?.bankAccount,
					description: '',
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({uuid: '', userUuid: '', bankName: '', bankNumber: '', bankAccount: '', description: ''});
				onClose();
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_payment_account],
				});
			}
		},
	});

	const handleUpdatePaymentAccount = () => {
		if (!form?.bankName) {
			return toastWarn({msg: 'Vui lòng chọn tên ngân hàng!'});
		}
		if (!form?.bankAccount) {
			return toastWarn({msg: 'Vui lòng nhập tên tài khoản!'});
		}
		if (!form?.bankNumber) {
			return toastWarn({msg: 'Vui lòng nhập số tài khoản!'});
		}

		return funcUpdatePaymentAccount.mutate();
	};

	return (
		<Form form={form} setForm={setForm} onSubmit={handleUpdatePaymentAccount}>
			<Loading loading={funcUpdatePaymentAccount.isLoading} />
			<WrapperFormPostion
				width={680}
				title='Chỉnh sửa tài khoản thanh toán'
				actions={
					<FlexLayout row gap-8>
						<Button p_8_24 rounded_8 white bold onClick={onClose}>
							Hủy bỏ
						</Button>
						<ContextForm.Consumer>
							{({isDone}) => (
								<Button disable={!isDone} p_8_24 rounded_8 bright-cyan bold>
									Cập nhật
								</Button>
							)}
						</ContextForm.Consumer>
					</FlexLayout>
				}
			>
				<WrapperForm title='Thông tin tài khoản'>
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
					<div style={{marginTop: '16px'}}>
						<Input
							label={
								<span>
									Tên tài khoản <span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Nhập tên tài khoản'
							type='text'
							name='bankAccount'
							onClean
							isRequired
							isUppercase
							isBlur
						/>
						<Input
							label={
								<span>
									Số tài khoản <span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Nhập số tài khoản'
							type='text'
							name='bankNumber'
							onClean
							isRequired
							isBlur
							isNumber
						/>
					</div>
				</WrapperForm>
			</WrapperFormPostion>
		</Form>
	);
}

export default FormUpdatePaymentAccount;

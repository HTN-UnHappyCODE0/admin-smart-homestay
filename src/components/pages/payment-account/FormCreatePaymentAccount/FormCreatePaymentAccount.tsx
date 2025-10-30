import Form, {ContextForm, Input, Select} from '~/components/common/Form';
import styles from './FormCreatePaymentAccount.module.scss';
import {PropsFormCreatePaymentAccount} from './interfaces';
import {useState} from 'react';
import Loading from '~/components/common/Loading';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import WrapperForm from '~/components/utils/WrapperForm';
import GridColumn from '~/components/layouts/GridColumn';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {CONFIG_PAGING, QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import paymentAccountServices from '~/services/paymentAccountServices';
import {toastWarn} from '~/common/funcs/toast';

export interface IFormCreatePaymentAccount {
	userUuid: string;
	bankName: string;
	bankNumber: string;
	bankAccount: string;
	description: string;
}

const initForm: IFormCreatePaymentAccount = {
	userUuid: '',
	bankName: '',
	bankNumber: '',
	bankAccount: '',
	description: '',
};

function FormCreatePaymentAccount({onClose}: PropsFormCreatePaymentAccount) {
	const queryClient = useQueryClient();

	const [form, setForm] = useState<{
		userUuid: string;
		bankName: string;
		bankNumber: string;
		bankAccount: string;
		description: string;
	}>({
		userUuid: '',
		bankName: '',
		bankNumber: '',
		bankAccount: '',
		description: '',
	});

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

	const funcCreatePaymentAccount = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm tài khoản thanh toán thành công!',
				http: paymentAccountServices.createBankPayment({
					userUuid: '',
					bankName: form?.bankName,
					bankNumber: form?.bankNumber,
					bankAccount: form?.bankAccount,
					description: '',
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm(initForm);
				onClose();
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_payment_account],
				});
			}
		},
	});

	const handleCreatePaymentAccount = () => {
		if (!form?.bankName) {
			return toastWarn({msg: 'Vui lòng chọn tên ngân hàng!'});
		}
		if (!form?.bankAccount) {
			return toastWarn({msg: 'Vui lòng nhập tên tài khoản!'});
		}
		if (!form?.bankNumber) {
			return toastWarn({msg: 'Vui lòng nhập số tài khoản!'});
		}

		return funcCreatePaymentAccount.mutate();
	};

	return (
		<Form form={form} setForm={setForm} onSubmit={handleCreatePaymentAccount}>
			<Loading loading={funcCreatePaymentAccount.isLoading} />
			<WrapperFormPostion
				width={1200}
				title='Thêm tài khoản thanh toán'
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
				<WrapperForm title='Thông tin tài khoản'>
					<GridColumn col_3>
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
						<div>
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
								isBlur
							/>
						</div>
						<div>
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
							/>
						</div>
					</GridColumn>
				</WrapperForm>
			</WrapperFormPostion>
		</Form>
	);
}

export default FormCreatePaymentAccount;

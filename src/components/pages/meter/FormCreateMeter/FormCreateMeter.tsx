import Form, {ContextForm, Input, Select} from '~/components/common/Form';
import styles from './FormCreateMeter.module.scss';
import {PropsFormCreateMeter} from './interfaces';
import Loading from '~/components/common/Loading';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import meterServices from '~/services/meterServices';
import {CONFIG_PAGING, CONFIG_TYPE_FIND, QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import WrapperForm from '~/components/utils/WrapperForm';
import GridColumn from '~/components/layouts/GridColumn';
import apartmentServices from '~/services/apartmentServices';
import userServices from '~/services/userServices';
import meterTypeServices from '~/services/meterTypeServices';
import {getDetailAddress} from '~/common/funcs/optionConvert';
import {toastWarn} from '~/common/funcs/toast';
import moment from 'moment';

export interface IFormCreateMeter {
	name: string;
	meterType: string;
	serialNumber: string;
	apartmentUuid: string;
	address: string;
	userInstallUuid: string;
	installedDate: string;
}

const initForm: IFormCreateMeter = {
	name: '',
	meterType: '',
	serialNumber: '',
	apartmentUuid: '',
	address: '',
	userInstallUuid: '',
	installedDate: '',
};

function FormCreateMeter({onClose}: PropsFormCreateMeter) {
	const queryClient = useQueryClient();

	const [form, setForm] = useState<IFormCreateMeter>(initForm);
	const [date, setDate] = useState<{from: Date | null; to: Date | null} | null>(null);

	const {data: apartments = []} = useQuery<
		{
			province: {
				code: string;
				fullName: string;
				fullNameEn: string;
			};
			ward: {
				code: string;
				fullName: string;
				fullNameEn: string;
				provinceCode: string;
			};
			address: string;
			code: string;
			name: string;
			id: number;
			uuid: string;
			status: number;
		}[]
	>([QUERY_KEY.dropdown_apartment], {
		queryFn: () =>
			httpRequest({
				http: apartmentServices.getListApartments({
					isPaging: CONFIG_PAGING.NO_PAGING,
					typeFinding: CONFIG_TYPE_FIND.CUSTOM,
					page: 1,
					pageSize: 100,
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
					state: null,
					sizeFrom: null,
					sizeTo: null,
					province: '',
					ward: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	const {data: users = []} = useQuery<
		{
			uuid: string;
			code: string;
			name: string;
		}[]
	>([QUERY_KEY.dropdown_user], {
		queryFn: () =>
			httpRequest({
				http: userServices.getUsers({
					hasRented: 0,
					isPaging: CONFIG_PAGING.NO_PAGING,
					keyword: '',
					page: 1,
					pageSize: 100,
					status: STATUS_CONFIG.ACTIVE,
					typeFinding: CONFIG_TYPE_FIND.DROPDOWN,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const {data: meterTypes = []} = useQuery<
		{
			uuid: string;
			code: string;
			name: string;
		}[]
	>([QUERY_KEY.dropdown_meter_type], {
		queryFn: () =>
			httpRequest({
				http: meterTypeServices.listMeterType({
					isPaging: CONFIG_PAGING.NO_PAGING,
					typeFinding: CONFIG_TYPE_FIND.DROPDOWN,
					page: 1,
					pageSize: 100,
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const funcCreateMeter = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm loại thiết bị thành công!',
				http: meterServices.createMeter({
					meterType: form?.meterType,
					serialNumber: form?.serialNumber,
					apartmentUuid: form?.apartmentUuid,
					userInstallUuid: form?.userInstallUuid,
					installedDate: form?.installedDate,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm(initForm);
				onClose();
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_meter],
				});
			}
		},
	});

	const handleCreateMeter = () => {
		if (!!form?.apartmentUuid && !form?.installedDate) {
			return toastWarn({msg: 'Vui lòng nhập ngày lắp đặt!'});
		} else if (!!form?.apartmentUuid && !!form?.installedDate && !form?.userInstallUuid) {
			return toastWarn({msg: 'Vui lòng nhập người lắp đặt / người thanh toán!'});
		}

		return funcCreateMeter.mutate();
	};

	return (
		<Form form={form} setForm={setForm} onSubmit={handleCreateMeter}>
			<Loading loading={funcCreateMeter.isLoading} />
			<WrapperFormPostion
				width={1200}
				title='Thêm thiết bị'
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
				<WrapperForm title='Thông tin nội thất'>
					<div className={styles.form}>
						<GridColumn col_2>
							<Select
								placeholder='Lựa chọn'
								label={
									<span>
										Loại thiết bị <span style={{color: 'red'}}>* </span>
									</span>
								}
								value={form?.meterType}
								options={meterTypes}
								onSelect={(data) =>
									setForm((prev) => ({
										...prev,
										meterType: data.uuid,
									}))
								}
								getOptionLabel={(opt) => opt.name}
								getOptionValue={(opt) => opt.uuid}
							/>
							<Input
								label={
									<span>
										Mã kết nối<span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Nhập mã kết nối'
								type='text'
								name='serialNumber'
								onClean
								isRequired
								isBlur
							/>
							<Select
								placeholder='Chọn căn hộ'
								label={<span>Tên căn hộ</span>}
								value={form?.apartmentUuid}
								options={apartments}
								onSelect={(data) =>
									setForm((prev) => ({
										...prev,
										apartmentUuid: data.uuid,
										address: getDetailAddress({
											address: data.address,
											wardName: data.ward.fullName,
											provinceName: data.province.fullName,
											districtName: '',
										}),
									}))
								}
								getOptionLabel={(opt) => opt.name}
								getOptionValue={(opt) => opt.uuid}
							/>

							<Input
								label={<span>Địa chỉ chi tiết</span>}
								placeholder='Nhập địa chỉ '
								type='text'
								name='address'
								value={form?.address}
								readOnly={true}
							/>

							<div>
								<Input label={<span>Ngày lắp đặt</span>} placeholder='Chọn ngày lắp đặt' type='date' name='installedDate' />
							</div>

							<Select
								placeholder='Lựa chọn'
								label={<span>Người lắp đặt / Người thanh toán</span>}
								value={form?.userInstallUuid}
								options={users}
								onSelect={(data) =>
									setForm((prev) => ({
										...prev,
										userInstallUuid: data.uuid,
									}))
								}
								getOptionLabel={(opt) => opt.name}
								getOptionValue={(opt) => opt.uuid}
							/>
						</GridColumn>
					</div>
				</WrapperForm>
			</WrapperFormPostion>
			/
		</Form>
	);
}

export default FormCreateMeter;

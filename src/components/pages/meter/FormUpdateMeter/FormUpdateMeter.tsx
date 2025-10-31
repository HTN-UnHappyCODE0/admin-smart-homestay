import Form, {ContextForm, Input, Select} from '~/components/common/Form';
import styles from './FormUpdateMeter.module.scss';
import {PropsFormUpdateMeter} from './interfaces';
import {useState} from 'react';
import Loading from '~/components/common/Loading';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import WrapperForm from '~/components/utils/WrapperForm';
import GridColumn from '~/components/layouts/GridColumn';
import {CONFIG_PAGING, CONFIG_TYPE_FINDING, QUERY_KEY, STATUS_CONFIG, TYPE_USER} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import meterTypeServices from '~/services/meterTypeServices';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import apartmentServices from '~/services/apartmentServices';
import {getDetailAddress} from '~/common/funcs/optionConvert';
import userServices from '~/services/userServices';
import {useRouter} from 'next/router';
import meterServices from '~/services/meterServices';

export interface IFormUpdateMeter {
	name: string;
	meterType: string;
	serialNumber: string;
	apartmentUuid: string;
	address: string;
	userInstallUuid: string;
	installedDate: string;
}

const initForm: IFormUpdateMeter = {
	name: '',
	meterType: '',
	serialNumber: '',
	apartmentUuid: '',
	address: '',
	userInstallUuid: '',
	installedDate: '',
};

function FormUpdateMeter({onClose}: PropsFormUpdateMeter) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuidUpdate} = router.query;
	const [form, setForm] = useState<IFormUpdateMeter>(initForm);

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
					typeFinding: CONFIG_TYPE_FINDING.CATALOG,
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
					typeFinding: CONFIG_TYPE_FINDING.CATALOG,
					page: 1,
					pageSize: 100,
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
					state: null,
					sizeFrom: null,
					sizeTo: null,
					province: '',
					ward: '',
					hasElectricMeter: null,
					hasWaterMeter: null,
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
					typeFinding: CONFIG_TYPE_FINDING.CATALOG,
					type: [TYPE_USER.USER, TYPE_USER.STAFF, TYPE_USER.MANAGE, TYPE_USER.APARTMENT_OWNER, TYPE_USER.ADMINISTRATOR],
					userUuid: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	useQuery<{
		name: string;
		meterType: string;
		serialNumber: string;
		apartmentUuid: string;
		address: string;
		userInstallUuid: string;
		installedDate: string;
	}>([QUERY_KEY.detail_meter, _uuidUpdate], {
		queryFn: () =>
			httpRequest({
				http: meterServices.meterDetail({
					uuid: _uuidUpdate as string,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({
					name: '',
					meterType: data.meterType,
					serialNumber: data.serialNumber,
					apartmentUuid: '',
					address: '',
					userInstallUuid: '',
					installedDate: '',
				});
			}
		},
		select(data) {
			return data;
		},
		enabled: !!_uuidUpdate,
	});

	return (
		<Form form={form} setForm={setForm}>
			<Loading loading={false} />
			<WrapperFormPostion
				width={1200}
				title='Chỉnh sửa thiết bị'
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

export default FormUpdateMeter;

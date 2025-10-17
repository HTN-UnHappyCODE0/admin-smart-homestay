import {useState} from 'react';
import styles from './FormCreateApartment.module.scss';
import {IDataUploadFile, PropsFormCreateApartment} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Header from '~/components/utils/Header';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import WrapperForm from '~/components/utils/WrapperForm';
import Form, {ContextForm, Input, Select, TextArea} from '~/components/common/Form';
import GridColumn from '~/components/layouts/GridColumn';
import UploadMultipleFile from '~/components/common/UploadMultipleFile';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import {useRouter} from 'next/router';
import {CONFIG_PAGING, CONFIG_TYPE_FIND, QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import {useQuery} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import apartmentTypeServices from '~/services/apartmentTypeServices';
import userServices from '~/services/userServices';
import lockServices from '~/services/lockServices';
import provinceServiecs from '~/services/provinceServices';

export interface IFormCreateApartment {
	name: string;
	apartmentTypeUuid: string;
	ownerUuid: string;
	apartmentSize: string;
	managerUuid: string;
	lockUuid: string;
	provinceId: string;
	wardId: string;
	address: string;
}

const initForm: IFormCreateApartment = {
	name: '',
	apartmentTypeUuid: '',
	ownerUuid: '',
	apartmentSize: '0',
	managerUuid: '',
	lockUuid: '',
	provinceId: '',
	wardId: '',
	address: '',
};

function FormCreateApartment({}: PropsFormCreateApartment) {
	const router = useRouter();

	const [images, setImages] = useState<IDataUploadFile[]>([]);
	const [form, setForm] = useState<IFormCreateApartment>(initForm);

	const {data: apartmentTypes = []} = useQuery<
		{
			uuid: string;
			code: string;
			name: string;
		}[]
	>([QUERY_KEY.dropdown_apartment_type], {
		queryFn: () =>
			httpRequest({
				http: apartmentTypeServices.listApartmentType({
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
					isPaging: CONFIG_PAGING.NO_PAGING,
					typeFinding: CONFIG_TYPE_FIND.DROPDOWN,
					page: 1,
					pageSize: 100,
					keyword: '',
					hasRented: 0,
					status: STATUS_CONFIG.ACTIVE,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const {data: locks = []} = useQuery<
		{
			uuid: string;
			code: string;
			name: string;
		}[]
	>([QUERY_KEY.dropdown_lock], {
		queryFn: () =>
			httpRequest({
				http: lockServices.listActiveLock({
					isPaging: CONFIG_PAGING.NO_PAGING,
					page: 1,
					pageSize: 100,
					keyword: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	const {data: provinces = []} = useQuery<
		{
			code: string;
			fullName: string;
			fullNameEn: string;
		}[]
	>([QUERY_KEY.dropdown_province], {
		queryFn: () =>
			httpRequest({
				http: provinceServiecs.listProvince({
					keyword: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	const {data: wards = []} = useQuery<
		{
			code: string;
			fullName: string;
			fullNameEn: string;
		}[]
	>([QUERY_KEY.dropdown_ward, form.provinceId], {
		queryFn: () =>
			httpRequest({
				http: provinceServiecs.listWard({
					keyword: '',
					provinceCode: form.provinceId,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!form.provinceId,
	});

	return (
		<Form heightFull={true} form={form} setForm={setForm} onSubmit={() => {}}>
			<FlexLayout column gap-12>
				<Header title='Thêm mới căn hộ' />
				<Breadcrumb
					listUrls={[
						{
							title: 'Danh sách căn hộ',
							path: PATH.Home,
						},
						{
							path: '',
							title: 'Chi tiết căn hộ',
						},
					]}
					actions={
						<FlexLayout row gap-6>
							<Button p_8_24 rounded_8 white bold onClick={() => router.back()}>
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
				/>

				<FlexItem flex-1 overflow-x>
					<FlexLayout column gap-12>
						<WrapperForm title='Thông tin căn hộ'>
							<div className={styles.form}>
								<GridColumn col_3>
									<Input
										name='name'
										type='text'
										isBlur={true}
										isRequired={true}
										label={
											<span>
												Tên căn hộ <span style={{color: 'red'}}>* </span>
											</span>
										}
										placeholder='Nhập tên căn hộ'
									/>
									<Select
										placeholder='Lựa chọn'
										label={
											<span>
												Loại hình căn hộ <span style={{color: 'red'}}>* </span>
											</span>
										}
										value={form.apartmentTypeUuid}
										options={apartmentTypes}
										onSelect={(data) =>
											setForm((prev) => ({
												...prev,
												apartmentTypeUuid: data.uuid,
											}))
										}
										getOptionLabel={(opt) => opt.name}
										getOptionValue={(opt) => opt.uuid}
									/>

									<div>
										<Select
											placeholder='Lựa chọn'
											label={
												<span>
													Chủ căn hộ <span style={{color: 'red'}}>* </span>
												</span>
											}
											value={form.ownerUuid}
											options={users}
											onSelect={(data) =>
												setForm((prev) => ({
													...prev,
													ownerUuid: data.uuid,
												}))
											}
											getOptionLabel={(opt) => opt.name}
											getOptionValue={(opt) => opt.uuid}
										/>
									</div>

									<Input
										name='apartmentSize'
										label={
											<span>
												Diện tích <span style={{color: 'red'}}>*</span>
											</span>
										}
										placeholder='Nhập diện tích'
										type='text'
										isRequired
										isBlur
										isMoney
										unit='M2'
									/>

									<Select
										placeholder='Lựa chọn'
										label={
											<span>
												Người quản lý <span style={{color: 'red'}}>* </span>
											</span>
										}
										value={form.managerUuid}
										options={users}
										onSelect={(data) =>
											setForm((prev) => ({
												...prev,
												managerUuid: data.uuid,
											}))
										}
										getOptionLabel={(opt) => opt.name}
										getOptionValue={(opt) => opt.uuid}
									/>

									<div>
										<Select
											placeholder='Lựa chọn'
											label={
												<span>
													ID ổ khóa <span style={{color: 'red'}}>* </span>
												</span>
											}
											value={form.lockUuid}
											options={locks}
											onSelect={(data) =>
												setForm((prev) => ({
													...prev,
													lockUuid: data.uuid,
												}))
											}
											getOptionLabel={(opt) => opt.code}
											getOptionValue={(opt) => opt.uuid}
										/>
									</div>

									<Select
										placeholder='Lựa chọn'
										label={
											<span>
												Tỉnh/TP <span style={{color: 'red'}}>* </span>
											</span>
										}
										value={form.provinceId}
										options={provinces}
										onSelect={(data) =>
											setForm((prev) => ({
												...prev,
												provinceId: data.code,
												wardId: '',
											}))
										}
										getOptionLabel={(opt) => opt.fullName}
										getOptionValue={(opt) => opt.code}
									/>

									<div>
										<Select
											placeholder='Lựa chọn'
											label={
												<span>
													Xã/Phường <span style={{color: 'red'}}>* </span>
												</span>
											}
											value={form.wardId}
											options={wards}
											onSelect={(data) =>
												setForm((prev) => ({
													...prev,
													wardId: data.code,
												}))
											}
											getOptionLabel={(opt) => opt.fullName}
											getOptionValue={(opt) => opt.code}
										/>
									</div>

									<Input
										name='address'
										type='text'
										isBlur={true}
										label={<span>Địa chỉ chi tiết</span>}
										placeholder='Nhập địa chỉ chi tiết'
									/>
								</GridColumn>

								<div style={{marginTop: '16px'}}>
									<TextArea name='description' placeholder='Nhập mô tả' label='Mô tả chi tiết' />
								</div>

								<div style={{marginTop: '16px'}}>
									<UploadMultipleFile
										label={
											<span>
												Hình ảnh đính kèm <span style={{color: 'red'}}>*</span>
											</span>
										}
										images={images}
										setImages={setImages}
									/>
								</div>
							</div>
						</WrapperForm>

						{/* Danh sách phòng trong căn hộ */}
						{/* <WrapperForm title='Danh sách phòng trong căn hộ'>
							{form.rooms.map((room, index) => (
								<GridColumn key={index} col_2 style={{marginBottom: '12px'}}>
									<Input
										value={room.name}
										readOnly
										label={<span>Loại phòng</span>}
										name={`roomName-${index}`}
										placeholder='Loại phòng'
										type='text'
									/>

									<div>
										<Input
											value={room.quantity}
											label={<span>Số lượng</span>}
											name={`roomQuantity-${index}`}
											placeholder='Số lượng'
											type='text'
										/>
									</div>
								</GridColumn>
							))}
						</WrapperForm> */}

						{/* Danh sách nội thất */}
						<WrapperForm title='Danh sách nội thất'>Main</WrapperForm>

						{/* Danh sách thiết bị */}
						<WrapperForm title='Danh sách thiết bị'>Main</WrapperForm>
					</FlexLayout>
				</FlexItem>
			</FlexLayout>
		</Form>
	);
}

export default FormCreateApartment;

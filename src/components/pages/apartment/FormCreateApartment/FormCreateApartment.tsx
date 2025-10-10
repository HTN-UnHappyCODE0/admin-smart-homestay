import {Fragment, useState} from 'react';
import styles from './FormCreateApartment.module.scss';
import {IDataUploadFile, IFormCreateApartment, PropsFormCreateApartment} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Header from '~/components/utils/Header';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import WrapperForm from '~/components/utils/WrapperForm';
import Form, {Input, Select, TextArea} from '~/components/common/Form';
import GridColumn from '~/components/layouts/GridColumn';
import UploadMultipleFile from '~/components/common/UploadMultipleFile';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import {useRouter} from 'next/router';

function FormCreateApartment({}: PropsFormCreateApartment) {
	const router = useRouter();

	const [form, setForm] = useState<IFormCreateApartment>({
		name: '',
		apartmentTypeUu: '',
		owner: '',
		apartmentSize: 0,
		managerUu: '',
		lock: '',
		provinceId: '',
		wardId: '',
		address: '',
		description: '',

		rooms: [
			{name: 'Phòng ngủ', quantity: ''},
			{name: 'Phòng khách', quantity: ''},
			{name: 'Phòng bếp', quantity: ''},
		],
	});

	const [images, setImages] = useState<IDataUploadFile[]>([]);

	const resetForm = () => {
		setForm({
			name: '',
			apartmentTypeUu: '',
			owner: '',
			apartmentSize: 0,
			managerUu: '',
			lock: '',
			provinceId: '',
			wardId: '',
			address: '',
			description: '',
			rooms: [
				{name: 'Phòng ngủ', quantity: ''},
				{name: 'Phòng khách', quantity: ''},
			],
		});
	};

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
							<Button p_8_24 rounded_8 bright-cyan bold>
								Lưu lại
							</Button>
						</FlexLayout>
					}
				/>

				<FlexItem flex-1 overflow-x>
					<FlexLayout column gap-12>
						<WrapperForm title='Thông tin căn hộ'>
							<div className={styles.form}>
								<GridColumn col_3>
									<Input
										value={form.name}
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
										value={form.apartmentTypeUu}
										options={[
											{uuid: '1', name: 'Căn hộ chung cư'},
											{uuid: '2', name: 'Biệt thự'},
										]}
										onSelect={(data) => setForm({...form, apartmentTypeUu: data.uuid})}
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
											value={form.owner}
											onClean={() =>
												setForm((prev) => ({
													...prev,
													type: '',
												}))
											}
											options={[
												{uuid: '1', name: 'Chủ sở hữu 1'},
												{uuid: '2', name: 'Chủ sở hữu 2'},
											]}
											onSelect={(data) => setForm({...form, owner: data.uuid})}
											getOptionLabel={(opt) => opt.name}
											getOptionValue={(opt) => opt.uuid}
										/>
									</div>
								</GridColumn>

								<div style={{marginTop: '16px'}}>
									<GridColumn col_3>
										<Input
											name='apartmentSize'
											value={form.apartmentSize}
											label={
												<span>
													Diện tích <span style={{color: 'red'}}>*</span>
												</span>
											}
											placeholder='Nhập diện tích'
											type='text'
											onClean
											isRequired
											isBlur
											showDone
											unit='M2'
										/>

										<Select
											placeholder='Lựa chọn'
											label={
												<span>
													Người quản lý <span style={{color: 'red'}}>* </span>
												</span>
											}
											value={form.managerUu}
											onClean={() =>
												setForm((prev) => ({
													...prev,
													type: '',
												}))
											}
											options={[
												{uuid: '1', name: 'Người quản lý 1'},
												{uuid: '2', name: 'Người quản lý 2'},
											]}
											onSelect={(data) => setForm({...form, managerUu: data.uuid})}
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
												value={form.lock}
												onClean={() =>
													setForm((prev) => ({
														...prev,
														type: '',
													}))
												}
												options={[
													{uuid: '1', name: 'ID ổ khóa 1'},
													{uuid: '2', name: 'ID ổ khóa 2'},
												]}
												onSelect={(data) => setForm({...form, lock: data.uuid})}
												getOptionLabel={(opt) => opt.name}
												getOptionValue={(opt) => opt.uuid}
											/>
										</div>
									</GridColumn>
								</div>

								<div style={{marginTop: '16px'}}>
									<GridColumn col_3>
										<Select
											placeholder='Lựa chọn'
											label={
												<span>
													Tỉnh/TP <span style={{color: 'red'}}>* </span>
												</span>
											}
											value={form.provinceId}
											onClean={() =>
												setForm((prev) => ({
													...prev,
													provinceId: '',
													type: '',
												}))
											}
											options={[
												{uuid: '1', matp: 'Tỉnh/TP 1'},
												{uuid: '2', matp: 'Tỉnh/TP 2'},
											]}
											onSelect={(data) => setForm({...form, provinceId: data.uuid})}
											getOptionLabel={(opt) => opt.matp}
											getOptionValue={(opt) => opt.uuid}
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
												onClean={() =>
													setForm((prev) => ({
														...prev,
														provinceId: '',
														wardId: '',
													}))
												}
												options={[
													{uuid: '1', xaid: 'Xã/Phường 1'},
													{uuid: '2', xaid: 'Xã/Phường 2'},
												]}
												onSelect={(data) => setForm({...form, wardId: data.uuid})}
												getOptionLabel={(opt) => opt.xaid}
												getOptionValue={(opt) => opt.uuid}
											/>
										</div>

										<Input
											name='address'
											value={form.address}
											type='text'
											isBlur={true}
											isRequired={true}
											label={
												<span>
													Địa chỉ chi tiết <span style={{color: 'red'}}>* </span>
												</span>
											}
											placeholder='Nhập địa chỉ chi tiết'
										/>
									</GridColumn>
								</div>

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
						<WrapperForm title='Danh sách phòng trong căn hộ'>
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
						</WrapperForm>

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

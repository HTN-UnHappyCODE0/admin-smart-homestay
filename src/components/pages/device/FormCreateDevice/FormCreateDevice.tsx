import styles from './FormCreateDevice.module.scss';
import {ICreateDevice, PropsFormCreateDevice} from './interfaces';
import {useState} from 'react';
import Form, {ContextForm, Input, Select} from '~/components/common/Form';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import WrapperForm from '~/components/utils/WrapperForm';
import GridColumn from '~/components/layouts/GridColumn';

function FormCreateDevice({onClose}: PropsFormCreateDevice) {
	const [form, setForm] = useState<ICreateDevice>({
		name: '',
		description: '',
		codeConnection: '',
		codeApartment: '',
		nameApartment: '',
		address: '',
		date: '',
		installer: '',
	});

	return (
		<Form form={form} setForm={setForm} onSubmit={() => {}}>
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
					<GridColumn col_2>
						<Select
							placeholder='Nhập'
							label={
								<span>
									Nhập tên thiết bị <span style={{color: 'red'}}>* </span>
								</span>
							}
							value={form.name}
							options={[
								{uuid: '1', name: 'Tủ lạnh'},
								{uuid: '2', name: 'Tivi'},
							]}
							onSelect={(data) => setForm({...form, name: data.uuid})}
							getOptionLabel={(opt) => opt.name}
							getOptionValue={(opt) => opt.uuid}
						/>

						<div>
							<Input
								label={
									<span>
										Mã kết nối <span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Nhập mã kết nối'
								type='text'
								value={form.codeConnection}
								name='codeConnection'
								onClean
								isRequired
								isBlur
							/>
						</div>
					</GridColumn>

					<div style={{marginTop: '16px'}}>
						<GridColumn col_2>
							<Select
								placeholder='Nhập'
								label={
									<span>
										Mã căn hộ <span style={{color: 'red'}}>* </span>
									</span>
								}
								value={form.codeApartment}
								options={[
									{uuid: '1', code: 'MT001'},
									{uuid: '2', code: 'MT002'},
								]}
								onSelect={(data) => setForm({...form, codeApartment: data.uuid})}
								getOptionLabel={(opt) => opt.code}
								getOptionValue={(opt) => opt.uuid}
							/>

							<div>
								<Input
									label={
										<span>
											Tên căn hộ <span style={{color: 'red'}}>*</span>
										</span>
									}
									placeholder='-'
									type='text'
									value={form.nameApartment}
									name='nameApartment'
									onClean
									isRequired
									isBlur
									readOnly
								/>
							</div>
						</GridColumn>
					</div>

					<div style={{marginTop: '16px'}}>
						<Input
							label={
								<span>
									Địa chỉ chi tiết <span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='-'
							type='text'
							value={form.address}
							name='address'
							onClean
							isRequired
							isBlur
							readOnly
						/>
					</div>

					<div style={{marginTop: '16px'}}>
						<GridColumn col_2>
							<Input
								label={
									<span>
										Ngày lắp đặt <span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='-'
								type='date'
								value={form.date}
								name='date'
								onClean
								isRequired
								isBlur
							/>

							<div>
								<Select
									placeholder='Nhập'
									label={
										<span>
											Người lắp đặt/Người thanh toán <span style={{color: 'red'}}>* </span>
										</span>
									}
									value={form.installer}
									options={[
										{uuid: '1', name: 'Đặng Bá Trường'},
										{uuid: '2', name: 'Hoàng Tuấn Nam'},
									]}
									onSelect={(data) => setForm({...form, installer: data.uuid})}
									getOptionLabel={(opt) => opt.name}
									getOptionValue={(opt) => opt.uuid}
								/>
							</div>
						</GridColumn>
					</div>
				</WrapperForm>
			</WrapperFormPostion>
		</Form>
	);
}

export default FormCreateDevice;

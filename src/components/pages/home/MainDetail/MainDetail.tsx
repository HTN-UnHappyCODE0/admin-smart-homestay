import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import styles from './MainDetail.module.scss';
import {PropsMainDetail} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import {useState} from 'react';
import Form, {Input, Select, TextArea} from '~/components/common/Form';
import WrapperForm from '~/components/utils/WrapperForm';
import UploadMultipleFile from '~/components/common/UploadMultipleFile';
import {IDataUploadFile} from '~/components/common/UploadMultipleFile/interfaces';
import InfoDetail from '~/components/utils/InfoDetail';
import StateActive from '~/components/utils/StateActive';
import GridColumn from '~/components/layouts/GridColumn';
import {Copy} from 'iconsax-react';
import Tippy from '@tippyjs/react';
import {copy} from '~/common/funcs/copy';
import SwitchButton from '~/components/common/SwitchButton';

function MainDetail({}: PropsMainDetail) {
	const [images, setImages] = useState<IDataUploadFile[]>([]);

	const [form, setForm] = useState<{name: string; type: string; description: string}>({name: '', type: '', description: ''});

	return (
		<WrapperFormPostion
			width={1200}
			title='Thêm danh mục'
			actions={
				<FlexLayout row gap-8>
					<Button p_8_24 rounded_8 white bold>
						Hủy bỏ
					</Button>
					<Button p_8_24 rounded_8 bright-cyan bold>
						Lưu lại
					</Button>
				</FlexLayout>
			}
			nodes={
				<FlexLayout row gap-8>
					<p>Trạng thái yêu cầu:</p>
				</FlexLayout>
			}
		>
			<Form form={form} setForm={setForm}>
				<WrapperForm title='Thông tin căn hộ' actions={<p>Thêm loại phòng </p>}>
					<Input
						label={
							<span>
								Tên chủ hộ <span style={{color: 'red'}}>*</span>
							</span>
						}
						placeholder='Nhập tên chủ hộ'
						type='text'
						name='name'
						onClean
						isRequired
						isBlur
						showDone
						unit='M2'
					/>
					<div style={{marginTop: '16px'}}>
						<Select
							placeholder='Lựa chọn'
							label={
								<span>
									Loại <span style={{color: 'red'}}>*</span>
								</span>
							}
							onClean={() =>
								setForm((prev) => ({
									...prev,
									type: '',
								}))
							}
							value={form.type}
							options={[
								{
									uuid: '1',
									title: 'Loại 1',
								},
								{
									uuid: '2',
									title: 'Loại 2',
								},
							]}
							getOptionLabel={(opt) => opt.title}
							getOptionValue={(opt) => opt.uuid}
							onSelect={(opt) => {
								setForm((prev) => ({
									...prev,
									type: opt.uuid,
								}));
							}}
						/>
					</div>
					<div style={{marginTop: '16px'}}>
						<TextArea name='description' placeholder='Nhập ghi chú' label='Ghi chú' />
					</div>
				</WrapperForm>

				<WrapperForm title='Thông tin căn hộ' actions={<p>Thêm loại phòng</p>}>
					<Input
						label={
							<span>
								Tên chủ hộ <span style={{color: 'red'}}>*</span>
							</span>
						}
						placeholder='Nhập tên chủ hộ'
						type='text'
						name='name'
						onClean
						isRequired
						isBlur
						showDone
						action={
							<Tippy content='Sao chép tên chủ hộ'>
								<div className={styles.btn_copy} onClick={() => copy('Đặng Bá Trường', 'Sao chép tên chủ hộ thành công!')}>
									<Copy size={24} color='#06AED4' />
								</div>
							</Tippy>
						}
					/>

					<div style={{marginTop: '16px'}}>
						<UploadMultipleFile
							label={
								<span>
									Tên chủ hộ <span style={{color: 'red'}}>*</span>
								</span>
							}
							images={images}
							setImages={setImages}
						/>
					</div>
				</WrapperForm>

				<WrapperForm
					title='Thông tin căn hộ'
					actions={
						<FlexLayout row gap-6 items-center>
							<p
								style={{
									color: '#202939',
									fontSize: '14px',
									fontWeight: '500',
								}}
							>
								24/08/2025
							</p>
							<div
								style={{
									width: '8px',
									height: '8px',
									borderRadius: '50%',
									background: '#9AA4B2',
								}}
							></div>
							<StateActive
								isSmall={true}
								stateActive={1}
								listState={[
									{
										backgroundColor: '#06AED4',
										state: 1,
										text: 'Hoạt động',
										textColor: '#fff',
									},
									{
										backgroundColor: '#EE0033',
										state: 2,
										text: 'Bị khóa',
										textColor: '#fff',
									},
								]}
							/>
						</FlexLayout>
					}
				>
					<GridColumn col_4>
						<InfoDetail name='Mã căn hộ' value={235532} />
						<InfoDetail name='Tên căn hộ' value='TH3-042024' />
						<InfoDetail name='Aptomat' value='Căn hộ dịch vụ' actions={<SwitchButton checkOn={true} />} />
						<InfoDetail
							name='Trạng thái'
							value={
								<StateActive
									isSmall={true}
									stateActive={1}
									listState={[
										{
											backgroundColor: '#06AED4',
											state: 1,
											text: 'Hoạt động',
											textColor: '#fff',
										},
										{
											backgroundColor: '#EE0033',
											state: 2,
											text: 'Bị khóa',
											textColor: '#fff',
										},
									]}
								/>
							}
						/>

						<InfoDetail
							name='Ảnh căn hộ'
							value=''
							images={[
								'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
								'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
								'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
							]}
						/>
					</GridColumn>
				</WrapperForm>
			</Form>
		</WrapperFormPostion>
	);
}

export default MainDetail;

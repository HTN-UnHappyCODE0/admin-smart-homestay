import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import styles from './MainDetail.module.scss';
import {PropsMainDetail} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import {useState} from 'react';
import Form, {Input, Select, TextArea} from '~/components/common/Form';
import WrapperForm from '~/components/utils/WrapperForm';

function MainDetail({}: PropsMainDetail) {
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
		>
			<Form form={form} setForm={setForm}>
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
						unit='M2'
					/>
				</WrapperForm>
			</Form>
		</WrapperFormPostion>
	);
}

export default MainDetail;

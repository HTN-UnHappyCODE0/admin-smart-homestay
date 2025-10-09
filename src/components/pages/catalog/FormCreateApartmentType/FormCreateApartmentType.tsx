import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import styles from './FormCreateApartmentType.module.scss';
import {PropsFormCreateApartmentType} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import Form, {Input, TextArea} from '~/components/common/Form';
import WrapperForm from '~/components/utils/WrapperForm';
import {useState} from 'react';

function FormCreateApartmentType({}: PropsFormCreateApartmentType) {
	const [form, setForm] = useState<{name: string; description: string}>({name: '', description: ''});

	return (
		<WrapperFormPostion
			width={540}
			title='Thêm loại hình căn hộ'
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
				<WrapperForm title='Thông tin căn hộ'>
					<Input
						label={
							<span>
								Tên loại hình căn hộ <span style={{color: 'red'}}>*</span>
							</span>
						}
						placeholder='Nhập tên loại hình căn hộ'
						type='text'
						name='name'
						onClean
						isRequired
						isBlur
						showDone
					/>
					<div style={{marginTop: '16px'}}>
						<TextArea name='description' placeholder='Nhập ghi chú' label='Ghi chú' />
					</div>
				</WrapperForm>
			</Form>
		</WrapperFormPostion>
	);
}

export default FormCreateApartmentType;

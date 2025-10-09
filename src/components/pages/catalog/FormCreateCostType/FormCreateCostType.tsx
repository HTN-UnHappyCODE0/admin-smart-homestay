import {useState} from 'react';
import styles from './FormCreateCostType.module.scss';
import {PropsFormCreateCostType} from './interfaces';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import Form, {Input, TextArea} from '~/components/common/Form';
import WrapperForm from '~/components/utils/WrapperForm';

function FormCreateCostType({}: PropsFormCreateCostType) {
	const [form, setForm] = useState<{name: string; description: string}>({name: '', description: ''});

	return (
		<WrapperFormPostion
			width={540}
			title='Thêm loại chi phí'
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
								Tên loại chi phí<span style={{color: 'red'}}>*</span>
							</span>
						}
						placeholder='Nhập tên loại chi phí'
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

export default FormCreateCostType;

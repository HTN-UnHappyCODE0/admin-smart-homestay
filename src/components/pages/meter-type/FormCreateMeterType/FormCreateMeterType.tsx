import Form, {ContextForm, Input, TextArea} from '~/components/common/Form';
import styles from './FormCreateMeterType.module.scss';
import {PropsFormCreateMeterType} from './interfaces';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import WrapperForm from '~/components/utils/WrapperForm';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import Loading from '~/components/common/Loading';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {httpRequest} from '~/services';
import meterTypeServices from '~/services/meterTypeServices';
import {QUERY_KEY} from '~/constants/config/enum';

function FormCreateMeterType({onClose}: PropsFormCreateMeterType) {
	const queryClient = useQueryClient();

	const [form, setForm] = useState<{name: string; description: string}>({name: '', description: ''});

	const funcCreateRoom = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm loại thiết bị thành công!',
				http: meterTypeServices.createMeterType({
					name: form.name,
					description: form.description,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({name: '', description: ''});
				onClose();
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_meter_type],
				});
			}
		},
	});

	return (
		<Form form={form} setForm={setForm} onSubmit={funcCreateRoom.mutate}>
			<Loading loading={funcCreateRoom.isLoading} />
			<WrapperFormPostion
				width={540}
				title='Thêm loại thiết bị'
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
				<WrapperForm title='Thông tin loại thiết bị'>
					<Input
						label={
							<span>
								Tên loại thiết bị<span style={{color: 'red'}}>*</span>
							</span>
						}
						placeholder='Nhập tên loại thiết bị'
						type='text'
						name='name'
						onClean
						isRequired
						isBlur
					/>
					<div style={{marginTop: '16px'}}>
						<TextArea name='description' placeholder='Nhập ghi chú' label='Ghi chú' />
					</div>
				</WrapperForm>
			</WrapperFormPostion>
		</Form>
	);
}

export default FormCreateMeterType;

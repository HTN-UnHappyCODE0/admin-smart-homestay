import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import styles from './FormCreateRoomType.module.scss';
import {PropsFormCreateRoomType} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import {useState} from 'react';
import Form, {ContextForm, Input, TextArea} from '~/components/common/Form';
import WrapperForm from '~/components/utils/WrapperForm';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import roomServices from '~/services/roomServices';
import {QUERY_KEY} from '~/constants/config/enum';
import Loading from '~/components/common/Loading';

function FormCreateRoomType({onClose}: PropsFormCreateRoomType) {
	const queryClient = useQueryClient();

	const [form, setForm] = useState<{name: string; description: string}>({name: '', description: ''});

	const funcCreateRoom = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm loại phòng thành công!',
				http: roomServices.createRoom({
					name: form.name,
					description: form.description,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({name: '', description: ''});
				onClose();
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_room_type],
				});
			}
		},
	});

	return (
		<Form form={form} setForm={setForm} onSubmit={funcCreateRoom.mutate}>
			<Loading loading={funcCreateRoom.isLoading} />
			<WrapperFormPostion
				width={540}
				title='Thêm loại chi phí'
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
				<WrapperForm title='Thông tin loại phòng'>
					<Input
						label={
							<span>
								Tên loại phòng<span style={{color: 'red'}}>*</span>
							</span>
						}
						placeholder='Nhập tên loại phòng'
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

export default FormCreateRoomType;

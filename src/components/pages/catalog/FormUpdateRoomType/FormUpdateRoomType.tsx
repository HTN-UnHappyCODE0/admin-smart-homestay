import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import styles from './PropsFormUpdateRoomType.module.scss';
import {PropsFormUpdateRoomType} from './interfaces/index';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import Form, {ContextForm, Input, TextArea} from '~/components/common/Form';
import WrapperForm from '~/components/utils/WrapperForm';
import {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import apartmentTypeServices from '~/services/apartmentTypeServices';
import {QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import Loading from '~/components/common/Loading';
import {useRouter} from 'next/router';
import roomServices from '~/services/roomServices';

function FormUpdateRoomType({onClose}: PropsFormUpdateRoomType) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuidUpdate} = router.query;

	const [form, setForm] = useState<{name: string; description: string}>({name: '', description: ''});

	useQuery<{name: string; description: string; id: number; uuid: string; status: number}>([QUERY_KEY.detail_room_type, _uuidUpdate], {
		queryFn: () =>
			httpRequest({
				http: roomServices.detailRoom({
					uuid: _uuidUpdate as string,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({
					name: data.name,
					description: data.description || '',
				});
			}
		},
		select(data) {
			return data;
		},
		enabled: !!_uuidUpdate,
	});

	const funcUpdateRoom = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa loại hình căn hộ thành công!',
				http: roomServices.updateRoom({
					uuid: _uuidUpdate as string,
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
		<Form form={form} setForm={setForm} onSubmit={funcUpdateRoom.mutate}>
			<Loading loading={funcUpdateRoom.isLoading} />
			<WrapperFormPostion
				width={540}
				title='Chỉnh sửa loại hình căn hộ'
				actions={
					<FlexLayout row gap-8>
						<Button p_8_24 rounded_8 white bold onClick={onClose}>
							Hủy bỏ
						</Button>
						<ContextForm.Consumer>
							{({isDone}) => (
								<Button disable={!isDone} p_8_24 rounded_8 bright-cyan bold>
									Cập nhật
								</Button>
							)}
						</ContextForm.Consumer>
					</FlexLayout>
				}
			>
				<WrapperForm title='Thông tin căn hộ'>
					<Input
						label={
							<span>
								Tên loại phòng <span style={{color: 'red'}}>*</span>
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

export default FormUpdateRoomType;

import Form, {ContextForm, Input, TextArea} from '~/components/common/Form';
import styles from './FormUpdateMeterType.module.scss';
import {PropsFormUpdateMeterType} from './interfaces';
import Loading from '~/components/common/Loading';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import Button from '~/components/common/Button';
import FlexLayout from '~/components/layouts/FlexLayout';
import WrapperForm from '~/components/utils/WrapperForm';
import {useRouter} from 'next/router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {httpRequest} from '~/services';
import meterTypeServices from '~/services/meterTypeServices';
import {QUERY_KEY} from '~/constants/config/enum';

function FormUpdateMeterType({onClose}: PropsFormUpdateMeterType) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuidUpdate} = router.query;

	const [form, setForm] = useState<{name: string; description: string}>({name: '', description: ''});

	useQuery<{name: string; description: string; id: number; uuid: string; status: number}>([QUERY_KEY.detail_meter_type, _uuidUpdate], {
		queryFn: () =>
			httpRequest({
				http: meterTypeServices.detailMeterType({
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

	const funcUpdateMeterType = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa loại thiết bị thành công!',
				http: meterTypeServices.updateMeterType({
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
					queryKey: [QUERY_KEY.table_meter_type],
				});
			}
		},
	});

	return (
		<Form form={form} setForm={setForm} onSubmit={funcUpdateMeterType.mutate}>
			<Loading loading={funcUpdateMeterType.isLoading} />
			<WrapperFormPostion
				width={540}
				title='Chỉnh sửa loại thiết bị'
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
				<WrapperForm title='Thông tin loại thiết bị'>
					<Input
						label={
							<span>
								Tên loại phòng <span style={{color: 'red'}}>*</span>
							</span>
						}
						placeholder='Nhập tên loại thiết bị'
						type='text'
						name='name'
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

export default FormUpdateMeterType;

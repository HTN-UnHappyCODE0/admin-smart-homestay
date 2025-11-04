import {useState} from 'react';
import styles from './FormCreateCostType.module.scss';
import {PropsFormCreateCostType} from './interfaces';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import Form, {ContextForm, Input, Select, TextArea} from '~/components/common/Form';
import WrapperForm from '~/components/utils/WrapperForm';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import servicesTypeServices from '~/services/servicesTypeServices';
import {QUERY_KEY, TYPE_METER} from '~/constants/config/enum';
import Loading from '~/components/common/Loading';

function FormCreateCostType({onClose}: PropsFormCreateCostType) {
	const queryClient = useQueryClient();

	const [form, setForm] = useState<{name: string; description: string; type: number}>({
		name: '',
		description: '',
		type: TYPE_METER.OTHER,
	});

	const funcCreateRoom = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm loại phòng thành công!',
				http: servicesTypeServices.createServicesType({
					name: form?.name,
					description: form?.description,
					state: 1,
					type: form?.type,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({name: '', description: '', type: TYPE_METER.OTHER});
				onClose();
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_cost_type],
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
				<WrapperForm title='Thông tin chi phí'>
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
						<Select
							placeholder='Chọn loại dịch vụ'
							label={<span>Loại dịch vụ</span>}
							options={[
								{uuid: String(TYPE_METER.ELECTRIC), name: 'Điện'},
								{uuid: String(TYPE_METER.WATER), name: 'Nước'},
								{uuid: String(TYPE_METER.OTHER), name: 'Khác'},
							]}
							onSelect={(data) =>
								setForm((prev) => ({
									...prev,
									type: Number(data.uuid),
								}))
							}
							getOptionLabel={(opt) => opt.name}
							getOptionValue={(opt) => opt.uuid}
							value={String(form?.type)}
						/>
					</div>

					<div style={{marginTop: '16px'}}>
						<TextArea name='description' placeholder='Nhập ghi chú' label='Ghi chú' />
					</div>
				</WrapperForm>
			</WrapperFormPostion>
		</Form>
	);
}

export default FormCreateCostType;

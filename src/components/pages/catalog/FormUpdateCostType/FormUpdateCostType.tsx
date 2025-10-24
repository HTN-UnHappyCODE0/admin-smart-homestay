import {useState} from 'react';
import styles from './FormUpdateCostType.module.scss';
import {PropsFormUpdateCostType} from './interfaces';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import Form, {ContextForm, Input, TextArea} from '~/components/common/Form';
import WrapperForm from '~/components/utils/WrapperForm';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import servicesTypeServices from '~/services/servicesTypeServices';
import {QUERY_KEY} from '~/constants/config/enum';
import Loading from '~/components/common/Loading';
import {useRouter} from 'next/router';

function FormUpdateCostType({onClose}: PropsFormUpdateCostType) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuidUpdate} = router.query;

	const [form, setForm] = useState<{name: string; description: string}>({name: '', description: ''});

	useQuery<{name: string; description: string; id: number; uuid: string; status: number}>([QUERY_KEY.detail_cost_type, _uuidUpdate], {
		queryFn: () =>
			httpRequest({
				http: servicesTypeServices.detailServicesType({
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

	const funcUpdateCost = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa chi phí thành công!',
				http: servicesTypeServices.updateServicesType({
					uuid: _uuidUpdate as string,
					name: form.name,
					description: form.description,
					state: 1,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({name: '', description: ''});
				onClose();
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_cost_type],
				});
			}
		},
	});

	return (
		<Form form={form} setForm={setForm} onSubmit={funcUpdateCost.mutate}>
			<Loading loading={funcUpdateCost.isLoading} />
			<WrapperFormPostion
				width={600}
				title='Chỉnh sửa loại chi phí'
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
						<TextArea name='description' placeholder='Nhập ghi chú' label='Ghi chú' />
					</div>
				</WrapperForm>
			</WrapperFormPostion>
		</Form>
	);
}

export default FormUpdateCostType;

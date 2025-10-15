import {useState} from 'react';
import styles from './FormCreateFurniture.module.scss';
import {PropsFormCreateFurniture} from './interfaces';
import Form, {ContextForm, Input, TextArea} from '~/components/common/Form';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import WrapperForm from '~/components/utils/WrapperForm';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import furnitureServices from '~/services/furnitureServices';
import {QUERY_KEY} from '~/constants/config/enum';
import Loading from '~/components/common/Loading';

function FormCreateFurniture({onClose}: PropsFormCreateFurniture) {
	const queryClient = useQueryClient();

	const [form, setForm] = useState<{name: string; description: string; lastAdded: string}>({
		name: '',
		description: '',
		lastAdded: '',
	});

	const funcCreateFurniture = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageSuccess: true,
				showMessageFailed: true,
				msgSuccess: 'Thêm ổ nội thất thành công!',
				http: furnitureServices.createFurniture({
					name: form?.name,
					description: form?.description,
					lastAdded: form?.lastAdded,
				}),
			}),
		onSuccess(data) {
			if (data) {
				onClose();
				setForm({
					name: '',
					description: '',
					lastAdded: '',
				});
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_furniture],
				});
			}
		},
	});

	return (
		<Form form={form} setForm={setForm} onSubmit={funcCreateFurniture.mutate}>
			<Loading loading={funcCreateFurniture.isLoading} />
			<WrapperFormPostion
				width={840}
				title='Thêm nội thất'
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
				<WrapperForm title='Thông tin nội thất'>
					<Input
						label={
							<span>
								Tên nội thất <span style={{color: 'red'}}>*</span>
							</span>
						}
						placeholder='Nhập tên nội thất'
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

export default FormCreateFurniture;

import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import styles from './FormCreateApartmentType.module.scss';
import {PropsFormCreateApartmentType} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import Form, {ContextForm, Input, TextArea} from '~/components/common/Form';
import WrapperForm from '~/components/utils/WrapperForm';
import {useState} from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import apartmentTypeServices from '~/services/apartmentTypeServices';
import {QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import Loading from '~/components/common/Loading';

function FormCreateApartmentType({onClose}: PropsFormCreateApartmentType) {
	const queryClient = useQueryClient();

	const [form, setForm] = useState<{name: string; description: string}>({name: '', description: ''});

	const funcCreateApartmentType = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm loại hình căn hộ thành công!',
				http: apartmentTypeServices.createApartmentType({
					name: form.name,
					description: form.description,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({name: '', description: ''});
				onClose();
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_apartment_type],
				});
			}
		},
	});

	return (
		<Form form={form} setForm={setForm} onSubmit={funcCreateApartmentType.mutate}>
			<Loading loading={funcCreateApartmentType.isLoading} />
			<WrapperFormPostion
				width={540}
				title='Thêm loại hình căn hộ'
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
					/>
					<div style={{marginTop: '16px'}}>
						<TextArea name='description' placeholder='Nhập ghi chú' label='Ghi chú' />
					</div>
				</WrapperForm>
			</WrapperFormPostion>
		</Form>
	);
}

export default FormCreateApartmentType;

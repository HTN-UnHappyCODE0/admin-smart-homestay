import Form, {ContextForm, Input, TextArea} from '~/components/common/Form';
import styles from './FormCreateLock.module.scss';
import {PropsFormCreateLock} from './interfaces';
import {useState} from 'react';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import WrapperForm from '~/components/utils/WrapperForm';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import lockServices from '~/services/lockServices';
import {QUERY_KEY} from '~/constants/config/enum';
import Loading from '~/components/common/Loading';

function FormCreateLock({onClose}: PropsFormCreateLock) {
	const queryClient = useQueryClient();

	const [form, setForm] = useState<{serialNumber: string; apartmentUuid: string; defaultPassword: string; description: string}>({
		serialNumber: '',
		apartmentUuid: '',
		defaultPassword: '',
		description: '',
	});

	const funcCreateLock = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageSuccess: true,
				showMessageFailed: true,
				msgSuccess: 'Thêm ổ khóa thành công!',
				http: lockServices.createLock({
					serialNumber: form?.serialNumber,
					apartmentUuid: form?.apartmentUuid,
					defaultPassword: form?.defaultPassword,
					description: form?.description,
				}),
			}),
		onSuccess(data) {
			if (data) {
				onClose();
				setForm({
					serialNumber: '',
					apartmentUuid: '',
					defaultPassword: '',
					description: '',
				});
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_lock],
				});
			}
		},
	});

	return (
		<Form form={form} setForm={setForm} onSubmit={funcCreateLock.mutate}>
			<Loading loading={funcCreateLock.isLoading} />
			<WrapperFormPostion
				width={540}
				title='Thêm ổ khóa'
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
				<WrapperForm title='Thông tin ổ khóa'>
					<Input
						label={
							<span>
								ID ổ khóa <span style={{color: 'red'}}>*</span>
							</span>
						}
						placeholder='Nhập ID ổ khóa'
						type='text'
						name='serialNumber'
						onClean
						isRequired
						isBlur
					/>

					<Input
						label={
							<span>
								Mật khẩu <span style={{color: 'red'}}>*</span>
							</span>
						}
						placeholder='Nhập mật khẩu'
						type='password'
						name='defaultPassword'
						onClean
						isRequired
						isBlur
					/>
				</WrapperForm>
			</WrapperFormPostion>
		</Form>
	);
}

export default FormCreateLock;

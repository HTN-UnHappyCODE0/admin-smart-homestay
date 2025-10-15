import Form, {ContextForm, Input, TextArea} from '~/components/common/Form';
import styles from './FormUpdateFurniture.module.scss';
import {PropsFormUpdateFurniture} from './interfaces';
import {useState} from 'react';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import WrapperForm from '~/components/utils/WrapperForm';
import {useRouter} from 'next/router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import furnitureServices from '~/services/furnitureServices';
import Loading from '~/components/common/Loading';
import moment from 'moment';

function FormUpdateFurniture({onClose}: PropsFormUpdateFurniture) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuidUpdate} = router.query;

	const [form, setForm] = useState<{name: string; description: string; lastAdded: string}>({name: '', description: '', lastAdded: ''});

	useQuery<{name: string; description: string; uuid: string; lastAdded: string}>([QUERY_KEY.detail_furniture, _uuidUpdate], {
		queryFn: () =>
			httpRequest({
				http: furnitureServices.furnitureDetail({
					uuid: _uuidUpdate as string,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({
					name: data.name,
					description: data.description,
					lastAdded: data.lastAdded ? moment(data?.lastAdded).format('YYYY-MM-DD') : '',
				});
			}
		},
		select(data) {
			return data;
		},
		enabled: !!_uuidUpdate,
	});

	const funcUpdateFurniture = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa nội thất thành công!',
				http: furnitureServices.updateFurniture({
					name: form?.name,
					description: form?.description,
					uuid: _uuidUpdate as string,
					lastAdded: form?.lastAdded,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({name: '', description: '', lastAdded: ''});
				onClose();
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_furniture],
				});
			}
		},
	});

	return (
		<Form form={form} setForm={setForm} onSubmit={funcUpdateFurniture.mutate}>
			<Loading loading={funcUpdateFurniture.isLoading} />
			<WrapperFormPostion
				width={540}
				title='Chỉnh sửa nội thất'
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
					<Input
						label={<span>Ngày bổ sung</span>}
						placeholder='Ngày bổ sung'
						type='date'
						name='lastAdded'
						value={form?.lastAdded}
					/>
					<div style={{marginTop: '16px'}}>
						<TextArea name='description' placeholder='Nhập ghi chú' label='Ghi chú' />
					</div>
				</WrapperForm>
			</WrapperFormPostion>
		</Form>
	);
}

export default FormUpdateFurniture;

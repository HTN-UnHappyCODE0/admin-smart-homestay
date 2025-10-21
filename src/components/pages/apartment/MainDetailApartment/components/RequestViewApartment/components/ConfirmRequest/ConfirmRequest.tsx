import {useState} from 'react';
import styles from './ConfirmRequest.module.scss';
import {IDataUploadFile, PropsConfirmRequest} from './interfaces';
import Form, {ContextForm, Input} from '~/components/common/Form';
import {ShieldSecurity} from 'iconsax-react';
import Button from '~/components/common/Button';
import {IoClose} from 'react-icons/io5';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import lockServices from '~/services/lockServices';
import {QUERY_KEY} from '~/constants/config/enum';
import Loading from '~/components/common/Loading';
import UploadMultipleFile from '~/components/common/UploadMultipleFile';

function ConfirmRequest({uuidConfirm, onClose}: PropsConfirmRequest) {
	const queryClient = useQueryClient();
	const [images, setImages] = useState<IDataUploadFile[]>([]);

	const [form, setForm] = useState<{date: string; price: string; note: string}>({
		date: '',
		price: '',
		note: '',
	});

	const funcChangePassword = useMutation({
		// mutationFn: () =>
		// 	httpRequest({
		// 		showMessageSuccess: true,
		// 		showMessageFailed: true,
		// 		msgSuccess: 'Đổi mật khẩu thành công!',
		// 		http: lockServices.changeDefaultPassword({
		// 			lockUuid: uuidConfirm,
		// 			date: form?.date,
		// 			price: form?.price,
		// 		}),
		// 	}),
		// onSuccess(data) {
		// 	if (data) {
		// 		onClose();
		// 		setForm({
		// 			date: '',
		// 			price: '',
		// 			note: '',
		// 		});
		// 		queryClient.invalidateQueries({
		// 			queryKey: [QUERY_KEY.table_lock],
		// 		});
		// 	}
		// },
	});

	return (
		<Form form={form} setForm={setForm} onSubmit={funcChangePassword.mutate}>
			<Loading loading={funcChangePassword.isLoading} />
			<div className={styles.form_change_password}>
				<h4>Xác nhận đã xử lý</h4>
				<div className={styles.line}></div>
				<Input
					label={
						<span>
							Thời gian xử lý sự cố <span style={{color: 'red'}}>*</span>
						</span>
					}
					placeholder='Nhập thời gian xử lý sự cố'
					type='date'
					name='date'
					value={form?.date}
					onClean
					isRequired
					isBlur
					showDone
				/>

				<Input
					label={
						<span>
							Chi phí <span style={{color: 'red'}}>*</span>
						</span>
					}
					placeholder='Nhập chi phí'
					type='text'
					name='price'
					value={form?.price}
					onClean
					isRequired
					isBlur
					showDone
					unit='VND'
				/>

				<Input
					label={<span>Ghi chú</span>}
					placeholder='Ghi chú'
					type='text'
					name='note'
					value={form?.note}
					onClean
					isBlur
					showDone
				/>

				<div style={{marginTop: '16px'}}>
					<UploadMultipleFile
						label={
							<span>
								Hình ảnh bảo trì (tối đa 3 ảnh) <span style={{color: 'red'}}>*</span>
							</span>
						}
						images={images}
						setImages={setImages}
					/>
				</div>

				<div className={styles.list_btn}>
					<div>
						<Button p_10_24 white rounded_8 bold onClick={onClose}>
							Hủy bỏ
						</Button>
					</div>
					<ContextForm.Consumer>
						{({isDone}) => (
							<div>
								<Button p_10_24 green rounded_8 bold disable={!isDone}>
									Xác nhận
								</Button>
							</div>
						)}
					</ContextForm.Consumer>
				</div>

				<div className={styles.close} onClick={onClose}>
					<IoClose size={28} color='#8492A6' />
				</div>
			</div>
		</Form>
	);
}

export default ConfirmRequest;

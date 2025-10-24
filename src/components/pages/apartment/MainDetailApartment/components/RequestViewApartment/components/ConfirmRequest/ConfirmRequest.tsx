import {useState} from 'react';
import styles from './ConfirmRequest.module.scss';
import {IDataUploadFile, PropsConfirmRequest} from './interfaces';
import Form, {ContextForm, Input} from '~/components/common/Form';
import Button from '~/components/common/Button';
import {IoClose} from 'react-icons/io5';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import {QUERY_KEY} from '~/constants/config/enum';
import Loading from '~/components/common/Loading';
import UploadMultipleFile from '~/components/common/UploadMultipleFile';
import incidentServices from '~/services/incidentServices';
import fileServices from '~/services/fileServices';
import {price} from '~/common/funcs/convertCoin';
import moment from 'moment';
import {toastWarn} from '~/common/funcs/toast';

function ConfirmRequest({uuidConfirm, onClose}: PropsConfirmRequest) {
	const queryClient = useQueryClient();

	const [images, setImages] = useState<IDataUploadFile[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const [form, setForm] = useState<{resolveDate: string | Date; price: string; description: string; images: string[]}>({
		resolveDate: moment(new Date()).format('YYYY-MM-DD'),
		price: '',
		description: '',
		images: [],
	});

	const funcAcceptRepairApartment = useMutation({
		mutationFn: (body: {paths: string[]}) =>
			httpRequest({
				showMessageSuccess: true,
				showMessageFailed: true,
				msgSuccess: 'Đã xử lý thành công',
				http: incidentServices.finishIncident({
					reportUuid: uuidConfirm,
					resolveDate: moment(form?.resolveDate).format('YYYY-MM-DD'),
					price: price(form?.price),
					images: body?.paths,
					description: form?.description,
				}),
			}),
		onSuccess(data) {
			if (data) {
				onClose();
				setForm({
					resolveDate: '',
					price: '',
					description: '',
					images: [],
				});
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_apartment_incident],
				});
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.detail_request_repair],
				});
			}
		},
	});

	const handleAcceptRepairApratment = async () => {
		if (images.length === 0) {
			return toastWarn({msg: 'Vui lòng chọn hình ảnh bảo trì!'});
		}

		if (images.length > 3) {
			return toastWarn({msg: 'Vui lòng chọn tối đa 3 hình ảnh bảo trì!'});
		}

		const files = images?.map((v) => v?.file);

		const dataImage = await httpRequest({
			setLoading,
			http: fileServices.uploadMultilFile(files, 'false'),
		});

		return funcAcceptRepairApartment.mutate({
			paths: dataImage,
		});
	};

	return (
		<Form form={form} setForm={setForm} onSubmit={handleAcceptRepairApratment}>
			<Loading loading={loading || funcAcceptRepairApartment.isLoading} />
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
					name='resolveDate'
					isRequired
					isBlur
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
					isRequired
					isBlur
					unit='VND'
					isMoney
				/>

				<Input label={<span>Ghi chú</span>} placeholder='Ghi chú' type='text' name='description' />

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

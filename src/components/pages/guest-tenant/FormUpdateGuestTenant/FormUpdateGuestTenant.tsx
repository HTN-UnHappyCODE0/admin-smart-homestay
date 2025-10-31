import Form, {ContextForm, Input, TextArea} from '~/components/common/Form';
import styles from './FormUpdateGuestTenant.module.scss';
import {IDetailGuest, IUpdateGuestTenant, PropsFormUpdateGuestTenant} from './interfaces';
import Loading from '~/components/common/Loading';
import {useState} from 'react';
import {useRouter} from 'next/router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import {QUERY_KEY} from '~/constants/config/enum';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import WrapperForm from '~/components/utils/WrapperForm';
import GridColumn from '~/components/layouts/GridColumn';
import {IDataUploadFile} from '~/components/common/UploadMultipleFile/interfaces';
import guestTenantServices from '~/services/guestTenantServices';
import fileServices from '~/services/fileServices';
import moment from 'moment';
import {toastWarn} from '~/common/funcs/toast';
import UploadSingleFile from '~/components/common/UploadSingleFile';

function FormUpdateGuestTenant({onClose}: PropsFormUpdateGuestTenant) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuidUpdate} = router.query;

	const [frontImage, setFrontImage] = useState<IDataUploadFile | null>(null);
	const [backImage, setBackImage] = useState<IDataUploadFile | null>(null);
	const [loadingUploadFrontImage, setLoadingUploadFrontImage] = useState<boolean>(false);
	const [loadingUploadBackImage, setLoadingUploadBackImage] = useState<boolean>(false);
	const [form, setForm] = useState<IUpdateGuestTenant>({
		code: '',
		userName: '',
		name: '',
		phoneNumber: '',
		email: '',
		identityNumber: '',
		issuedDate: '',
		issuedPlace: '',
	});

	useQuery<IDetailGuest>([QUERY_KEY.detail_guest_tenant, _uuidUpdate], {
		queryFn: () =>
			httpRequest({
				http: guestTenantServices.getDetailGuest({uuid: _uuidUpdate as string}),
			}),
		enabled: !!_uuidUpdate,
		onSuccess(data) {
			if (data) {
				setForm({
					code: data?.code || '',
					userName: data?.userName || '',
					name: data?.name || '',
					phoneNumber: data?.phoneNumber || '',
					email: data?.email || '',
					identityNumber: data?.identification?.identityNumber || '',
					issuedDate: data?.identification?.issuedDate ? moment(data.identification.issuedDate).format('YYYY-MM-DD') : '',
					issuedPlace: data?.identification?.issuedPlace || '',
				});
				setFrontImage({
					file: null,
					path: data?.identification?.idFrontImage || '',
					url: '',
				});
				setBackImage({
					file: null,
					path: data?.identification?.idBackImage || '',
					url: '',
				});
			}
		},
	});

	const funcUpdateCustomerTenant = useMutation({
		mutationFn: (body: {frontImg: string; backImg: string}) =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa loại thiết bị thành công!',
				http: guestTenantServices.updateGuest({
					uuid: _uuidUpdate as string,
					phoneNumber: form?.phoneNumber,
					email: form?.email,
					name: form?.name,
					identityNumber: form?.identityNumber,
					issuedDate: form?.issuedDate,
					issuedPlace: form?.issuedPlace,
					idBackImage: body?.backImg,
					idFrontImage: body?.frontImg,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm({
					code: '',
					userName: '',
					name: '',
					phoneNumber: '',
					email: '',
					identityNumber: '',
					issuedDate: '',
					issuedPlace: '',
				});
				onClose();
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_guest_tenant],
				});
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.detail_guest_tenant],
				});
			}
		},
	});

	const handleUpdateGuestTenant = async () => {
		let frontImagePath: string = frontImage?.path || '';
		let backImagePath: string = backImage?.path || '';

		if (!frontImagePath && !frontImage?.file) {
			return toastWarn({msg: 'Chọn ảnh CCCD mặt trước!'});
		}
		if (!backImagePath && !backImage?.file) {
			return toastWarn({msg: 'Chọn ảnh CCCD mặt sau!'});
		}

		// Ảnh mặt trước
		if (!!frontImage?.file) {
			const dataImage = await httpRequest({
				setLoading: setLoadingUploadFrontImage,
				http: fileServices.uploadSingleFile(frontImage.file, '1', 'false'),
			});

			frontImagePath = dataImage;
		}

		// Ảnh mặt sau
		if (!!backImage?.file) {
			const dataImage = await httpRequest({
				setLoading: setLoadingUploadBackImage,
				http: fileServices.uploadSingleFile(backImage.file, '1', 'false'),
			});

			backImagePath = dataImage;
		}

		return funcUpdateCustomerTenant.mutateAsync({
			frontImg: frontImagePath,
			backImg: backImagePath,
		});
	};

	return (
		<Form form={form} setForm={setForm} onSubmit={handleUpdateGuestTenant}>
			<Loading loading={funcUpdateCustomerTenant.isLoading || loadingUploadFrontImage || loadingUploadBackImage} />
			<WrapperFormPostion
				width={1400}
				title='Chỉnh sửa tài khoản khách thuê'
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
				<WrapperForm title='Thông tin tài khoản'>
					<GridColumn col_3>
						<Input
							label={
								<span>
									Mã khách thuê <span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Mã khách thuê'
							type='text'
							name='code'
							value={form?.code}
							isRequired
							isBlur
							readOnly
						/>

						<div>
							<Input
								label={
									<span>
										Tên tài khoản <span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Tên tài khoản'
								type='text'
								name='userName'
								isRequired
								isBlur
								readOnly
							/>
						</div>
					</GridColumn>

					<div style={{marginTop: '16px'}}>
						<GridColumn col_3>
							<Input
								label={
									<span>
										Tên khách thuê <span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Nhập tên khách thuê'
								type='text'
								name='name'
								isRequired
								isBlur
							/>

							<div>
								<Input
									label={
										<span>
											Số điện thoại liên hệ <span style={{color: 'red'}}>*</span>
										</span>
									}
									placeholder='Nhập số điện thoại'
									type='number'
									name='phoneNumber'
									isRequired
									isBlur
								/>
							</div>

							<div>
								<Input
									label={
										<span>
											Email <span style={{color: 'red'}}>*</span>
										</span>
									}
									placeholder='Nhập email'
									type='text'
									name='email'
									isRequired
									isBlur
								/>
							</div>
						</GridColumn>
					</div>
				</WrapperForm>

				<WrapperForm title='Thông tin CMND/CCCD'>
					<GridColumn col_3>
						<Input
							label={
								<span>
									Số CMND/CCCD <span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Số CMND/CCCD'
							type='text'
							name='identityNumber'
							isRequired
							isBlur
							readOnly
						/>

						<div>
							<Input
								label={
									<span>
										Nơi cấp<span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Nơi cấp'
								type='text'
								name='issuedPlace'
								isRequired
								isBlur
								readOnly
							/>
						</div>

						<div>
							<Input
								label={
									<span>
										Ngày cấp<span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Ngày cấp'
								type='date'
								name='issuedDate'
								isRequired
								isBlur
								readOnly
							/>
						</div>
					</GridColumn>

					<div style={{marginTop: '16px'}}>
						<GridColumn col_3>
							<UploadSingleFile label='Ảnh mặt trước' image={frontImage} setImage={setFrontImage} size='large' />
							<div>
								<UploadSingleFile label='Ảnh mặt sau' image={backImage} setImage={setBackImage} size='large' />
							</div>
						</GridColumn>
					</div>
				</WrapperForm>
			</WrapperFormPostion>
		</Form>
	);
}

export default FormUpdateGuestTenant;

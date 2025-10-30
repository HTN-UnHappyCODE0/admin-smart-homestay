import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import styles from './FormCreateAdvertisement.module.scss';
import {IDetailApartmentForUpdate, IFormCreateAdvertisement, PropsFormCreateAdvertisement} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import GridColumn from '~/components/layouts/GridColumn';
import Form, {ContextForm, Input, Select, SelectMany, TextArea} from '~/components/common/Form';
import WrapperForm from '~/components/utils/WrapperForm';
import {useState} from 'react';
import Loading from '~/components/common/Loading';
import UploadMultipleFile from '~/components/common/UploadMultipleFile';
import {IDataUploadFile} from '~/components/common/UploadMultipleFile/interfaces';
import {useRouter} from 'next/router';
import {useMutation, useQuery} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import advertisementServices from '~/services/advertisementServices';
import {CONFIG_PAGING, CONFIG_TYPE_FIND, CONFIG_TYPE_FINDING, QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import apartmentServices from '~/services/apartmentServices';
import {getDetailAddress} from '~/common/funcs/optionConvert';
import moment from 'moment';
import {convertCoin, price} from '~/common/funcs/convertCoin';
import {toastWarn} from '~/common/funcs/toast';
import fileServices from '~/services/fileServices';

const initForm: IFormCreateAdvertisement = {
	title: '',
	apartmentUuid: '',
	apartmentTypeUu: '',
	address: '',
	apartmentSize: '',
	rooms: [],
	furnitures: [],
	price: 0,
	deposit: 0,
	images: [],
	adPrices: [],
	startDate: '',
	expireDate: '',
	description: '',
};

function FormCreateAdvertisement({onClose}: PropsFormCreateAdvertisement) {
	const router = useRouter();
	const {_uuid} = router.query;

	const [images, setImages] = useState<IDataUploadFile[]>([]);
	const [form, setForm] = useState<IFormCreateAdvertisement>(initForm);
	const [loading, setLoading] = useState<boolean>(false);

	const {data: apartments = []} = useQuery<
		{
			code: string;
			name: string;
			id: number;
			uuid: string;
			status: number;
		}[]
	>([QUERY_KEY.table_apartment_advertisement_detail], {
		queryFn: () =>
			httpRequest({
				http: apartmentServices.getListApartments({
					isPaging: CONFIG_PAGING.NO_PAGING,
					typeFinding: CONFIG_TYPE_FINDING.CATALOG,
					page: 1,
					pageSize: 100,
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
					state: null,
					sizeFrom: null,
					sizeTo: null,
					province: '',
					ward: '',
					hasElectricMeter: null,
					hasWaterMeter: null,
				}),
			}),
		select(data) {
			return data;
		},
	});

	useQuery<IDetailApartmentForUpdate>([QUERY_KEY.table_apartment_advertisement_detail, form.apartmentUuid], {
		queryFn: () =>
			httpRequest({
				http: apartmentServices.apartmentDetailForUpdate({
					uuid: form.apartmentUuid,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!form.apartmentUuid,
		onSuccess: (data) => {
			if (data) {
				setForm((prev) => ({
					...prev,
					rooms: data?.apartmentRooms?.map((v) => ({
						assetUuid: v?.item?.uuid,
						name: v?.item?.name,
						count: convertCoin(v?.count),
						description: v?.description || '',
					})),
					furnitures: data?.apartmentFurnitures?.map((v) => ({
						assetUuid: v?.item?.uuid,
						name: v?.item?.name,
						count: convertCoin(v?.count),
						description: v?.description || '',
					})),
					apartmentTypeUu: data?.apartmentTypeUu?.name,
					apartmentSize: convertCoin(data?.apartmentSize),
					address: getDetailAddress({
						address: data?.address!,
						districtName: '',
						provinceName: data?.province?.fullName!,
						wardName: data?.ward?.fullName!,
					}),
				}));
			}
		},
	});

	// const funcCreateAdvertisement = useMutation({
	// 	mutationFn: (body: {paths: string[]}) =>
	// 		httpRequest({
	// 			showMessageFailed: true,
	// 			showMessageSuccess: true,
	// 			msgSuccess: 'Thêm căn hộ thành công!',
	// 			http: advertisementServices.createAdvertisement({
	// 				apartmentUuid: _uuid as string,
	// 				title: form?.title,
	// 				adPrices: form?.adPrices,
	// 				deposit: form?.deposit,
	// 				description: form?.description,
	// 				startDate: moment(form?.startDate).format('YYYY-MM-DD'),
	// 				expireDate: moment(form?.expireDate).format('YYYY-MM-DD'),
	// 				price: form?.price,
	// 				images: body?.paths,
	// 			}),
	// 		}),
	// 	onSuccess(data) {
	// 		if (data) {
	// 			setForm(initForm);
	// 		}
	// 	},
	// });

	const handleCreateAdvertisement = async () => {
		if (!form.title) {
			return toastWarn({msg: 'Chọn tiêu đề bài đăng!'});
		}

		if (!form.apartmentTypeUu) {
			return toastWarn({msg: 'Chọn căn hộ!'});
		}

		if (!form.price) {
			return toastWarn({msg: 'Chọn giá thuê/tháng!'});
		}

		if (!form.deposit) {
			return toastWarn({msg: 'Chọn tiền cọc!'});
		}

		if (!form.startDate) {
			return toastWarn({msg: 'Chọn thời gian đăng!'});
		}

		if (!form.expireDate) {
			return toastWarn({msg: 'Chọn thời gian kết thúc!'});
		}

		// if (images.length > 0) {
		// 	const files = images?.map((v) => v?.file);

		// 	const dataImage = await httpRequest({
		// 		setLoading,
		// 		http: fileServices.uploadMultilFile(files, 'false'),
		// 	});

		// 	return funcCreateAdvertisement.mutate({
		// 		paths: dataImage,
		// 	});
		// } else {
		// 	return funcCreateAdvertisement.mutate({
		// 		paths: [],
		// 	});
		// }
	};

	return (
		<Form form={form} setForm={setForm} onSubmit={handleCreateAdvertisement}>
			{/* <Loading loading={loading || funcCreateAdvertisement.isLoading} /> */}
			<WrapperFormPostion
				width={1400}
				title='Thêm mới bài đăng'
				actions={
					<FlexLayout row gap-8>
						<Button p_8_24 rounded_8 blue bold onClick={() => {}}>
							Hủy bỏ
						</Button>
						<ContextForm.Consumer>
							{({isDone}) => (
								<Button p_8_24 rounded_8 white bold onClick={onClose}>
									Đăng bài
								</Button>
							)}
						</ContextForm.Consumer>
					</FlexLayout>
				}
			>
				<WrapperForm title=''>
					{/* Tiêu đề, Chọn căn hộ */}
					<GridColumn col_1>
						<Input
							label={
								<span>
									Tiêu đề bài đăng<span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Nhập tiêu đề bài đăng'
							type='text'
							name='title'
							value={form?.title}
							onClean
							isRequired
							isBlur
						/>

						<Select
							placeholder='Chọn căn hộ'
							label={<span>Tên căn hộ</span>}
							value={form?.apartmentUuid}
							options={apartments}
							onSelect={(data) =>
								setForm((prev) => ({
									...prev,
									apartmentUuid: data.uuid,
								}))
							}
							getOptionLabel={(opt) => opt.name}
							getOptionValue={(opt) => opt.uuid}
						/>
					</GridColumn>

					{/* Loại hình căn hộ, Diện tích, Địa chỉ chi tiết  */}
					<div style={{marginTop: '16px'}}>
						<GridColumn col_3>
							<Input
								label={
									<span>
										Loại hình căn hộ<span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Loại hình căn hộ'
								type='text'
								name='apartmentTypeUu'
								readOnly
							/>

							<div>
								<Input
									label={
										<span>
											Diện tích<span style={{color: 'red'}}>*</span>
										</span>
									}
									placeholder='Diện tích'
									type='text'
									name='apartmentSize'
									readOnly
									unit='m²'
								/>
							</div>
							<div>
								<Input
									label={<span>Địa chỉ chi tiết</span>}
									placeholder='Nhập địa chỉ '
									type='text'
									name='address'
									readOnly={true}
								/>
							</div>
						</GridColumn>
					</div>

					{/* Phòng, Nội thất */}
					<div style={{marginTop: '16px'}}>
						<GridColumn col_2>
							<SelectMany
								label={
									<span>
										Phòng<span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Phòng'
								textShow={
									form?.rooms?.filter((room) => price(room.count) > 0)?.length > 0
										? form?.rooms
												?.filter((room) => price(room.count) > 0)
												?.flatMap?.((room, index, arr) => [
													<span key={room.assetUuid}>
														{room.name} * <span style={{color: '#2970FF'}}>{room.count}</span>
													</span>,
													index < arr.length - 1 && <span key={`sep-${room.assetUuid}`}> - </span>,
												])
										: ''
								}
								readOnly={true}
							/>
							<div>
								<SelectMany
									label={
										<span>
											Nội thất<span style={{color: 'red'}}>*</span>
										</span>
									}
									placeholder='Nội thất'
									textShow={
										form?.furnitures?.filter((furniture) => price(furniture.count) > 0)?.length > 0
											? form?.furnitures
													?.filter((furniture) => price(furniture.count) > 0)
													?.flatMap?.((furniture, index, arr) => [
														<span key={furniture.assetUuid}>
															{furniture.name} * <span style={{color: '#2970FF'}}>{furniture.count}</span>
														</span>,
														index < arr.length - 1 && <span key={`sep-${furniture.assetUuid}`}> - </span>,
													])
											: ''
									}
									readOnly={true}
								/>
							</div>
						</GridColumn>
					</div>

					{/* Giá thuê/tháng, Giá tiền cọc */}
					<div style={{marginTop: '16px'}}>
						<GridColumn col_2>
							<Input
								label={
									<span>
										Giá thuê/tháng<span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Giá thuê/tháng'
								type='text'
								name='price'
								isRequired
								isBlur
							/>
							<div>
								<Input
									label={
										<span>
											Giá tiền cọc<span style={{color: 'red'}}>*</span>
										</span>
									}
									placeholder='Giá tiền cọc'
									type='text'
									name='deposit'
									isRequired
									isBlur
								/>
							</div>
						</GridColumn>
					</div>

					{/* Giá điện, Giá nước  */}
					<div style={{marginTop: '16px'}}>
						<GridColumn col_2>
							<Input
								label={
									<span>
										Giá điện<span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Giá điện'
								type='text'
								name='adPrice'
								onClean
								isRequired
								isBlur
							/>
							<div>
								<Input
									label={
										<span>
											Giá nước<span style={{color: 'red'}}>*</span>
										</span>
									}
									placeholder='Giá nước'
									type='text'
									name='adPrice'
									isRequired
									isBlur
								/>
							</div>
						</GridColumn>
					</div>

					{/* Thời gian đăng, Thời gian kết thúc */}
					<div style={{marginTop: '16px'}}>
						<GridColumn col_2>
							<Input
								label={
									<span>
										Thời gian đăng<span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Thời gian đăng'
								type='date'
								name='startDate'
								isRequired
								isBlur
							/>
							<div>
								<Input
									label={
										<span>
											Thời gian kết thúc<span style={{color: 'red'}}>*</span>
										</span>
									}
									placeholder='Thời gian kết thúc'
									type='date'
									name='expireDate'
									isRequired
									isBlur
								/>
							</div>
						</GridColumn>
					</div>

					<div style={{marginTop: '16px'}}>
						<TextArea name='description' placeholder='Nhập mô tả' label='Nhập nội dung mô tả' />
					</div>

					<div style={{marginTop: '16px'}}>
						<UploadMultipleFile
							label={
								<span>
									Hình ảnh đính kèm <span style={{color: 'red'}}>*</span>
								</span>
							}
							images={images}
							setImages={setImages}
						/>
					</div>
				</WrapperForm>
			</WrapperFormPostion>
		</Form>
	);
}

export default FormCreateAdvertisement;

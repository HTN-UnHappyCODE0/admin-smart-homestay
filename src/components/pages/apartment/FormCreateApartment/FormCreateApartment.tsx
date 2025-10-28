import {Fragment, useState} from 'react';
import styles from './FormCreateApartment.module.scss';
import {PropsFormCreateApartment} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Header from '~/components/utils/Header';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import WrapperForm from '~/components/utils/WrapperForm';
import Form, {ContextForm, Input, Select, SelectMany, TextArea} from '~/components/common/Form';
import GridColumn from '~/components/layouts/GridColumn';
import UploadMultipleFile from '~/components/common/UploadMultipleFile';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import {useRouter} from 'next/router';
import {CONFIG_PAGING, CONFIG_TYPE_FIND, QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import {useMutation, useQuery} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import apartmentTypeServices from '~/services/apartmentTypeServices';
import userServices from '~/services/userServices';
import lockServices from '~/services/lockServices';
import provinceServiecs from '~/services/provinceServices';
import PositionContainer from '~/components/common/PositionContainer';
import FormChooseRoom from './components/FormChooseRoom';
import roomServices from '~/services/roomServices';
import {price} from '~/common/funcs/convertCoin';
import furnitureServices from '~/services/furnitureServices';
import FormChooseFurniture from './components/FormChooseFurniture';
import apartmentServices from '~/services/apartmentServices';
import Loading from '~/components/common/Loading';
import {toastWarn} from '~/common/funcs/toast';
import fileServices from '~/services/fileServices';
import {IDataUploadFile} from '~/components/common/UploadMultipleFile/interfaces';
import meterTypeServices from '~/services/meterTypeServices';
import FormChooseMeter from './components/FormChooseMeter';

export interface IRoom {
	assetUuid: string;
	name: string;
	count: string;
	description: string;
}

export interface IFurniture {
	assetUuid: string;
	name: string;
	count: string;
	description: string;
}

export interface IMeter {
	meterTypeName: string;
	meterTypeUuid: string;
	meterUuid: string;
	meterSerialNumber: string;
	meterName: string;
	meterCode: string;
}

export interface IFormCreateApartment {
	name: string;
	apartmentTypeUuid: string;
	ownerUuid: string;
	apartmentSize: string;
	managerUuid: string;
	lockUuid: string;
	provinceId: string;
	wardId: string;
	address: string;
	rooms: IRoom[];
	furnitures: IFurniture[];
	meters: IMeter[];
	description: string;
}

const initForm: IFormCreateApartment = {
	name: '',
	apartmentTypeUuid: '',
	ownerUuid: '',
	apartmentSize: '0',
	managerUuid: '',
	lockUuid: '',
	provinceId: '',
	wardId: '',
	address: '',
	rooms: [],
	furnitures: [],
	meters: [],
	description: '',
};

function FormCreateApartment({}: PropsFormCreateApartment) {
	const router = useRouter();

	const [images, setImages] = useState<IDataUploadFile[]>([]);
	const [form, setForm] = useState<IFormCreateApartment>(initForm);

	const [openChooseRoom, setOpenChooseRoom] = useState<boolean>(false);
	const [openChooseFurnitures, setOpenChooseFurnitures] = useState<boolean>(false);

	const [loading, setLoading] = useState<boolean>(false);

	const {data: apartmentTypes = []} = useQuery<
		{
			uuid: string;
			code: string;
			name: string;
		}[]
	>([QUERY_KEY.dropdown_apartment_type], {
		queryFn: () =>
			httpRequest({
				http: apartmentTypeServices.listApartmentType({
					isPaging: CONFIG_PAGING.NO_PAGING,
					typeFinding: CONFIG_TYPE_FIND.DROPDOWN,
					page: 1,
					pageSize: 100,
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const {data: users = []} = useQuery<
		{
			uuid: string;
			code: string;
			name: string;
		}[]
	>([QUERY_KEY.dropdown_user], {
		queryFn: () =>
			httpRequest({
				http: userServices.getUsers({
					isPaging: CONFIG_PAGING.NO_PAGING,
					typeFinding: CONFIG_TYPE_FIND.DROPDOWN,
					page: 1,
					pageSize: 100,
					keyword: '',
					hasRented: 0,
					status: STATUS_CONFIG.ACTIVE,
					type: 0,
					userUuid: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	const {data: locks = []} = useQuery<
		{
			uuid: string;
			code: string;
			name: string;
		}[]
	>([QUERY_KEY.dropdown_lock], {
		queryFn: () =>
			httpRequest({
				http: lockServices.listActiveLock({
					isPaging: CONFIG_PAGING.NO_PAGING,
					page: 1,
					pageSize: 100,
					keyword: '',
					state: null,
					status: null,
					isUsed: false,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const {data: provinces = []} = useQuery<
		{
			code: string;
			fullName: string;
			fullNameEn: string;
		}[]
	>([QUERY_KEY.dropdown_province], {
		queryFn: () =>
			httpRequest({
				http: provinceServiecs.listProvince({
					keyword: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	const {data: wards = []} = useQuery<
		{
			code: string;
			fullName: string;
			fullNameEn: string;
		}[]
	>([QUERY_KEY.dropdown_ward, form.provinceId], {
		queryFn: () =>
			httpRequest({
				http: provinceServiecs.listWard({
					keyword: '',
					provinceCode: form.provinceId,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!form.provinceId,
	});

	const {isLoading: loadingFurnitures} = useQuery<
		{
			uuid: string;
			code: string;
			name: string;
		}[]
	>([QUERY_KEY.list_furniture], {
		queryFn: () =>
			httpRequest({
				http: furnitureServices.getListFurnitures({
					isPaging: CONFIG_PAGING.NO_PAGING,
					typeFinding: CONFIG_TYPE_FIND.DROPDOWN,
					page: 1,
					pageSize: 100,
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
					addedDateFrom: null,
					addedDateTo: null,
				}),
			}),
		onSuccess(data) {
			setForm((prev) => ({
				...prev,
				furnitures: data?.map((v) => ({
					assetUuid: v?.uuid,
					name: v?.name,
					description: '',
					count: '0',
				})),
			}));
		},
		select(data) {
			return data;
		},
	});

	const {isLoading: loadingRooms} = useQuery<
		{
			uuid: string;
			code: string;
			name: string;
		}[]
	>([QUERY_KEY.list_room], {
		queryFn: () =>
			httpRequest({
				http: roomServices.listRoom({
					isPaging: CONFIG_PAGING.NO_PAGING,
					typeFinding: CONFIG_TYPE_FIND.DROPDOWN,
					page: 1,
					pageSize: 100,
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
				}),
			}),
		onSuccess(data) {
			setForm((prev) => ({
				...prev,
				rooms: data?.map((v) => ({
					assetUuid: v?.uuid,
					name: v?.name,
					description: '',
					count: '0',
				})),
			}));
		},
		select(data) {
			return data;
		},
	});

	const {isLoading: loadingMeterType} = useQuery<
		{
			uuid: string;
			code: string;
			name: string;
		}[]
	>([QUERY_KEY.list_meter_type], {
		queryFn: () =>
			httpRequest({
				http: meterTypeServices.listMeterType({
					isPaging: CONFIG_PAGING.NO_PAGING,
					typeFinding: CONFIG_TYPE_FIND.DROPDOWN,
					page: 1,
					pageSize: 100,
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
				}),
			}),
		onSuccess(data) {
			setForm((prev) => ({
				...prev,
				meters: data?.map((v) => ({
					meterTypeUuid: v?.uuid,
					meterTypeName: v?.name,
					meterUuid: '',
					meterSerialNumber: '',
					meterName: '',
					meterCode: '',
				})),
			}));
		},
		select(data) {
			return data;
		},
	});

	const funcCreateApartment = useMutation({
		mutationFn: (body: {paths: string[]}) =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Thêm căn hộ thành công!',
				http: apartmentServices.createApartment({
					name: form?.name,
					apartmentTypeUuid: form?.apartmentTypeUuid,
					apartmentSize: price(form?.apartmentSize),
					lockUuid: form?.lockUuid,
					managerUuid: form?.managerUuid,
					ownerUuid: form?.ownerUuid,
					provinceId: form?.provinceId,
					wardId: form?.wardId,
					address: form?.address,
					description: form?.description,
					rooms: form?.rooms
						?.filter((v) => price(v?.count) > 0)
						?.map((room) => ({
							assetUuid: room?.assetUuid,
							count: price(room?.count),
							description: room?.description,
						})),
					furnitures: form?.furnitures
						?.filter((v) => price(v?.count) > 0)
						?.map((furniture) => ({
							assetUuid: furniture?.assetUuid,
							count: price(furniture?.count),
							description: furniture?.description,
						})),
					meters: form?.meters?.filter((v) => !!v?.meterUuid)?.map((v) => v.meterUuid),
					attachments: body?.paths,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setForm(initForm);
				router.back();
			}
		},
	});

	const handleCreateApartment = async () => {
		if (!form.apartmentTypeUuid) {
			return toastWarn({msg: 'Chọn loại hình căn hộ!'});
		}
		if (!form.ownerUuid) {
			return toastWarn({msg: 'Chọn chủ căn hộ!'});
		}
		if (!form.managerUuid) {
			return toastWarn({msg: 'Chọn người quản lý căn hộ!'});
		}
		if (!form.lockUuid) {
			return toastWarn({msg: 'Chọn ổ khóa căn hộ!'});
		}
		if (!form.provinceId) {
			return toastWarn({msg: 'Chọn tỉnh/thành phố!'});
		}
		if (!form.wardId) {
			return toastWarn({msg: 'Chọn xã/phường!'});
		}
		if (form.rooms.filter((room) => price(room.count) > 0).length == 0) {
			return toastWarn({msg: 'Chọn danh sách phòng!'});
		}
		if (form.furnitures.filter((furniture) => price(furniture.count) > 0).length == 0) {
			return toastWarn({msg: 'Chọn danh sách nội thất!'});
		}

		if (images.length > 0) {
			const files = images?.map((v) => v?.file);

			const dataImage = await httpRequest({
				setLoading,
				http: fileServices.uploadMultilFile(files, 'false'),
			});

			return funcCreateApartment.mutate({
				paths: dataImage,
			});
		} else {
			return funcCreateApartment.mutate({
				paths: [],
			});
		}
	};

	return (
		<Fragment>
			<Loading loading={loading || funcCreateApartment.isLoading} />
			<Form heightFull={true} form={form} setForm={setForm} onSubmit={handleCreateApartment}>
				<FlexLayout column gap-12>
					<Header title='Thêm mới căn hộ' />
					<Breadcrumb
						listUrls={[
							{
								title: 'Danh sách căn hộ',
								path: PATH.Home,
							},
							{
								path: '',
								title: 'Chi tiết căn hộ',
							},
						]}
						actions={
							<FlexLayout row gap-6>
								<Button p_8_24 rounded_8 white bold onClick={() => router.back()}>
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
					/>

					<FlexItem flex-1 overflow-x>
						<FlexLayout column gap-12>
							<WrapperForm title='Thông tin căn hộ'>
								<div className={styles.form}>
									<GridColumn col_3>
										<Input
											name='name'
											type='text'
											isRequired={true}
											label={
												<span>
													Tên căn hộ <span style={{color: 'red'}}>* </span>
												</span>
											}
											placeholder='Nhập tên căn hộ'
										/>
										<Select
											placeholder='Lựa chọn'
											label={
												<span>
													Loại hình căn hộ <span style={{color: 'red'}}>* </span>
												</span>
											}
											value={form.apartmentTypeUuid}
											options={apartmentTypes}
											onSelect={(data) =>
												setForm((prev) => ({
													...prev,
													apartmentTypeUuid: data.uuid,
												}))
											}
											getOptionLabel={(opt) => opt.name}
											getOptionValue={(opt) => opt.uuid}
										/>

										<div>
											<Select
												placeholder='Lựa chọn'
												label={
													<span>
														Chủ căn hộ <span style={{color: 'red'}}>* </span>
													</span>
												}
												value={form.ownerUuid}
												options={users}
												onSelect={(data) =>
													setForm((prev) => ({
														...prev,
														ownerUuid: data.uuid,
													}))
												}
												getOptionLabel={(opt) => opt.name}
												getOptionValue={(opt) => opt.uuid}
											/>
										</div>

										<Select
											placeholder='Lựa chọn'
											label={
												<span>
													Người quản lý <span style={{color: 'red'}}>* </span>
												</span>
											}
											value={form.managerUuid}
											options={users}
											onSelect={(data) =>
												setForm((prev) => ({
													...prev,
													managerUuid: data.uuid,
												}))
											}
											getOptionLabel={(opt) => opt.name}
											getOptionValue={(opt) => opt.uuid}
										/>

										<div>
											<Select
												placeholder='Lựa chọn'
												label={
													<span>
														ID ổ khóa <span style={{color: 'red'}}>* </span>
													</span>
												}
												value={form.lockUuid}
												options={locks}
												onSelect={(data) =>
													setForm((prev) => ({
														...prev,
														lockUuid: data.uuid,
													}))
												}
												getOptionLabel={(opt) => opt.code}
												getOptionValue={(opt) => opt.uuid}
											/>
										</div>

										<Input
											label={
												<span>
													Diện tích <span style={{color: 'red'}}>*</span>
												</span>
											}
											placeholder='Nhập diện tích'
											name='apartmentSize'
											type='text'
											isMoney
											isRequired
											unit='M2'
										/>

										<Select
											placeholder='Lựa chọn'
											label={
												<span>
													Tỉnh/TP <span style={{color: 'red'}}>* </span>
												</span>
											}
											value={form.provinceId}
											options={provinces}
											onSelect={(data) =>
												setForm((prev) => ({
													...prev,
													provinceId: data.code,
													wardId: '',
												}))
											}
											getOptionLabel={(opt) => opt.fullName}
											getOptionValue={(opt) => opt.code}
										/>

										<div>
											<Select
												placeholder='Lựa chọn'
												label={
													<span>
														Xã/Phường <span style={{color: 'red'}}>* </span>
													</span>
												}
												value={form.wardId}
												options={wards}
												onSelect={(data) =>
													setForm((prev) => ({
														...prev,
														wardId: data.code,
													}))
												}
												getOptionLabel={(opt) => opt.fullName}
												getOptionValue={(opt) => opt.code}
											/>
										</div>

										<Input
											name='address'
											type='text'
											label={<span>Địa chỉ chi tiết</span>}
											placeholder='Nhập địa chỉ chi tiết'
										/>
									</GridColumn>

									<div style={{marginTop: '16px'}}>
										<SelectMany
											placeholder='Chọn phòng'
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
											label={
												<span>
													Phòng <span style={{color: 'red'}}>* </span>
												</span>
											}
											onClick={() => setOpenChooseRoom(true)}
										/>
									</div>

									<div style={{marginTop: '16px'}}>
										<SelectMany
											placeholder='Chọn nội thất'
											textShow={
												form?.furnitures?.filter((furniture) => price(furniture.count) > 0)?.length > 0
													? form?.furnitures
															?.filter((furniture) => price(furniture.count) > 0)
															?.flatMap?.((furniture, index, arr) => [
																<span key={furniture.assetUuid}>
																	{furniture.name} *{' '}
																	<span style={{color: '#2970FF'}}>{furniture.count}</span>
																</span>,
																index < arr.length - 1 && (
																	<span key={`sep-${furniture.assetUuid}`}> - </span>
																),
															])
													: ''
											}
											label={
												<span>
													Nội thất <span style={{color: 'red'}}>* </span>
												</span>
											}
											onClick={() => setOpenChooseFurnitures(true)}
										/>
									</div>

									<div style={{marginTop: '16px'}}>
										<TextArea name='description' placeholder='Nhập mô tả' label='Mô tả chi tiết' />
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
								</div>
							</WrapperForm>

							{/* Danh sách thiết bị */}
							<WrapperForm title='Danh sách thiết bị'>
								<FormChooseMeter
									meters={form?.meters}
									setMeters={(meters) =>
										setForm((prev) => ({
											...prev,
											meters: meters,
										}))
									}
									loading={loadingMeterType}
								/>
							</WrapperForm>
						</FlexLayout>
					</FlexItem>
				</FlexLayout>
			</Form>

			<PositionContainer open={openChooseRoom} onClose={() => setOpenChooseRoom(false)}>
				<FormChooseRoom
					loading={loadingRooms}
					rooms={form.rooms}
					setRooms={(rooms) =>
						setForm((prev) => ({
							...prev,
							rooms: rooms,
						}))
					}
					onClose={() => setOpenChooseRoom(false)}
				/>
			</PositionContainer>

			<PositionContainer open={openChooseFurnitures} onClose={() => setOpenChooseFurnitures(false)}>
				<FormChooseFurniture
					loading={loadingFurnitures}
					furnitures={form.furnitures}
					setFurnitures={(furnitures) =>
						setForm((prev) => ({
							...prev,
							furnitures: furnitures,
						}))
					}
					onClose={() => setOpenChooseFurnitures(false)}
				/>
			</PositionContainer>
		</Fragment>
	);
}

export default FormCreateApartment;

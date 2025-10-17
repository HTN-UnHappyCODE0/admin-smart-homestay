import {useState} from 'react';
import styles from './MainInfoApartment.module.scss';
import {IDetailInfoApartment, PropsMainInfoApartment} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import LayoutMainPage from '~/components/layouts/LayoutMainPage';
import {useRouter} from 'next/router';
import {tabsDetailApartments} from '~/constants/config/data';
import WrapperForm from '~/components/utils/WrapperForm';
import StateActive from '~/components/utils/StateActive';
import GridColumn from '~/components/layouts/GridColumn';
import InfoDetail from '~/components/utils/InfoDetail';
import SwitchButton from '~/components/common/SwitchButton';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import apartmentServices from '~/services/apartmentServices';
import {QUERY_KEY, STATE_SWITCH} from '~/constants/config/enum';
import {getDetailAddress} from '~/common/funcs/optionConvert';
import Dialog from '~/components/common/Dialog';
import {Warning2} from 'iconsax-react';
import Loading from '~/components/common/Loading';
import Image from 'next/image';

function MainInfoApartment({}: PropsMainInfoApartment) {
	const router = useRouter();
	const {_uuid} = router.query;
	const queryClient = useQueryClient();

	const [dataChangeStateSwitch, setDataChangeStateSwitch] = useState<{apartmentMeterUuid: string; state: number; type: 1 | 2} | null>(
		null
	);

	const {data: apartmentInfo} = useQuery<IDetailInfoApartment>([QUERY_KEY.detail_info_apartment, _uuid], {
		queryFn: () =>
			httpRequest({
				http: apartmentServices.getApartmentDetail({uuid: _uuid as string}),
			}),

		select(data) {
			return data;
		},
		enabled: !!_uuid,
	});

	const funcChangeSwitch = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageSuccess: true,
				showMessageFailed: true,
				msgSuccess: dataChangeStateSwitch?.state == STATE_SWITCH.ON ? 'Tắt aptomat thành công!' : 'Bật aptomat thành công!',
				http: apartmentServices.changeStatusMeter({
					apartmentMeterUuid: dataChangeStateSwitch?.apartmentMeterUuid!,
					state: dataChangeStateSwitch?.state === STATE_SWITCH.ON ? STATE_SWITCH.OFF : STATE_SWITCH.ON,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setDataChangeStateSwitch(null);
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.detail_info_apartment],
				});
			}
		},
	});

	return (
		<FlexLayout column gap-12>
			<Loading loading={funcChangeSwitch.isLoading} />
			<LayoutMainPage
				breadcrumb={
					<Breadcrumb
						listUrls={[
							{
								title: 'Danh sách căn hộ',
								path: PATH.Apartment,
							},
							{
								title: 'Chi tiết căn hộ',
								path: PATH.ApartmentDetail,
							},
						]}
						actions={
							<FlexLayout row gap-6>
								<Button p_8_16 rounded_8 red bold>
									Khóa căn hộ
								</Button>
								<Button p_8_16 rounded_8 bright-cyan bold>
									Chỉnh sửa
								</Button>
							</FlexLayout>
						}
					/>
				}
				title='Chi tiết căn hộ'
				tabs={tabsDetailApartments(_uuid as string)}
			>
				<FlexLayout column gap-16>
					<div className={styles.grid}>
						<WrapperForm
							title='Thông tin căn hộ'
							actions={
								<FlexLayout row gap-6 items-center>
									<p
										style={{
											color: '#202939',
											fontSize: '14px',
											fontWeight: '500',
										}}
									>
										Trạng thái:
									</p>
									<StateActive
										isSmall={true}
										stateActive={1}
										listState={[
											{
												backgroundColor: '#06AED4',
												state: 1,
												text: 'Hoạt động',
												textColor: '#fff',
											},
											{
												backgroundColor: '#EE0033',
												state: 2,
												text: 'Bị khóa',
												textColor: '#fff',
											},
										]}
									/>
								</FlexLayout>
							}
						>
							<FlexLayout column gap-16>
								<GridColumn col_3>
									<InfoDetail name='Tên căn hộ' value={apartmentInfo?.name} />
									<InfoDetail name='Loại căn hộ' value={apartmentInfo?.apartmentTypeUu?.name} />
									<InfoDetail name='Diện tích' value={`${apartmentInfo?.apartmentSize} m2`} />
									<InfoDetail name='ID ổ khóa' value={apartmentInfo?.lock?.code} />
									<InfoDetail
										name='Phòng'
										value={
											<>
												{apartmentInfo?.apartmentRooms.flatMap((room, index, array) => (
													<span key={index}>
														{room.item} * <span style={{color: '#2970FF'}}>{room.count}</span>
														{index < array.length - 1 && <span key={`sep-${room.uuid}`}> , </span>}
													</span>
												))}
											</>
										}
									/>
									<InfoDetail
										name='Nội thất'
										value={apartmentInfo?.apartmentFurnitures.map((item, index) => (
											<div key={index}>{item.count}</div>
										))}
									/>
									<InfoDetail name='Giá cho thuê' value={apartmentInfo?.rentPrice} />
									<InfoDetail name='Giá quảng cáo' value={apartmentInfo?.adPrice} />
								</GridColumn>

								<InfoDetail
									name='Địa chỉ chi tiết'
									value={getDetailAddress({
										address: apartmentInfo?.address!,
										provinceName: apartmentInfo?.province?.fullName!,
										districtName: '',
										wardName: apartmentInfo?.ward?.fullName!,
									})}
								/>

								<InfoDetail name='Mô tả chi tiết' value={apartmentInfo?.description} />
								<InfoDetail
									name='Hình ảnh'
									value=''
									images={apartmentInfo?.attachments?.map((item) => `${process.env.NEXT_PUBLIC_IMAGE}/${item}`)}
								/>
							</FlexLayout>
						</WrapperForm>

						<FlexLayout column gap-16>
							<WrapperForm title='Thông tin chủ căn hộ'>
								<InfoDetail isMarginTop={true} name='Tên chủ hộ' value={apartmentInfo?.ownerUu?.name} />
								<InfoDetail isMarginTop={true} name='Số điện thoại' value={apartmentInfo?.ownerUu?.phoneNumber} />
								<InfoDetail isMarginTop={true} name='Số tài khoản' value={apartmentInfo?.ownerUu?.bankNumber} />
								<InfoDetail isMarginTop={true} name='Ngân hàng' value={apartmentInfo?.ownerUu?.bankName} />
							</WrapperForm>

							<WrapperForm title='Thông tin quản lý'>
								<InfoDetail isMarginTop={true} name='Tên người quản lý' value={apartmentInfo?.managerUu?.name} />
								<InfoDetail isMarginTop={true} name='Số điện thoại' value={apartmentInfo?.managerUu?.phoneNumber} />
							</WrapperForm>
						</FlexLayout>
					</div>
					<WrapperForm title='Quản lý điện nước'>
						<GridColumn col_4>
							<InfoDetail name='Số điện đầu tháng' value={apartmentInfo?.waterMeter?.initialValue || 0} />
							<InfoDetail name='Số điện hiện tại' value={apartmentInfo?.waterMeter?.currentValue || 0} />
							<InfoDetail
								name='Số điện đã tiêu thụ'
								value={
									apartmentInfo?.waterMeter
										? apartmentInfo.waterMeter.currentValue - apartmentInfo.waterMeter.initialValue
										: 0
								}
							/>

							<InfoDetail
								name='Aptomat'
								value=''
								actions={
									<SwitchButton
										checkOn={apartmentInfo?.electricMeter?.onState === STATE_SWITCH.ON}
										onClick={() =>
											setDataChangeStateSwitch({
												apartmentMeterUuid: apartmentInfo?.electricMeter?.uuid!,
												state: apartmentInfo?.electricMeter?.onState!,
												type: 1,
											})
										}
									/>
								}
							/>
							<InfoDetail name='Số nước đầu tháng' value={apartmentInfo?.waterMeter?.initialValue || 0} />
							<InfoDetail name='Số nước hiện tại' value={apartmentInfo?.waterMeter?.currentValue || 0} />
							<InfoDetail
								name='Số nước đã tiêu thụ'
								value={
									apartmentInfo?.waterMeter
										? apartmentInfo.waterMeter.currentValue - apartmentInfo.waterMeter.initialValue
										: 0
								}
							/>
							<InfoDetail
								name='Đồng hồ nước'
								value=''
								actions={
									<SwitchButton
										checkOn={apartmentInfo?.waterMeter?.onState === STATE_SWITCH.ON}
										onClick={() =>
											setDataChangeStateSwitch({
												apartmentMeterUuid: apartmentInfo?.waterMeter?.uuid!,
												state: apartmentInfo?.waterMeter?.onState!,
												type: 2,
											})
										}
									/>
								}
							/>
						</GridColumn>
					</WrapperForm>

					<Dialog
						open={!!dataChangeStateSwitch && dataChangeStateSwitch.type === 1}
						type={dataChangeStateSwitch?.state == STATE_SWITCH.ON ? 'error' : 'primary'}
						backgroundIconColor={dataChangeStateSwitch?.state == STATE_SWITCH.ON ? '#ffdce4' : '#b5f4d4ff'}
						borderIconColor={dataChangeStateSwitch?.state == STATE_SWITCH.ON ? '#fff0f3' : '#d6f6e6ff'}
						title={dataChangeStateSwitch?.state == STATE_SWITCH.ON ? 'Tắt Aptomat' : 'Bật Aptomat'}
						note={
							dataChangeStateSwitch?.state == STATE_SWITCH.ON
								? 'Bạn có chắc chắn muốn tắt aptopmat không?'
								: 'Bạn có chắc chắn muốn bật aptomat không?'
						}
						icon={
							dataChangeStateSwitch?.state == STATE_SWITCH.ON ? (
								<Warning2 size='28' color='#EE0033' />
							) : (
								<Warning2 size='28' color='#25C173' />
							)
						}
						onClose={() => setDataChangeStateSwitch(null)}
						onSubmit={funcChangeSwitch.mutate}
					/>

					<Dialog
						open={!!dataChangeStateSwitch && dataChangeStateSwitch.type === 2}
						type={dataChangeStateSwitch?.state == STATE_SWITCH.ON ? 'error' : 'primary'}
						backgroundIconColor={dataChangeStateSwitch?.state == STATE_SWITCH.ON ? '#ffdce4' : '#b5f4d4ff'}
						borderIconColor={dataChangeStateSwitch?.state == STATE_SWITCH.ON ? '#fff0f3' : '#d6f6e6ff'}
						title={dataChangeStateSwitch?.state == STATE_SWITCH.ON ? 'Tắt đồng hồ nước' : 'Bật đồng hồ nước'}
						note={
							dataChangeStateSwitch?.state == STATE_SWITCH.ON
								? 'Bạn có chắc chắn muốn tắt đồng hồ nước không?'
								: 'Bạn có chắc chắn muốn bật đồng hồ nước không?'
						}
						icon={
							dataChangeStateSwitch?.state == STATE_SWITCH.ON ? (
								<Warning2 size='28' color='#EE0033' />
							) : (
								<Warning2 size='28' color='#25C173' />
							)
						}
						onClose={() => setDataChangeStateSwitch(null)}
						onSubmit={funcChangeSwitch.mutate}
					/>
				</FlexLayout>
			</LayoutMainPage>
		</FlexLayout>
	);
}

export default MainInfoApartment;

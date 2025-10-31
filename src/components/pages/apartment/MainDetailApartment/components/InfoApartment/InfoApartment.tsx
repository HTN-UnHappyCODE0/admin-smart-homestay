import {useState} from 'react';
import styles from './InfoApartment.module.scss';
import {IDetailInfoApartment, PropsInfoApartment} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import {useRouter} from 'next/router';
import {statusConfigs} from '~/constants/config/data';
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
import {convertCoin} from '~/common/funcs/convertCoin';
import MainDetailApartment from '../../MainDetailApartment';

function InfoApartment({}: PropsInfoApartment) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuid} = router.query;

	const [dataChangeStateSwitch, setDataChangeStateSwitch] = useState<{
		apartmentMeterUuid: string;
		state: number;
		name: string;
	} | null>(null);

	const {data: apartmentInfo} = useQuery<IDetailInfoApartment>([QUERY_KEY.detail_info_apartment, _uuid], {
		queryFn: () =>
			httpRequest({
				http: apartmentServices.apartmentDetail({uuid: _uuid as string}),
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
				msgSuccess:
					dataChangeStateSwitch?.state == 1
						? `Tắt ${dataChangeStateSwitch?.name} thành công!`
						: `Bật ${dataChangeStateSwitch?.name} thành công!`,
				http: apartmentServices.changeStateMeter({
					apartmentMeterUuid: dataChangeStateSwitch?.apartmentMeterUuid!,
					state: dataChangeStateSwitch?.state === STATE_SWITCH.OFF,
				}),
			}),
		onSuccess(data) {
			console.log('API success:', data);
			if (data) {
				setDataChangeStateSwitch(null);
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.detail_info_apartment, _uuid],
				});
			}
		},
	});

	return (
		<MainDetailApartment>
			<Loading loading={funcChangeSwitch.isLoading} />
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
								<StateActive isSmall={true} stateActive={1} listState={statusConfigs} />
							</FlexLayout>
						}
					>
						<FlexLayout column gap-16>
							<GridColumn col_3>
								<InfoDetail name='Tên căn hộ' value={apartmentInfo?.name} />
								<InfoDetail name='Loại căn hộ' value={apartmentInfo?.apartmentTypeUu?.name} />
								<InfoDetail name='Diện tích' value={`${apartmentInfo?.apartmentSize} m2`} />
								<InfoDetail name='ID ổ khóa' value={apartmentInfo?.lock?.code} />
								{/* <InfoDetail
									name='Phòng'
									value={
										<>
											{apartmentInfo?.apartmentRooms?.flatMap?.((room, index, array) => (
												<span key={index}>
													{room?.item?.name} * <span style={{color: '#2970FF'}}>{room?.count}</span>
													{index < array.length - 1 && <span key={`sep-${room?.uuid}`}>, </span>}
												</span>
											))}
										</>
									}
								/>
								<InfoDetail
									name='Nội thất'
									value={
										<>
											{apartmentInfo?.apartmentFurnitures?.flatMap?.((furniture, index, array) => (
												<span key={index}>
													{furniture?.item?.name} * <span style={{color: '#2970FF'}}>{furniture?.count}</span>
													{index < array.length - 1 && <span key={`sep-${furniture?.uuid}`}>, </span>}
												</span>
											))}
										</>
									}
								/> */}
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

				{apartmentInfo?.meters
					?.filter((meter) => meter?.meterTypeUu?.type === 0)
					?.map((meter, index) => (
						<WrapperForm key={index} title={`Quản lý ${meter?.meterTypeUu?.name}`}>
							<GridColumn col_4>
								<InfoDetail name='Số đầu tháng' value={convertCoin(meter?.initialValue || 0)} />
								<InfoDetail name='Số hiện tại' value={convertCoin(meter?.currentValue || 0)} />
								<InfoDetail name='Số đã tiêu thụ' value={convertCoin(meter?.currentValue - meter?.initialValue)} />

								<InfoDetail
									name={`${meter?.meterTypeUu?.name}`}
									value=''
									actions={
										<SwitchButton
											checkOn={meter?.meterUu?.onState === STATE_SWITCH.ON}
											onClick={() =>
												setDataChangeStateSwitch({
													apartmentMeterUuid: meter?.uuid!,
													state: meter?.meterUu?.onState!,
													name: meter?.meterTypeUu?.name,
												})
											}
										/>
									}
								/>
							</GridColumn>
						</WrapperForm>
					))}

				<Dialog
					open={!!dataChangeStateSwitch}
					type={dataChangeStateSwitch?.state == STATE_SWITCH.ON ? 'error' : 'primary'}
					backgroundIconColor={dataChangeStateSwitch?.state == STATE_SWITCH.ON ? '#ffdce4' : '#b5f4d4ff'}
					borderIconColor={dataChangeStateSwitch?.state == STATE_SWITCH.ON ? '#fff0f3' : '#d6f6e6ff'}
					title={
						dataChangeStateSwitch?.state == STATE_SWITCH.ON
							? `Tắt ${dataChangeStateSwitch?.name}`
							: `Bật ${dataChangeStateSwitch?.name}`
					}
					note={
						dataChangeStateSwitch?.state == STATE_SWITCH.ON
							? `Bạn có chắc chắn muốn tắt ${dataChangeStateSwitch?.name} không?`
							: `Bạn có chắc chắn muốn bật ${dataChangeStateSwitch?.name} không?`
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
		</MainDetailApartment>
	);
}

export default InfoApartment;

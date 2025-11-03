import {useRouter} from 'next/router';
import styles from './DetailAdvertisement.module.scss';
import {IDetailAdvertisement, PropsDetailAdvertisement} from './interfaces';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import StateActive from '~/components/utils/StateActive';
import Moment from 'react-moment';
import WrapperForm from '~/components/utils/WrapperForm';
import GridColumn from '~/components/layouts/GridColumn';
import InfoDetail from '~/components/utils/InfoDetail';
import SwitchButton from '~/components/common/SwitchButton';
import {httpRequest} from '~/services';
import {useState} from 'react';
import {QUERY_KEY, STATE_APARTMENT_ADVERTISEMENT, STATE_SWITCH} from '~/constants/config/enum';
import advertisementServices from '~/services/advertisementServices';
import {statusApartmentAdvertisement} from '~/constants/config/data';
import {convertCoin} from '~/common/funcs/convertCoin';
import Dialog from '~/components/common/Dialog';
import {Warning2} from 'iconsax-react';

function DetailAdvertisement({onClose}: PropsDetailAdvertisement) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuidDetail} = router.query;

	const [dataChangeStateSwitch, setDataChangeStateSwitch] = useState<{
		advertisementUuid: string;
		state: number;
		title: string;
	} | null>(null);

	const {data: detailAdvertisement, isLoading} = useQuery<IDetailAdvertisement>([QUERY_KEY.detail_apartment_advertisement, _uuidDetail], {
		queryFn: () =>
			httpRequest({
				http: advertisementServices.getAdvertisementByUuid({uuid: _uuidDetail as string}),
			}),

		select(data) {
			return data;
		},
		enabled: !!_uuidDetail,
	});

	const funcChangeSwitch = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageSuccess: true,
				showMessageFailed: true,
				msgSuccess:
					dataChangeStateSwitch?.state == STATE_SWITCH.ON
						? `Tắt ${dataChangeStateSwitch?.title} thành công!`
						: `Bật ${dataChangeStateSwitch?.title} thành công!`,
				http: advertisementServices.changeStateAdvertisement({
					uuid: dataChangeStateSwitch?.advertisementUuid!,
					state: dataChangeStateSwitch?.state === STATE_SWITCH.ON ? STATE_SWITCH.OFF : STATE_SWITCH.ON,
					description: '',
				}),
			}),
		onSuccess(data) {
			if (data) {
				setDataChangeStateSwitch(null);
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_apartment_advertisement],
				});
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.detail_apartment_advertisement],
				});
			}
		},
	});

	return (
		<WrapperFormPostion
			width={1400}
			title='Chi tiết bài đăng'
			actions={
				<FlexLayout row gap-8>
					{detailAdvertisement?.state === STATE_APARTMENT_ADVERTISEMENT.EXPIRED && (
						<Button p_8_24 rounded_8 red bold onClick={() => {}}>
							Đăng lại ngay
						</Button>
					)}
					<Button p_8_24 rounded_8 bright-cyan bold onClick={() => {}}>
						Copy và đăng lại
					</Button>
					<Button p_8_24 rounded_8 blue bold onClick={() => {}}>
						Chỉnh sửa
					</Button>
					<Button p_8_24 rounded_8 white bold onClick={onClose}>
						Đóng
					</Button>
				</FlexLayout>
			}
			nodes={
				<FlexLayout row gap-8 items-center>
					<p className={styles.text}>Trạng thái:</p>
					<StateActive isSmall={true} stateActive={detailAdvertisement?.status!} listState={statusApartmentAdvertisement} />

					<div style={{height: '16px', width: '1px', background: '#CDD5DF'}}></div>
					<p className={styles.text}>Thời gian đăng:</p>
					<p className={styles.time}>
						<Moment format='HH:mm, DD/MM/YYYY' date={detailAdvertisement?.startDate} />
					</p>
					<div style={{height: '16px', width: '1px', background: '#CDD5DF'}}></div>
					<p className={styles.text}>Thời hạn đăng:</p>
					<p className={styles.time}>
						<Moment format='HH:mm, DD/MM/YYYY' date={detailAdvertisement?.expireDate} />
					</p>
				</FlexLayout>
			}
		>
			<WrapperForm title='Thông tin bài đăng'>
				<FlexLayout column gap-16>
					<GridColumn col_3>
						<InfoDetail name='Lượt truy cập' value={'8.000'} />
						<InfoDetail name='Người đăng' value={'Vũ Đức Anh'} textColor='#1F5FFF' />
						<InfoDetail
							name='Hiển thị'
							value='Hiển thị'
							actions={
								<SwitchButton
									checkOn={detailAdvertisement?.state === STATE_SWITCH.ON}
									onClick={() =>
										setDataChangeStateSwitch({
											advertisementUuid: detailAdvertisement?.uuid!,
											state: detailAdvertisement?.state!,
											title: detailAdvertisement?.title!,
										})
									}
								/>
							}
						/>
					</GridColumn>

					<GridColumn col_3>
						<InfoDetail name='Giá thuê (VND)' value={convertCoin(detailAdvertisement?.price!) || 0} />
						<InfoDetail name='Tiền cọc (VND)' value={convertCoin(detailAdvertisement?.deposit!) || 0} />
						<InfoDetail name='SĐT liên hệ' value={detailAdvertisement?.phoneNumber || '---'} />
					</GridColumn>

					<GridColumn col_3>
						<InfoDetail name='Giá điện (VND)' value={'4.000/KW'} />
						<InfoDetail name='Giá nước (VND)' value={'100.000/Người'} />
						<InfoDetail name='Chỉnh sửa gần nhất' value={'24/08/2025 08:25:22'} />
						<InfoDetail name='Tiêu đề' value={detailAdvertisement?.title || '---'} />
					</GridColumn>
					<InfoDetail name='Mô tả chi tiết' value={detailAdvertisement?.description || '---'} />
				</FlexLayout>
			</WrapperForm>

			<WrapperForm title='Thông tin căn hộ'>
				<FlexLayout column gap-16>
					<GridColumn col_3>
						<InfoDetail name='Tên căn hộ' value={'Chung cư ABC 14A - Lý Diệu'} />
						<InfoDetail name='Loại hình căn hộ' value={'Chung cư mini'} />
						<InfoDetail name='Diện tích' value='92 m2' />
					</GridColumn>

					<GridColumn col_3>
						<InfoDetail name='Thông tin phòng' value={'Phòng ngủ *3, Phòng khách *1, Phòng vệ sinh*2'} />
						<InfoDetail name='Nội thất' value={'---'} />
					</GridColumn>
					<InfoDetail
						name='Hình ảnh'
						value=''
						// images={apartmentInfo?.attachments?.map((item) => `${process.env.NEXT_PUBLIC_IMAGE}/${item}`)}
						images={[
							'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
							'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
							'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
						]}
					/>
				</FlexLayout>
			</WrapperForm>

			<Dialog
				open={!!dataChangeStateSwitch}
				type={dataChangeStateSwitch?.state == STATE_SWITCH.ON ? 'error' : 'primary'}
				backgroundIconColor={dataChangeStateSwitch?.state == STATE_SWITCH.ON ? '#ffdce4' : '#b5f4d4ff'}
				borderIconColor={dataChangeStateSwitch?.state == STATE_SWITCH.ON ? '#fff0f3' : '#d6f6e6ff'}
				title={
					dataChangeStateSwitch?.state == STATE_SWITCH.ON
						? `Tắt ${dataChangeStateSwitch?.title}`
						: `Bật ${dataChangeStateSwitch?.title}`
				}
				note={
					dataChangeStateSwitch?.state == STATE_SWITCH.ON
						? `Bạn có chắc chắn muốn tắt ${dataChangeStateSwitch?.title} không?`
						: `Bạn có chắc chắn muốn bật ${dataChangeStateSwitch?.title} không?`
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
		</WrapperFormPostion>
	);
}

export default DetailAdvertisement;

import {useRouter} from 'next/router';
import styles from './DetailApartmentVisit.module.scss';
import {IDetailRequestView, PropsDetailApartmentVisit} from './interfaces';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {httpRequest} from '~/services';
import apartmentVisitServices from '~/services/apartmentVisitServices';
import {QUERY_KEY, STATE_APARTMENT_VISIT} from '~/constants/config/enum';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import StateActive from '~/components/utils/StateActive';
import Moment from 'react-moment';
import WrapperForm from '~/components/utils/WrapperForm';
import Image from 'next/image';
import {statusApartmentVisit} from '~/constants/config/data';
import GridColumn from '~/components/layouts/GridColumn';
import InfoDetail from '~/components/utils/InfoDetail';
import Dialog from '~/components/common/Dialog';
import {Warning2} from 'iconsax-react';

function DetailApartmentVisit({onClose}: PropsDetailApartmentVisit) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuidRequestVisit} = router.query;

	const [rejectApartment, setRejectApartment] = useState<string>('');

	const {data: detailRequestView} = useQuery<IDetailRequestView>([QUERY_KEY.detail_apartment_visit_module, _uuidRequestVisit], {
		queryFn: () =>
			httpRequest({
				http: apartmentVisitServices.getDetailLApartmentVisit({uuid: _uuidRequestVisit as string}),
			}),

		select(data) {
			return data;
		},
		enabled: !!_uuidRequestVisit,
	});

	const funcRejectView = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageSuccess: true,
				showMessageFailed: true,
				msgSuccess: 'Từ chối xem căn hộ thành công',
				http: apartmentVisitServices.rejectVisitRequest({
					uuid: rejectApartment,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setRejectApartment('');
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.detail_apartment_visit_module],
				});
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_apartment_visit_module],
				});
			}
		},
	});
	return (
		<WrapperFormPostion
			width={1200}
			title='Chi tiết yêu cầu xem căn hộ'
			actions={
				<FlexLayout row gap-8>
					{detailRequestView?.status === STATE_APARTMENT_VISIT.APPROVED && (
						<Button p_8_24 rounded_8 red bold onClick={() => setRejectApartment(_uuidRequestVisit as string)}>
							Từ chối xem
						</Button>
					)}
					<Button p_8_24 rounded_8 white bold onClick={onClose}>
						Đóng
					</Button>
				</FlexLayout>
			}
			nodes={
				<FlexLayout row gap-8 items-center>
					<p className={styles.text}>Trạng thái yêu cầu:</p>
					<StateActive isSmall={true} stateActive={detailRequestView?.status!} listState={statusApartmentVisit} />

					<div style={{height: '16px', width: '1px', background: '#CDD5DF'}}></div>
					<p className={styles.text}>Thời gian xem:</p>
					<p className={styles.time}>
						<Moment date={detailRequestView?.from} format='HH:mm, DD/MM/YYYY' />
						-
						<Moment date={detailRequestView?.to} format='HH:mm, DD/MM/YYYY' />
					</p>
				</FlexLayout>
			}
		>
			<WrapperForm title='Thông tin người xem'>
				<FlexLayout column gap-16>
					<Image
						src={`${process.env.NEXT_PUBLIC_IMAGE}/${detailRequestView?.identification?.selfieImage}`}
						alt='Ảnh đại diện'
						width={120}
						height={120}
						style={{borderRadius: '4px'}}
					/>

					<GridColumn col_3>
						<InfoDetail name='Tên tài khoản' value={detailRequestView?.identification?.userUu?.name} textColor='#1F5FFF' />
						<InfoDetail name='Số điện thoại' value={detailRequestView?.identification?.userUu?.phoneNumber} />
					</GridColumn>
				</FlexLayout>
			</WrapperForm>

			<WrapperForm title='Thông tin CMND/CCCD'>
				<GridColumn col_3>
					<InfoDetail name='Số CMND/CCCD' value={detailRequestView?.identification?.identityNumber} />
					<InfoDetail name='Nơi cấp' value={detailRequestView?.identification?.issuedPlace} />
					<InfoDetail name='Ngày cấp' value={detailRequestView?.identification?.issuedDate} />
					<InfoDetail
						name='Ảnh mặt trước'
						value=''
						actions={
							<Image
								src={`${process.env.NEXT_PUBLIC_IMAGE}/${detailRequestView?.identification?.idFrontImage}`}
								alt='Ảnh mặt trước'
								width={368}
								height={216}
								style={{borderRadius: '8px'}}
							/>
						}
					/>

					<InfoDetail
						name='Ảnh mặt sau'
						value=''
						actions={
							<Image
								src={`${process.env.NEXT_PUBLIC_IMAGE}/${detailRequestView?.identification?.idBackImage}`}
								alt='Ảnh mặt sau'
								width={368}
								height={216}
								style={{borderRadius: '8px'}}
							/>
						}
					/>
				</GridColumn>
			</WrapperForm>

			<Dialog
				open={!!rejectApartment}
				type='error'
				backgroundIconColor='#ffdce4'
				borderIconColor='#fff0f3'
				title='Từ chối yêu cầu xem căn hộ'
				note={<span>Bạn có chắc chắn muốn từ chối yêu cầu xem căn hộ này không?</span>}
				icon={<Warning2 size='28' color='#EE0033' />}
				onClose={() => setRejectApartment('')}
				onSubmit={() => funcRejectView.mutate()}
			/>
		</WrapperFormPostion>
	);
}

export default DetailApartmentVisit;

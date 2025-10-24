import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import styles from './DetailRequestRepairApartment.module.scss';
import {IDetailRequestRepair, PropsDetailRequestRepairApartment} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import StateActive from '~/components/utils/StateActive';
import Moment from 'react-moment';
import WrapperForm from '~/components/utils/WrapperForm';
import InfoDetail from '~/components/utils/InfoDetail';
import GridColumn from '~/components/layouts/GridColumn';
import {useRouter} from 'next/router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import incidentServices from '~/services/incidentServices';
import {useState} from 'react';
import {QUERY_KEY, STATE_APARTMENT_INCIDENT_REPORTS} from '~/constants/config/enum';
import {statusApartmentIncidentReport} from '~/constants/config/data';
import {getDetailAddress} from '~/common/funcs/optionConvert';
import Dialog from '~/components/common/Dialog';
import {Warning2} from 'iconsax-react';
import Form, {TextArea} from '~/components/common/Form';
import Popup from '~/components/common/Popup';
import ConfirmRequest from '../../../RequestViewApartment/components/ConfirmRequest';

function DetailRequestRepairApartment({onClose}: PropsDetailRequestRepairApartment) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuidRequestRepair} = router.query;
	const [uuidConfirm, setUuidConfirm] = useState<string>('');

	const [form, setForm] = useState<{note: string}>({
		note: '',
	});
	const [rejectRepairApartment, setRejectRepairApartment] = useState<string>('');

	const {data: detailRequestRepair} = useQuery<IDetailRequestRepair>([QUERY_KEY.detail_request_repair, _uuidRequestRepair], {
		queryFn: () =>
			httpRequest({
				http: incidentServices.detailIncidentReport({uuid: _uuidRequestRepair as string}),
			}),

		select(data) {
			return data;
		},
		enabled: !!_uuidRequestRepair,
	});

	const funcRequestRepairApartment = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageSuccess: true,
				showMessageFailed: true,
				msgSuccess: 'Từ chối yêu cầu thành công',
				http: incidentServices.acceptOrRejectIncident({
					uuid: rejectRepairApartment,
					description: '',
					status: STATE_APARTMENT_INCIDENT_REPORTS.CANCELED,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setRejectRepairApartment('');
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.detail_request_repair],
				});
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_apartment_incident],
				});
			}
		},
	});

	return (
		<WrapperFormPostion
			width={1200}
			title='Chi tiết yêu cầu'
			actions={
				<FlexLayout row gap-8>
					{detailRequestRepair?.status === STATE_APARTMENT_INCIDENT_REPORTS.PENDING && (
						<Button p_8_24 rounded_8 green bold onClick={() => setUuidConfirm(_uuidRequestRepair as string)}>
							Xác nhận đã xử lý
						</Button>
					)}
					{detailRequestRepair?.status === STATE_APARTMENT_INCIDENT_REPORTS.PENDING && (
						<Button p_8_24 rounded_8 red bold onClick={() => setRejectRepairApartment(_uuidRequestRepair as string)}>
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
					<StateActive isSmall={true} stateActive={detailRequestRepair?.status!} listState={statusApartmentIncidentReport} />

					<div style={{height: '16px', width: '1px', background: '#CDD5DF'}}></div>
					<p className={styles.text}>Thời gian xem:</p>
					<p className={styles.time}>
						<Moment date={detailRequestRepair?.reportDate} format='HH:mm, DD/MM/YYYY' />
					</p>
				</FlexLayout>
			}
		>
			<WrapperForm title='Thông tin sự cố'>
				<GridColumn col_2>
					<InfoDetail name='Tên căn hộ' value={detailRequestRepair?.apartmentUu?.name} />
					<InfoDetail
						name='Địa chỉ'
						value={getDetailAddress({
							address: detailRequestRepair?.apartmentUu?.address!,
							provinceName: detailRequestRepair?.apartmentUu?.province?.fullName!,
							districtName: '',
							wardName: detailRequestRepair?.apartmentUu?.ward?.fullName!,
						})}
					/>
					<InfoDetail name='Tài khoản báo sửa' value={detailRequestRepair?.userReportUu?.name} />
					<InfoDetail name='Số điện thoại' value={detailRequestRepair?.userReportUu?.phoneNumber} />
				</GridColumn>
			</WrapperForm>

			<WrapperForm title='Hình ảnh sự cố'>
				<InfoDetail
					name=''
					value=''
					images={detailRequestRepair?.images?.map((item) => `${process.env.NEXT_PUBLIC_IMAGE}/${item}`)}
				/>
			</WrapperForm>

			{detailRequestRepair?.status === STATE_APARTMENT_INCIDENT_REPORTS.RESOLVED && (
				<>
					<WrapperForm title='Thông tin xử lý'>
						<GridColumn col_2>
							<InfoDetail name='Chi phí' value={detailRequestRepair?.resolveInfo?.price || '---'} />
							<InfoDetail name='Ghi chú' value={detailRequestRepair?.resolveInfo?.description || '---'} />
						</GridColumn>
					</WrapperForm>

					<WrapperForm title='Hình ảnh bảo trì'>
						<InfoDetail
							name=''
							value=''
							images={detailRequestRepair?.resolveInfo?.documents?.map((item) => `${process.env.NEXT_PUBLIC_IMAGE}/${item}`)}
						/>
					</WrapperForm>
				</>
			)}

			<Dialog
				open={!!rejectRepairApartment}
				type='error'
				backgroundIconColor='#ffdce4'
				borderIconColor='#fff0f3'
				title='Từ chối yêu cầu'
				note={<span>Bạn có chắc chắn muốn từ chối yêu cầu xử lý sửa chữa không?</span>}
				icon={<Warning2 size='28' color='#EE0033' />}
				onClose={() => setRejectRepairApartment('')}
				onSubmit={funcRequestRepairApartment.mutate}
				isDisabledBtnSubmit={!form?.note}
				form={
					<Form form={form} setForm={setForm}>
						<TextArea name='note' placeholder='Từ chối yêu cầu' />
					</Form>
				}
			/>

			<Popup open={!!uuidConfirm} onClose={() => setUuidConfirm('')}>
				<ConfirmRequest uuidConfirm={uuidConfirm} onClose={() => setUuidConfirm('')} />
			</Popup>
		</WrapperFormPostion>
	);
}

export default DetailRequestRepairApartment;

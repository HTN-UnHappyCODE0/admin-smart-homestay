import FlexLayout from '~/components/layouts/FlexLayout';
import styles from './MainDetailApartment.module.scss';
import {PropsMainDetailApartment} from './interfaces';
import LayoutMainPage from '~/components/layouts/LayoutMainPage';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import {QUERY_KEY} from '~/constants/config/enum';
import apartmentServices from '~/services/apartmentServices';
import {useMemo} from 'react';

function MainDetailApartment({children}: PropsMainDetailApartment) {
	const router = useRouter();

	const {_uuid} = router.query;

	const {data = {numIncidentRequest: 0, numVisitRequest: 0}} = useQuery<{
		numVisitRequest: number;
		numIncidentRequest: number;
	}>([QUERY_KEY.request_summary_apartment, _uuid], {
		queryFn: () =>
			httpRequest({
				http: apartmentServices.requestSummary({
					uuid: _uuid as string,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_uuid,
	});

	const tabs: {
		title: string;
		path: string;
		pathActive: string;
	}[] = useMemo(() => {
		return [
			{
				title: 'Thông tin căn hộ',
				path: `${PATH.InfoApartment}?_uuid=${_uuid}`,
				pathActive: PATH.InfoApartment,
			},
			{
				title: 'Hợp đồng thuê',
				path: `${PATH.RentalContractApartment}?_uuid=${_uuid}`,
				pathActive: PATH.RentalContractApartment,
			},
			{
				title: `Yêu cầu sửa chữa (${data?.numIncidentRequest})`,
				path: `${PATH.RequestRepairApartment}?_uuid=${_uuid}`,
				pathActive: PATH.RequestRepairApartment,
			},
			{
				title: `Yêu cầu xem căn hộ (${data?.numVisitRequest})`,
				path: `${PATH.RequestViewApartment}?_uuid=${_uuid}`,
				pathActive: PATH.RequestViewApartment,
			},
			{
				title: 'Danh sách quảng cáo',
				path: `${PATH.ListAdvertisementApartment}?_uuid=${_uuid}`,
				pathActive: PATH.ListAdvertisementApartment,
			},
			{
				title: 'Danh sách thiết bị',
				path: `${PATH.ListMeterApartment}?_uuid=${_uuid}`,
				pathActive: PATH.ListMeterApartment,
			},
			{
				title: 'Danh sách nội thất',
				path: PATH.Any,
				pathActive: PATH.Any,
			},
			{
				title: 'Danh sách đánh giá',
				path: PATH.Any,
				pathActive: PATH.Any,
			},
			{
				title: 'Lịch sử thanh toán',
				path: PATH.Any,
				pathActive: PATH.Any,
			},
			{
				title: 'Danh sách hợp đồng',
				path: PATH.Any,
				pathActive: PATH.Any,
			},
		];
	}, [data]);

	return (
		<FlexLayout column gap-12>
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
								<Button p_8_16 rounded_8 bright-cyan bold href={`${PATH.UpdateApartment}?_uuid=${_uuid}`}>
									Chỉnh sửa
								</Button>
							</FlexLayout>
						}
					/>
				}
				title='Chi tiết căn hộ'
				tabs={tabs}
			>
				{children}
			</LayoutMainPage>
		</FlexLayout>
	);
}

export default MainDetailApartment;

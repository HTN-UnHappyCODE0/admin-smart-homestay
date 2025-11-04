import FlexLayout from '~/components/layouts/FlexLayout';
import styles from './MainDetailApartment.module.scss';
import {PropsMainDetailApartment} from './interfaces';
import LayoutMainPage from '~/components/layouts/LayoutMainPage';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import {tabsDetailApartments} from '~/constants/config/data';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import apartmentVisitServices from '~/services/apartmentVisitServices';
import {CONFIG_PAGING, CONFIG_TYPE_FINDING} from '~/constants/config/enum';
import incidentServices from '~/services/incidentServices';

function MainDetailApartment({children}: PropsMainDetailApartment) {
	const router = useRouter();

	const {_uuid} = router.query;

	const {data: countRequestView} = useQuery({
		queryKey: ['countRequestView', _uuid],
		queryFn: () =>
			httpRequest({
				http: apartmentVisitServices.getApartmentVisit({
					isPaging: CONFIG_PAGING.IS_PAGING,
					apartmentUuid: _uuid as string,
					typeFinding: CONFIG_TYPE_FINDING.DTO,
					page: 1,
					pageSize: 20,
					keyword: '',
					status: null,
					from: null,
					to: null,
					userUuid: '',
				}),
			}),
		select(data) {
			return data?.pagination?.totalCount;
		},
	});

	const {data: countRequestRepair} = useQuery({
		queryKey: ['countRequestRepair', _uuid],
		queryFn: () =>
			httpRequest({
				http: incidentServices.getIncidentReports({
					isPaging: CONFIG_PAGING.NO_PAGING,
					apartmentUuid: _uuid as string,
					typeFinding: CONFIG_TYPE_FINDING.DTO,
					page: 1,
					pageSize: 20,
					userUuid: '',
					keyword: '',
					status: null,
				}),
			}),
		select(data) {
			return data?.pagination?.totalCount;
		},
	});

	const counts = {
		requestView: countRequestView,
		requestRepair: countRequestRepair,
	};

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
				tabs={tabsDetailApartments(_uuid as string, counts)}
			>
				{children}
			</LayoutMainPage>
		</FlexLayout>
	);
}

export default MainDetailApartment;

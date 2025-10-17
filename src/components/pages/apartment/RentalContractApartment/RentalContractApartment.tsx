import FlexLayout from '~/components/layouts/FlexLayout';
import styles from './RentalContractApartment.module.scss';
import {ICurrentContract, IUserContract, PropsRentalContractApartment} from './interfaces';
import WrapperForm from '~/components/utils/WrapperForm';
import GridColumn from '~/components/layouts/GridColumn';
import InfoDetail from '~/components/utils/InfoDetail';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import Moment from 'react-moment';
import Pagination from '~/components/common/Pagination';
import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {CONFIG_PAGING, QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import {useRouter} from 'next/router';
import contractServices from '~/services/contractServices';
import StateActive from '~/components/utils/StateActive';
import {statusContract, statusRentalContract, tabsDetailApartments} from '~/constants/config/data';
import LayoutMainPage from '~/components/layouts/LayoutMainPage';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';

function RentalContractApartment({}: PropsRentalContractApartment) {
	const router = useRouter();
	const {_uuid} = router.query;

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [keyword, setKeyword] = useState<string>('');
	const [status, setStatus] = useState<number | null>(null);

	const {
		data = {
			items: [],
			pagination: {
				totalCount: 0,
				totalPage: 0,
			},
		},
		isLoading,
	} = useQuery<{
		items: IUserContract[];
		pagination: {
			totalCount: number;
			totalPage: number;
		};
	}>([QUERY_KEY.table_rental_contract, page, pageSize, keyword, _uuid], {
		queryFn: () =>
			httpRequest({
				http: contractServices.getUserContract({
					uuid: _uuid as string,
					isPaging: CONFIG_PAGING.IS_PAGING,
					keyword: keyword,
					page: page,
					pageSize: pageSize,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const {data: apartmentInfo} = useQuery<ICurrentContract>([QUERY_KEY.detail_user_contract, _uuid], {
		queryFn: () =>
			httpRequest({
				http: contractServices.getCurrentContract({
					uuid: _uuid as string,
				}),
			}),

		select(data) {
			return data;
		},
		enabled: !!_uuid,
	});

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
								path: '',
								title: 'Chi tiết căn hộ',
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
				<WrapperForm title='Thông tin hợp đồng'>
					<GridColumn col_4>
						<InfoDetail name='Mã hợp đồng' value={apartmentInfo?.code || '---'} />
						<InfoDetail name='Người thuê' value={apartmentInfo?.userSignUu?.name} />
						<InfoDetail name='Số người ở ' value={apartmentInfo?.numPerson || 0} />
						<InfoDetail name='Số tiền cọc' value={apartmentInfo?.deposit || 0} />
						<InfoDetail name='Giá cho thuê' value={apartmentInfo?.price || 0} />
						<InfoDetail name='Thời hạn hợp đồng' value={<Moment date={apartmentInfo?.from} format='DD/MM/YYYY' />} />
					</GridColumn>
				</WrapperForm>

				<div style={{marginTop: '16px'}}>
					<WrapperForm title='Thông tin người thuê'>
						<DataWrapper
							data={data?.items || []}
							loading={isLoading}
							title='Thông tin người thuê trống!'
							note='Danh sách thông tin người thuê hiện đang trống!'
						>
							<Table<IUserContract>
								rowKey={(row) => row?.userUu?.uuid}
								data={data?.items || []}
								fixedHeader={true}
								column={[
									{
										title: 'STT',
										fixedLeft: true,
										render: (_, index) => <>{index + 1}</>,
									},
									{
										title: 'Họ và tên',
										render: (row, _) => <>{row?.userUu?.name}</>,
									},
									{
										title: 'Số điện thoại',
										render: (row, _) => <>{row?.userUu?.phoneNumber || '---'}</>,
									},
									{
										title: 'Hợp đồng',
										render: (row, _) => <StateActive stateActive={row?.type} listState={statusContract} />,
									},
									{
										title: 'Tạm trú tạm vắng',
										render: (row, _) => (
											<StateActive stateActive={row?.hasResidenceRegistered} listState={statusRentalContract} />
										),
									},
								]}
							/>
						</DataWrapper>

						<Pagination
							page={page}
							onSetPage={setPage}
							pageSize={pageSize}
							onSetPageSize={setPageSize}
							total={1}
							dependencies={[pageSize, keyword]}
						/>
					</WrapperForm>
				</div>
			</LayoutMainPage>
		</FlexLayout>
	);
}

export default RentalContractApartment;

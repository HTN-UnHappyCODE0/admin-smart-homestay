import FlexLayout from '~/components/layouts/FlexLayout';
import styles from './RequestViewApartment.module.scss';
import {IApartmentVisit, PropsRequestViewApartment} from './interfaces';
import Button from '~/components/common/Button/Button';
import {statusApartmentVisit} from '~/constants/config/data';
import {useRouter} from 'next/router';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import Search from '~/components/common/Search';
import FilterDateRange from '~/components/common/FilterDateRange';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import StateActive from '~/components/utils/StateActive';
import IconActionTable from '~/components/utils/IconActionTable';
import {CloseCircle, Eye, Warning2} from 'iconsax-react';
import {useState} from 'react';
import {CONFIG_PAGING, CONFIG_TYPE_FIND, QUERY_KEY, STATE_APARTMENT_VISIT, TYPE_DATE} from '~/constants/config/enum';
import FilterCustom from '~/components/common/FilterCustom';
import WrapperForm from '~/components/utils/WrapperForm';
import Pagination from '~/components/common/Pagination';
import Dialog from '~/components/common/Dialog';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import PositionContainer from '~/components/common/PositionContainer';
import DetailRequestViewApartment from './components/DetailRequestViewApartment';
import {httpRequest} from '~/services';
import apartmentVisitServices from '~/services/apartmentVisitServices';
import Moment from 'react-moment';
import moment from 'moment';
import MainDetailApartment from '../../MainDetailApartment';

function RequestViewApartment({}: PropsRequestViewApartment) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuid, _uuidDetail} = router.query;

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [keyword, setKeyword] = useState<string>('');
	const [status, setStatus] = useState<number | null>(null);
	const [typeDate, setTypeDate] = useState<TYPE_DATE>(TYPE_DATE.ALL);
	const [date, setDate] = useState<{from: Date | null; to: Date | null} | null>(null);
	const [rejectApartment, setRejectApartment] = useState<string>('');

	const resetFilter = () => {
		setKeyword('');
		setTypeDate(TYPE_DATE.ALL);
		setDate(null);
		setStatus(null);
		setRejectApartment('');
	};

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
		items: IApartmentVisit[];
		pagination: {
			totalCount: number;
			totalPage: number;
		};
	}>([QUERY_KEY.table_apartment_visit, page, pageSize, keyword, status, _uuid, date?.to, date?.from], {
		queryFn: () =>
			httpRequest({
				http: apartmentVisitServices.getApartmentVisit({
					isPaging: CONFIG_PAGING.IS_PAGING,
					typeFinding: CONFIG_TYPE_FIND.TABLE,
					page: page,
					pageSize: pageSize,
					keyword: keyword,
					status: status,
					apartmentUuid: _uuid as string,
					from: date?.from ? moment(date.from).startOf('day').format('YYYY-MM-DDTHH:mm:ss') : null,
					to: date?.to ? moment(date.to).endOf('day').format('YYYY-MM-DDTHH:mm:ss') : null,
					userUuid: '',
				}),
			}),
		select(data) {
			return data;
		},
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
					queryKey: [QUERY_KEY.table_apartment_visit],
				});
			}
		},
	});

	return (
		<MainDetailApartment>
			<WrapperForm title='Danh sách yêu cầu xem căn hộ'>
				<FlexLayout row gap-8 justify-space-between wrap fit-height>
					<FlexItem>
						<FlexLayout row gap-8 wrap>
							<Search keyword={keyword} setKeyword={setKeyword} />
							<FilterDateRange date={date} setDate={setDate} typeDate={typeDate} setTypeDate={setTypeDate} />
							<FilterCustom
								name='Trạng thái'
								value={status}
								setValue={setStatus}
								listOption={statusApartmentVisit.map((item) => ({
									uuid: item.state,
									name: item.text,
								}))}
							/>
							<FlexLayout row gap-8>
								<Button p_8_24 black rounded_24 bold onClick={resetFilter}>
									Đặt lại
								</Button>
							</FlexLayout>
						</FlexLayout>
					</FlexItem>
				</FlexLayout>

				<div style={{marginTop: '12px'}}>
					<FlexItem flex-1 overflow-x>
						<DataWrapper
							data={data?.items || []}
							loading={isLoading}
							title='Dữ liệu trống!'
							note='Danh sách dữ liệu hiện đang trống!'
						>
							<Table<IApartmentVisit>
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
										title: 'Tên tài khoản',
										render: (row, _) => <>{row?.userUu?.name || '---'}</>,
									},
									{
										title: 'Số điện thoại',
										render: (row, _) => <>{row?.userUu?.phoneNumber || '---'}</>,
									},
									{
										title: 'Thời gian xem',
										render: (row, _) => (
											<>
												<Moment from={row?.from} format='HH:mm, DD/MM/YYYY' /> -
												<Moment from={row?.to} format='HH:mm, DD/MM/YYYY' />
											</>
										),
									},
									{
										title: 'Trạng thái',
										render: (row, _) => <StateActive stateActive={row?.status} listState={statusApartmentVisit} />,
									},
									{
										title: 'Tác vụ',
										fixedRight: true,
										render: (row, _) => (
											<FlexLayout row>
												<IconActionTable
													icon={<Eye color='#292D32' size={24} />}
													tooltip='Xem chi tiết'
													onClick={() =>
														router.replace({
															pathname: router.pathname,
															query: {
																...router.query,
																_uuidDetail: row?.uuid,
															},
														})
													}
												/>
												{row?.status === STATE_APARTMENT_VISIT.PENDING && (
													<IconActionTable
														icon={<CloseCircle color='#EE0033' size={24} />}
														tooltip='Từ chối yêu cầu'
														onClick={() => setRejectApartment(row?.uuid)}
													/>
												)}
											</FlexLayout>
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
							total={data?.pagination?.totalCount || 0}
							dependencies={[pageSize, keyword, status, _uuid, date?.to, date?.from]}
						/>
					</FlexItem>
				</div>
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

			<PositionContainer
				open={!!_uuidDetail}
				onClose={() => {
					const {_uuidDetail, ...rest} = router.query;

					router.replace({
						pathname: router.pathname,
						query: {
							...rest,
						},
					});
				}}
			>
				<DetailRequestViewApartment
					onClose={() => {
						const {_uuidDetail, ...rest} = router.query;

						router.replace({
							pathname: router.pathname,
							query: {
								...rest,
							},
						});
					}}
				/>
			</PositionContainer>
		</MainDetailApartment>
	);
}

export default RequestViewApartment;

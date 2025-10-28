import {useRouter} from 'next/router';
import styles from './MainApartmentVisit.module.scss';
import {IApartmentVisit, PropsMainApartmentVisit} from './interfaces';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Fragment, useState} from 'react';
import {CONFIG_PAGING, CONFIG_TYPE_FIND, QUERY_KEY, STATE_APARTMENT_VISIT, TYPE_DATE} from '~/constants/config/enum';
import FlexLayout from '~/components/layouts/FlexLayout';
import Header from '~/components/utils/Header';
import Button from '~/components/common/Button';
import {AddCircle, CloseCircle, Eye, Warning2} from 'iconsax-react';
import {PATH} from '~/constants/config';
import SearchBlock from '~/components/utils/SearchBlock';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import FilterCustom from '~/components/common/FilterCustom';
import FilterDateRange from '~/components/common/FilterDateRange';
import {statusApartmentVisit} from '~/constants/config/data';
import Pagination from '~/components/common/Pagination';
import MainTable from '~/components/utils/MainTable';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import {httpRequest} from '~/services';
import apartmentVisitServices from '~/services/apartmentVisitServices';
import moment from 'moment';
import Moment from 'react-moment';
import StateActive from '~/components/utils/StateActive';
import IconActionTable from '~/components/utils/IconActionTable';
import Dialog from '~/components/common/Dialog';
import PositionContainer from '~/components/common/PositionContainer';
import DetailApartmentVisit from '../DetailApartmentVisit';

function MainApartmentVisit({}: PropsMainApartmentVisit) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuid, _uuidRequestVisit} = router.query;

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
	}>([QUERY_KEY.table_apartment_visit_module, page, pageSize, keyword, status, _uuid, date?.to, date?.from], {
		queryFn: () =>
			httpRequest({
				http: apartmentVisitServices.getApartmentVisit({
					isPaging: CONFIG_PAGING.IS_PAGING,
					typeFinding: CONFIG_TYPE_FIND.TABLE,
					page: page,
					pageSize: pageSize,
					keyword: keyword,
					status: status,
					apartmentUuid: '',
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
					queryKey: [QUERY_KEY.table_apartment_visit_module],
				});
			}
		},
	});

	return (
		<Fragment>
			<FlexLayout column gap-12>
				<Header
					title='Yêu cầu xem nhà'
					actions={
						<FlexLayout row gap-6>
							<Button icon={<AddCircle />} p_8_24 rounded_40 bright-cyan bold href={'#'}>
								Thêm mới
							</Button>
						</FlexLayout>
					}
				/>

				<SearchBlock
					keyword={keyword}
					setKeyword={setKeyword}
					placeholder='Tìm kiếm theo mã, tên danh mục'
					action={
						<FlexLayout row gap-8 fit-height>
							<FlexItem flex-1 overflow-y scrollbar>
								<FlexLayout row gap-8>
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
								</FlexLayout>
							</FlexItem>
							<FlexLayout row gap-8>
								<Button p_8_24 black rounded_24 bold onClick={resetFilter}>
									Đặt lại
								</Button>
							</FlexLayout>
						</FlexLayout>
					}
				/>

				<FlexItem flex-1 overflow-x>
					<MainTable>
						<DataWrapper
							data={data?.items || []}
							loading={isLoading}
							title='Yêu cầu xem căn nhà trống!'
							note='Danh sách căn nhà hiện đang trống!'
						>
							<Table<IApartmentVisit>
								rowKey={(row) => row.uuid}
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
										render: (row, _) => <>{row?.identification?.userUu?.name || '---'}</>,
									},
									{
										title: 'Số điện thoại',
										render: (row, _) => <>{row?.identification?.userUu?.phoneNumber || '---'}</>,
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
																_uuidRequestVisit: row?.uuid,
															},
														})
													}
												/>
												{row?.status === STATE_APARTMENT_VISIT.APPROVED && (
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
							total={data?.pagination.totalCount || 0}
							dependencies={[pageSize, keyword, status, _uuid, date?.to, date?.from]}
						/>
					</MainTable>
				</FlexItem>

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
					open={!!_uuidRequestVisit}
					onClose={() => {
						const {_uuidRequestVisit, ...rest} = router.query;

						router.replace({
							pathname: router.pathname,
							query: {
								...rest,
							},
						});
					}}
				>
					<DetailApartmentVisit
						onClose={() => {
							const {_uuidRequestVisit, ...rest} = router.query;

							router.replace({
								pathname: router.pathname,
								query: {
									...rest,
								},
							});
						}}
					/>
				</PositionContainer>
			</FlexLayout>
		</Fragment>
	);
}

export default MainApartmentVisit;

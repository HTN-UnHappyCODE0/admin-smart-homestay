import {Fragment, useState} from 'react';
import styles from './MainElectricWater.module.scss';
import {IMeter, PropsMainElectricWater} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Header from '~/components/utils/Header';
import SearchBlock from '~/components/utils/SearchBlock';
import FilterCustom from '~/components/common/FilterCustom';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import Button from '~/components/common/Button';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import Pagination from '~/components/common/Pagination';
import MainTable from '~/components/utils/MainTable';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import StateActive from '~/components/utils/StateActive';
import IconActionTable from '~/components/utils/IconActionTable';
import {Eye} from 'iconsax-react';
import {PATH} from '~/constants/config';
import moment from 'moment';
import Link from 'next/link';
import {httpRequest} from '~/services';
import {CONFIG_PAGING, CONFIG_TYPE_FINDING, QUERY_KEY, TYPE_DATE} from '~/constants/config/enum';
import meterServices from '~/services/meterServices';
import FilterDateRange from '~/components/common/FilterDateRange';

function MainElectricWater({}: PropsMainElectricWater) {
	const queryClient = useQueryClient();

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [keyword, setKeyword] = useState<string>('');
	const [status, setStatus] = useState<number | null>(null);
	const [date, setDate] = useState<{from: Date | null; to: Date | null} | null>(null);
	const [typeDate, setTypeDate] = useState<TYPE_DATE>(TYPE_DATE.ALL);

	const resetFilter = () => {
		setPage(1);
		setPageSize(20);
		setKeyword('');
		setStatus(null);
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
		items: IMeter[];
		pagination: {
			totalCount: number;
			totalPage: number;
		};
	}>([QUERY_KEY.table_electric_meter, page, pageSize, keyword, date?.from, date?.to], {
		queryFn: () =>
			httpRequest({
				http: meterServices.listmeter({
					isPaging: CONFIG_PAGING.IS_PAGING,
					typeFinding: CONFIG_TYPE_FINDING.DTO,
					page: page,
					pageSize: pageSize,
					keyword: keyword,
					status: null,
					installDateFrom: date?.from ? moment(date.from).startOf('day').format('YYYY-MM-DDTHH:mm:ss') : null,
					installDateTo: date?.to ? moment(date.to).endOf('day').format('YYYY-MM-DDTHH:mm:ss') : null,
					isUsed: null,
					meterTypeUuid: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	return (
		<Fragment>
			<FlexLayout column gap-12>
				<Header title='Quản lý điện nước' />
				<SearchBlock
					keyword={keyword}
					setKeyword={setKeyword}
					placeholder='Tìm kiếm theo mã, tên danh mục'
					action={
						<FlexLayout row gap-8 fit-height>
							<FlexItem flex-1 overflow-y scrollbar>
								<FlexLayout row gap-8>
									<FilterDateRange date={date} setDate={setDate} typeDate={typeDate} setTypeDate={setTypeDate} />
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
							loading={false}
							title='Dữ liệu trống!'
							note='Danh sách dữ liệu hiện đang trống!'
						>
							<Table<IMeter>
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
										title: 'Căn hộ',
										render: (row, _) => <>{row?.apartment?.name || '---'}</>,
									},
									{
										title: 'Kỳ thanh toán',
										render: (row, _) => <>{moment(row?.installedDate).format('DD/MM/YYYY HH:mm:ss')}</>,
									},
									// {
									// 	title: 'Thời gian tiêu thụ điện',
									// 	render: (row, _) => <>{moment(row?.datePower).format('DD/MM/YYYY HH:mm:ss')}</>,
									// },
									// {
									// 	title: 'Số điện đầu tháng',
									// 	render: (row, _) => <>{row?.powerBeginMonth || '---'}</>,
									// },
									// {
									// 	title: 'Số điện cuối tháng',
									// 	render: (row, _) => <>{row?.powerEndMonth || '---'}</>,
									// },
									// {
									// 	title: 'Số điện tiêu thụ',
									// 	render: (row, _) => (
									// 		<Link href={'#'} className={styles.link}>
									// 			{row?.powerConsume || '---'}
									// 		</Link>
									// 	),
									// },
									// {
									// 	title: 'Thời gian tiêu thụ nước',
									// 	render: (row, _) => <>{moment(row?.dateWater).format('DD/MM/YYYY HH:mm:ss')}</>,
									// },
									// {
									// 	title: 'Số nước đầu tháng',
									// 	render: (row, _) => <>{row?.waterBeginMonth || '---'}</>,
									// },
									// {
									// 	title: 'Số nước cuối tháng',
									// 	render: (row, _) => <>{row?.waterEndMonth || '---'}</>,
									// },
									// {
									// 	title: 'Số nước tiêu thụ',
									// 	render: (row, _) => (
									// 		<Link href={'#'} className={styles.link}>
									// 			{row?.waterConsume || '---'}
									// 		</Link>
									// 	),
									// },
									{
										title: 'Tác vụ',
										fixedRight: true,
										render: (row, _) => (
											<FlexLayout row>
												<IconActionTable
													icon={<Eye color='#303229ff' size={24} />}
													tooltip='Xem chi tiết'
													href={`${PATH.ElectricWaterDetail}?_uuid=${row?.uuid}`}
												/>
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
							dependencies={[pageSize, keyword, status]}
						/>
					</MainTable>
				</FlexItem>
			</FlexLayout>
		</Fragment>
	);
}

export default MainElectricWater;

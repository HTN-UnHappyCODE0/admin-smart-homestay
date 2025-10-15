import {Fragment, useState} from 'react';
import styles from './MainUnlockHistory.module.scss';
import {IUnlockHistory, PropsMainUnlockHistory} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Header from '~/components/utils/Header';
import Button from '~/components/common/Button';
import SearchBlock from '~/components/utils/SearchBlock';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import FilterCustom from '~/components/common/FilterCustom';
import FilterDateRange from '~/components/common/FilterDateRange';
import {CONFIG_PAGING, QUERY_KEY, TYPE_DATE} from '~/constants/config/enum';
import MainTable from '~/components/utils/MainTable';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import moment from 'moment';
import Pagination from '~/components/common/Pagination';
import {useQuery} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import unlockHistoryServices from '~/services/unlockHistoryServices';
import Link from 'next/link';
import {PATH} from '~/constants/config';
import {typeLocks} from '~/constants/config/data';
import Moment from 'react-moment';

function MainUnlockHistory({}: PropsMainUnlockHistory) {
	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [keyword, setKeyword] = useState<string>('');
	const [type, setType] = useState<number | null>(null);
	const [typeDate, setTypeDate] = useState<TYPE_DATE>(TYPE_DATE.THIS_MONTH);
	const [date, setDate] = useState<{from: Date | null; to: Date | null} | null>(null);

	const resetFilter = () => {
		setPage(1);
		setPageSize(20);
		setKeyword('');
		setTypeDate(TYPE_DATE.THIS_MONTH);
		setType(null);
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
		items: IUnlockHistory[];
		pagination: {
			totalCount: number;
			totalPage: number;
		};
	}>([QUERY_KEY.table_unlock_history, page, pageSize, keyword, date?.from, date?.to, type], {
		queryFn: () =>
			httpRequest({
				http: unlockHistoryServices.getLockHistory({
					keyword: keyword,
					isPaging: CONFIG_PAGING.IS_PAGING,
					page: page,
					pageSize: pageSize,
					lockUuid: '',
					type: type,
					startTime: date?.from ? moment(date.from).startOf('day').format('YYYY-MM-DDTHH:mm:ss') : null,
					endTime: date?.to ? moment(date.to).endOf('day').format('YYYY-MM-DDTHH:mm:ss') : null,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!date?.from && !!date?.to,
	});

	return (
		<Fragment>
			<FlexLayout column gap-12>
				<Header title='Lịch sử mở khóa' />

				<SearchBlock
					keyword={keyword}
					setKeyword={setKeyword}
					placeholder='Tìm kiếm theo mã, tên danh mục'
					action={
						<FlexLayout row gap-8 fit-height>
							<FlexItem flex-1 overflow-y scrollbar>
								<FlexLayout row gap-8>
									<FilterCustom
										name='Phương thức mở'
										value={type}
										setValue={setType}
										listOption={typeLocks?.map((v) => ({
											uuid: v?.state,
											name: v?.text,
										}))}
									/>
									<FilterDateRange
										hiddenOptionAll={true}
										date={date}
										setDate={setDate}
										typeDate={typeDate}
										setTypeDate={setTypeDate}
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
							title='Lịch sử mở khóa trống!'
							note='Danh sách lịch sử mở khóa hiện đang trống!'
						>
							<Table<IUnlockHistory>
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
										title: 'ID ổ khóa',
										render: (row, _) => (
											<div className={styles.link}>
												<Link href={`${PATH.Locks}?_uuidHistory=${row?.lock?.uuid}`}>{row?.lock?.code}</Link>
											</div>
										),
									},
									{
										title: 'Tên căn hộ',
										render: (row, _) => <>{row?.apartment?.name || '---'}</>,
									},
									{
										title: 'Phương thức mở',
										render: (row, _) => <>{typeLocks?.find((v) => v?.state == row?.type)?.text}</>,
									},
									{
										title: 'Tài khoản',
										render: (row, _) => <>{row?.user?.name || '---'}</>,
									},
									{
										title: 'Thời gian',
										render: (row, _) => <Moment date={row?.created} format='HH:mm, DD/MM/YYYY' />,
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
							dependencies={[pageSize, keyword, status]}
						/>
					</MainTable>
				</FlexItem>
			</FlexLayout>
		</Fragment>
	);
}

export default MainUnlockHistory;

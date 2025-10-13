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
import {CONFIG_PAGING, CONFIG_TYPE_FIND, QUERY_KEY, TYPE_DATE} from '~/constants/config/enum';
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

function MainUnlockHistory({}: PropsMainUnlockHistory) {
	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [keyword, setKeyword] = useState<string>('');
	const [status, setStatus] = useState<number | null>(null);
	const [typeDate, setTypeDate] = useState<TYPE_DATE>(TYPE_DATE.ALL);
	const [date, setDate] = useState<{from: Date | null; to: Date | null} | null>(null);

	const resetFilter = () => {
		setPage(1);
		setPageSize(20);
		setKeyword('');
	};

	// const {
	// 	data = {
	// 		items: [],
	// 		pagination: {
	// 			totalCount: 0,
	// 			totalPage: 0,
	// 		},
	// 	},
	// 	isLoading,
	// } = useQuery<{
	// 	items: IUnlockHistory[];
	// 	pagination: {
	// 		totalCount: number;
	// 		totalPage: number;
	// 	};
	// }>([QUERY_KEY.table_unlock_history, page, pageSize, keyword, status], {
	// 	queryFn: () =>
	// 		httpRequest({
	// 			http: unlockHistoryServices.getListUnlockHistory({
	// 				isPaging: CONFIG_PAGING.IS_PAGING,
	// 				typeFinding: CONFIG_TYPE_FIND.TABLE,
	// 				page: page,
	// 				pageSize: pageSize,
	// 				keyword: keyword,
	// 			}),
	// 		}),
	// 	select(data) {
	// 		return data;
	// 	},
	// });

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
									<FilterDateRange date={date} setDate={setDate} typeDate={typeDate} setTypeDate={setTypeDate} />
									<FilterCustom
										name='Phương thức mở'
										value={status}
										setValue={setStatus}
										listOption={[
											{
												uuid: 1,
												name: 'Hoạt động',
											},
											{
												uuid: 2,
												name: 'Đang khóa',
											},
										]}
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
							// data={data?.items || []}
							data={[1]}
							loading={false}
							title='Lịch sử mở khóa trống!'
							note='Danh sách lịch sử mở khóa hiện đang trống!'
						>
							<Table<IUnlockHistory>
								rowKey={(row) => row.uuid}
								// data={data?.items || []}
								data={[
									{
										uuid: '666666',
										name: '14A chung cư Mĩ Lệ',
										openMethod: 'Mở bằng app',
										openAccount: 'Nguyễn Đăng Hoàng Giang',
										date: '01/01/2024 12:00:00',
									},
									{
										uuid: '666667',
										name: '14A chung cư Mĩ Lệ',
										openMethod: 'Mở bằng khóa tạm thời',
										openAccount: 'Nguyễn Minh Anh',
										date: '01/01/2024 12:00:00',
									},
									{
										uuid: '666668',
										name: '14A chung cư Mĩ Lệ',
										openMethod: 'Mở bằng mật khẩu',
										openAccount: 'Hoàng Tuấn Nam',
										date: '01/01/2024 12:00:00',
									},
								]}
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
												<Link href={PATH.UnlockHistory}>{row.uuid}</Link>
											</div>
										),
									},
									{
										title: 'Tên căn hộ',
										render: (row, _) => <>{row?.name}</>,
									},
									{
										title: 'Phương thức mở',
										render: (row, _) => <>{row?.openMethod}</>,
									},
									{
										title: 'Tài khoản mở',
										render: (row, _) => <>{row?.openAccount}</>,
									},
									{
										title: 'Thời gian',
										render: (row, _) => <>{moment(row?.date).format('DD/MM/YYYY HH:mm:ss')}</>,
									},
								]}
							/>
						</DataWrapper>

						<Pagination
							page={page}
							onSetPage={setPage}
							pageSize={pageSize}
							onSetPageSize={setPageSize}
							total={100}
							dependencies={[keyword, status]}
						/>
					</MainTable>
				</FlexItem>
			</FlexLayout>
		</Fragment>
	);
}

export default MainUnlockHistory;

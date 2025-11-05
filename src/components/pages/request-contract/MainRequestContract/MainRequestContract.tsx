import {Fragment, useState} from 'react';
import styles from './MainRequestContract.module.scss';
import {PropsMainRequestContract} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Header from '~/components/utils/Header';
import SearchBlock from '~/components/utils/SearchBlock';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import FilterCustom from '~/components/common/FilterCustom';
import FilterDateRange from '~/components/common/FilterDateRange';
import Button from '~/components/common/Button';
import {TYPE_DATE} from '~/constants/config/enum';
import MainTable from '~/components/utils/MainTable';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import moment from 'moment';
import StateActive from '~/components/utils/StateActive';
import IconActionTable from '~/components/utils/IconActionTable';
import Pagination from '~/components/common/Pagination';
import {useRouter} from 'next/router';
import {useQueryClient} from '@tanstack/react-query';
import {CloseCircle, Eye, FolderAdd} from 'iconsax-react';
import PositionContainer from '~/components/common/PositionContainer';
import DetailRequestContract from '../DetailRequestContract';

function MainRequestContract({}: PropsMainRequestContract) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_open, _uuidDetail} = router.query;

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [keyword, setKeyword] = useState<string>('');
	const [status, setStatus] = useState<number | null>(null);
	const [typeDate, setTypeDate] = useState<TYPE_DATE>(TYPE_DATE.ALL);
	const [date, setDate] = useState<{from: Date | null; to: Date | null} | null>(null);

	const [rejectApartment, setRejectApartment] = useState<string>('');

	const resetFilter = () => {
		setKeyword('');
		setStatus(null);
		setTypeDate(TYPE_DATE.ALL);
		setDate(null);
	};

	return (
		<Fragment>
			<FlexLayout column gap-12>
				<Header title='Yêu cầu lập hợp đồng' />
				<SearchBlock
					keyword={keyword}
					setKeyword={setKeyword}
					placeholder='Tìm kiếm theo họ tên, email, số điện thoại'
					action={
						<FlexLayout row gap-8 fit-height>
							<FlexItem flex-1 overflow-y scrollbar>
								<FlexLayout row gap-8>
									<FilterDateRange date={date} setDate={setDate} typeDate={typeDate} setTypeDate={setTypeDate} />
									<FilterCustom
										name='Trạng thái tiền cọc'
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
									<FilterCustom
										name='Trạng thái cọc'
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
							title='Yêu cầu lập hợp đồng trống!'
							note='Danh sách yêu cầu lập hợp đồng hiện đang trống!'
						>
							<Table<{uuid: string; name: string; startDate: string; expireDate: string; status: number}>
								rowKey={(row) => row.uuid}
								// data={data?.items || []}
								data={[{uuid: '1', name: '---', startDate: '---', expireDate: '---', status: 1}]}
								fixedHeader={true}
								column={[
									{
										title: 'STT',
										fixedLeft: true,
										render: (_, index) => <>{index + 1}</>,
									},
									{
										title: 'Tên tài khoản',
										render: (row, _) => <>{row?.name || '---'}</>,
									},
									{
										title: 'Tên khách thuê',
										render: (row, _) => <>{row?.name || '---'}</>,
									},
									{
										title: 'Số điện thoại',
										render: (row, _) => <>{row?.name || '---'}</>,
									},
									{
										title: 'Thời gian gửi',
										render: (row, _) => <>{moment(row?.startDate).format('DD/MM/YYYY HH:mm:ss')}</>,
									},
									{
										title: 'Bắt đầu thuê',
										render: (row, _) => <>{moment(row?.expireDate).format('DD/MM/YYYY HH:mm:ss')}</>,
									},
									{
										title: 'Kết thúc thuê',
										render: (row, _) => <>{moment(row?.expireDate).format('DD/MM/YYYY HH:mm:ss')}</>,
									},
									{
										title: 'Trạng thái yêu cầu',
										render: (row, _) => (
											<StateActive
												stateActive={1}
												listState={[
													{
														backgroundColor: '#17B26A',
														state: 1,
														text: 'Đã lập hợp đồng',
														textColor: '#fff',
													},
													{
														backgroundColor: '#2970FF',
														state: 2,
														text: 'Đã nhận',
														textColor: '#fff',
													},
													{
														backgroundColor: '#EE0033',
														state: 3,
														text: 'Đã từ chối',
														textColor: '#fff',
													},
												]}
											/>
										),
									},
									{
										title: 'Trạng thái tiền cọc',
										render: (row, _) => (
											<StateActive
												stateActive={1}
												listState={[
													{
														backgroundColor: '#17B26A',
														state: 1,
														text: 'Đã đóng',
														textColor: '#fff',
													},
													{
														backgroundColor: '#FEC848',
														state: 2,
														text: 'Chưa đóng',
														textColor: '#fff',
													},
												]}
											/>
										),
									},
									{
										title: 'Tác vụ',
										fixedRight: true,
										render: (row, _) => (
											<FlexLayout row>
												<IconActionTable
													icon={<Eye color='#303229ff' size={24} />}
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
												<IconActionTable icon={<FolderAdd color='#292D32' size={24} />} tooltip='---' />
												<IconActionTable
													icon={<CloseCircle color='#EE0033' size={24} />}
													tooltip='Từ chối yêu cầu'
													onClick={() => setRejectApartment(row?.uuid)}
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
							// total={data?.pagination.totalCount || 0}
							total={10}
							dependencies={[pageSize, keyword, status]}
						/>
					</MainTable>
				</FlexItem>

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
					<DetailRequestContract
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
			</FlexLayout>
		</Fragment>
	);
}

export default MainRequestContract;

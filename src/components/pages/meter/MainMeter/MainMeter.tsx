import {Fragment, useState} from 'react';
import styles from './MainMeter.module.scss';
import {IMeter, PropsMainMeter} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Header from '~/components/utils/Header';
import Button from '~/components/common/Button';
import {AddCircle, Edit} from 'iconsax-react';
import SearchBlock from '~/components/utils/SearchBlock';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import {useRouter} from 'next/router';
import FilterDateRange from '~/components/common/FilterDateRange';
import {CONFIG_PAGING, CONFIG_TYPE_FINDING, QUERY_KEY, TYPE_DATE} from '~/constants/config/enum';
import MainTable from '~/components/utils/MainTable';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import Pagination from '~/components/common/Pagination';
import {useQuery} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import meterServices from '~/services/meterServices';
import moment from 'moment';
import Moment from 'react-moment';
import PositionContainer from '~/components/common/PositionContainer';
import FormCreateMeter from '../FormCreateMeter';
import {getDetailAddress} from '~/common/funcs/optionConvert';
import IconActionTable from '~/components/utils/IconActionTable';
import FormUpdateMeter from '../FormUpdateMeter';

function MainMeter({}: PropsMainMeter) {
	const router = useRouter();

	const {_open, _uuidUpdate} = router.query;

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [keyword, setKeyword] = useState<string>('');
	const [typeDate, setTypeDate] = useState<TYPE_DATE>(TYPE_DATE.ALL);
	const [date, setDate] = useState<{from: Date | null; to: Date | null} | null>(null);

	const resetFilter = () => {
		setKeyword('');
		setPageSize(20);
		setTypeDate(TYPE_DATE.ALL);
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
	}>([QUERY_KEY.table_meter, page, pageSize, keyword, date?.from, date?.to], {
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
				<Header
					title='Danh sách thiết bị'
					actions={
						<FlexLayout row gap-6>
							<Button
								icon={<AddCircle />}
								p_8_24
								rounded_40
								bright-cyan
								bold
								onClick={() =>
									router.replace({
										pathname: router.pathname,
										query: {
											...router.query,
											_open: 'create',
										},
									})
								}
							>
								Thêm mới
							</Button>
						</FlexLayout>
					}
				/>

				<SearchBlock
					keyword={keyword}
					setKeyword={setKeyword}
					placeholder='Nhập từ khóa để tìm kiếm'
					action={
						<FlexLayout row gap-8 fit-height>
							<FlexItem flex-1 overflow-y scrollbar>
								<FlexLayout row gap-8>
									<FilterDateRange
										hiddenOptionAll={true}
										date={date}
										setDate={setDate}
										typeDate={typeDate}
										setTypeDate={setTypeDate}
										name='Thời gian lắp đặt'
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
							data={data.items || []}
							loading={isLoading}
							title='Dữ liệu trống!'
							note='Danh sách khóa hiện đang trống!'
						>
							<Table<IMeter>
								rowKey={(row) => row.uuid}
								data={data.items || []}
								fixedHeader={true}
								column={[
									{
										title: 'STT',
										fixedLeft: true,
										render: (_, index) => <>{index + 1}</>,
									},
									{
										title: 'Loại thiết bị',
										render: (row, _) => <>{row?.meterTypeUu?.name || '---'}</>,
									},
									{
										title: 'Mã kết nối',
										render: (row, _) => <>{row?.serialNumber}</>,
									},
									{
										title: 'Tên căn hộ',
										render: (row, _) => <>{row?.apartment?.name}</>,
									},
									{
										title: 'Địa chỉ',
										render: (row, _) => (
											<>
												{getDetailAddress({
													provinceName: row?.apartment?.province?.fullName!,
													districtName: '',
													wardName: row?.apartment?.ward?.fullName!,
													address: row?.apartment?.address!,
												})}
											</>
										),
									},
									{
										title: 'Thời gian lắp đặt',
										render: (row, _) => (
											<>{row?.installedDate ? <Moment date={row?.installedDate} format=' DD/MM/YYYY' /> : '---'}</>
										),
									},

									{
										title: 'Hành động',
										fixedRight: true,
										render: (row, _) => (
											<FlexLayout row>
												<IconActionTable
													icon={<Edit size={24} />}
													tooltip='Chỉnh sửa'
													onClick={() =>
														router.replace({
															pathname: router.pathname,
															query: {
																...router.query,
																_uuidUpdate: row?.uuid,
															},
														})
													}
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
							dependencies={[pageSize, keyword, date?.from, date?.to]}
						/>
					</MainTable>
				</FlexItem>
			</FlexLayout>

			<PositionContainer
				open={_open == 'create'}
				onClose={() => {
					const {_open, ...rest} = router.query;

					router.replace({
						pathname: router.pathname,
						query: {
							...rest,
						},
					});
				}}
			>
				<FormCreateMeter
					onClose={() => {
						const {_open, ...rest} = router.query;

						router.replace({
							pathname: router.pathname,
							query: {
								...rest,
							},
						});
					}}
				/>
			</PositionContainer>

			<PositionContainer
				open={!!_uuidUpdate}
				onClose={() => {
					const {_uuidUpdate, ...rest} = router.query;

					router.replace({
						pathname: router.pathname,
						query: {
							...rest,
						},
					});
				}}
			>
				<FormUpdateMeter
					onClose={() => {
						const {_uuidUpdate, ...rest} = router.query;

						router.replace({
							pathname: router.pathname,
							query: {
								...rest,
							},
						});
					}}
				/>
			</PositionContainer>
		</Fragment>
	);
}

export default MainMeter;

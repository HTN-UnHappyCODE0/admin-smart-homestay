import {Fragment, useState} from 'react';
import styles from './MainDevice.module.scss';
import {IDevice, PropsMainDevice} from './interfaces';
import {CONFIG_PAGING, CONFIG_TYPE_FIND, QUERY_KEY, TYPE_DATE} from '~/constants/config/enum';
import FlexLayout from '~/components/layouts/FlexLayout';
import Header from '~/components/utils/Header/Header';
import {AddCircle, Edit} from 'iconsax-react';
import Button from '~/components/common/Button';
import {PATH} from '~/constants/config';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import SearchBlock from '~/components/utils/SearchBlock';
import FilterDateRange from '~/components/common/FilterDateRange';
import Pagination from '~/components/common/Pagination';
import MainTable from '~/components/utils/MainTable';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import moment from 'moment';
import IconActionTable from '~/components/utils/IconActionTable';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import deviceServices from '~/services/deviceServices';
import {useRouter} from 'next/router';
import PositionContainer from '~/components/common/PositionContainer';
import FormCreateDevice from '../FormCreateDevice';
import Link from 'next/link';

function MainDevice({}: PropsMainDevice) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_open, _uuidUpdate} = router.query;

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
		items: IDevice[];
		pagination: {
			totalCount: number;
			totalPage: number;
		};
	}>([QUERY_KEY.table_device, page, pageSize, keyword, status], {
		queryFn: () =>
			httpRequest({
				http: deviceServices.getListDevices({
					isPaging: CONFIG_PAGING.IS_PAGING,
					typeFinding: CONFIG_TYPE_FIND.TABLE,
					page: page,
					pageSize: pageSize,
					keyword: keyword,
					status: status,
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
							title='Thiết bị trống!'
							note='Danh sách thiết bị hiện đang trống!'
						>
							<Table<IDevice>
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
										title: 'Tên nội thất',
										render: (row, _) => <>{row?.name}</>,
									},
									{
										title: 'Mã kết nối',
										render: (row, _) => (
											<div className={styles.link}>
												<Link href={PATH.Device}>{row.name}</Link>
											</div>
										),
									},
									{
										title: 'Tên căn hộ',
										render: (row, _) => <>{row?.name}</>,
									},
									{
										title: 'Địa chỉ',
										render: (row, _) => <>{row?.name}</>,
									},
									{
										title: 'Thời gian lắp đặt',
										render: (row, _) => <>{moment(row?.name).format('DD/MM/YYYY HH:mm:ss')}</>,
									},
									{
										title: 'Tác vụ',
										fixedRight: true,
										render: (row, _) => (
											<FlexLayout row>
												<IconActionTable icon={<Edit color='#292D32' size={24} />} tooltip='Chỉnh sửa' />
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
				<FormCreateDevice
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
		</Fragment>
	);
}

export default MainDevice;

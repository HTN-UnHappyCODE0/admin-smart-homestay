import {Fragment, useState} from 'react';
import styles from './MainFurniture.module.scss';
import {IFurniture, PropsMainFurniture} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Header from '~/components/utils/Header';
import Button from '~/components/common/Button';
import {AddCircle, Edit, Eye, Lock, Unlock, Warning2} from 'iconsax-react';
import SearchBlock from '~/components/utils/SearchBlock';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import FilterCustom from '~/components/common/FilterCustom';
import {statusConfigs} from '~/constants/config/data';
import MainTable from '~/components/utils/MainTable';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import IconActionTable from '~/components/utils/IconActionTable';
import Pagination from '~/components/common/Pagination';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {CONFIG_PAGING, CONFIG_TYPE_FINDING, QUERY_KEY, STATUS_CONFIG, TYPE_DATE} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import furnitureServices from '~/services/furnitureServices';
import moment from 'moment';
import Moment from 'react-moment';
import {useRouter} from 'next/router';
import PositionContainer from '~/components/common/PositionContainer';
import FormCreateFurniture from '../FormCreateFurniture';
import DetailFurniture from '../DetailFurniture';
import StateActive from '~/components/utils/StateActive';
import Dialog from '~/components/common/Dialog';
import Loading from '~/components/common/Loading';
import FilterDateRange from '~/components/common/FilterDateRange';
import FormUpdateFurniture from '../FormUpdateFurniture';

function MainFurniture({}: PropsMainFurniture) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_open, _uuid, _uuidUpdate} = router.query;

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [keyword, setKeyword] = useState<string>('');
	const [status, setStatus] = useState<number | null>(null);
	const [typeDate, setTypeDate] = useState<TYPE_DATE>(TYPE_DATE.ALL);
	const [date, setDate] = useState<{from: Date | null; to: Date | null} | null>(null);

	const [dataChangeStatus, setDataChangeStatus] = useState<{uuid: string; status: number} | null>(null);

	const resetFilter = () => {
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
		items: IFurniture[];
		pagination: {
			totalCount: number;
			totalPage: number;
		};
	}>([QUERY_KEY.table_furniture, page, pageSize, keyword, status, date?.from, date?.to], {
		queryFn: () =>
			httpRequest({
				http: furnitureServices.getListFurnitures({
					keyword: keyword,
					isPaging: CONFIG_PAGING.IS_PAGING,
<<<<<<< HEAD
					typeFinding: CONFIG_TYPE_FINDING.SIMPLE,
=======
					typeFinding: CONFIG_TYPE_FINDING.DTO,
>>>>>>> d3468588a29e0164932c1d6d67de997248dd2731
					page: page,
					pageSize: pageSize,
					status: status,
					addedDateFrom: date?.from ? moment(date.from).startOf('day').format('YYYY-MM-DDTHH:mm:ss') : null,
					addedDateTo: date?.to ? moment(date.to).endOf('day').format('YYYY-MM-DDTHH:mm:ss') : null,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const funcChangeStatus = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageSuccess: true,
				showMessageFailed: true,
				msgSuccess: dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? 'Khóa nội thất thành công!' : 'Mở khóa nội thất thành công!',
				http: furnitureServices.changeStatus({
					uuid: dataChangeStatus?.uuid!,
					status: dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? STATUS_CONFIG.LOCKED : STATUS_CONFIG.ACTIVE,
					description: '',
				}),
			}),
		onSuccess(data) {
			if (data) {
				setDataChangeStatus(null);
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_furniture],
				});
			}
		},
	});

	return (
		<Fragment>
			<Loading loading={funcChangeStatus.isLoading} />
			<FlexLayout column gap-12>
				<Header
					title='Danh sách nội thất'
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
										name='Ngày bổ sung'
										date={date}
										setDate={setDate}
										typeDate={typeDate}
										setTypeDate={setTypeDate}
									/>
									<FilterCustom
										name='Trạng thái'
										value={status}
										setValue={setStatus}
										listOption={statusConfigs?.map((v) => ({
											uuid: v?.state,
											name: v?.text,
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
							data={data.items || []}
							loading={isLoading}
							title='Dữ liệu trống!'
							note='Danh sách nội thất hiện đang trống!'
						>
							<Table<IFurniture>
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
										title: 'Tên nội thất',
										render: (row, _) => <>{row?.name || '---'}</>,
									},
									{
										title: 'Số lượng',
										render: (row, _) => <>{row?.using}</>,
									},
									{
										title: 'Ngày bổ sung',
										render: (row, _) => (
											<>{row?.lastAdded ? <Moment date={row?.lastAdded} format='DD/MM/YYYY' /> : '---'}</>
										),
									},
									{
										title: 'Ghi chú',
										render: (row, _) => <>{row?.description || '---'}</>,
									},

									{
										title: 'Trạng thái',
										render: (row, _) => <StateActive stateActive={row?.status} listState={statusConfigs} />,
									},

									{
										title: 'Hành động',
										fixedRight: true,
										render: (row, _) => (
											<FlexLayout row>
												<IconActionTable
													icon={
														row?.status == STATUS_CONFIG.ACTIVE ? (
															<Lock color='#292D32' size={24} />
														) : (
															<Unlock color='#292D32' size={24} />
														)
													}
													tooltip={row?.status == STATUS_CONFIG.ACTIVE ? 'Khóa nội thất' : 'Mở khóa nội thất'}
													onClick={() =>
														setDataChangeStatus({
															uuid: row?.uuid,
															status: row?.status,
														})
													}
												/>

												<IconActionTable
													icon={<Eye color='#292D32' size={24} />}
													tooltip='Xem chi tiết'
													onClick={() =>
														router.replace({
															pathname: router.pathname,
															query: {
																...router.query,
																_uuid: row?.uuid,
															},
														})
													}
												/>

												<IconActionTable
													icon={<Edit color='#292D32' size={24} />}
													tooltip='Chỉnh sửa nội thất'
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
							total={data?.pagination?.totalCount || 0}
							dependencies={[pageSize, keyword, status, date?.from, date?.to]}
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
				<FormCreateFurniture
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
				open={!!_uuid}
				onClose={() => {
					const {_uuidHistory, ...rest} = router.query;

					router.replace({
						pathname: router.pathname,
						query: {
							...rest,
						},
					});
				}}
			>
				<DetailFurniture
					onClose={() => {
						const {_uuid, ...rest} = router.query;

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
				<FormUpdateFurniture
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

			<Dialog
				open={!!dataChangeStatus}
				type={dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? 'error' : 'primary'}
				backgroundIconColor={dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? '#ffdce4' : '#b5f4d4ff'}
				borderIconColor={dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? '#fff0f3' : '#d6f6e6ff'}
				title={dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? 'Khoá nội thất' : 'Mở khóa nội thất'}
				note={
					dataChangeStatus?.status == STATUS_CONFIG.ACTIVE
						? 'Bạn có chắc chắn muốn khóa nội thất này không?'
						: 'Bạn có chắc chắn muốn mở khóa nội thất này không?'
				}
				icon={
					dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? (
						<Warning2 size='28' color='#EE0033' />
					) : (
						<Warning2 size='28' color='#25C173' />
					)
				}
				onClose={() => setDataChangeStatus(null)}
				onSubmit={funcChangeStatus.mutate}
			/>
		</Fragment>
	);
}

export default MainFurniture;

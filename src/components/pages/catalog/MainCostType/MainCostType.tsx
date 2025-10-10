import LayoutMainPage from '~/components/layouts/LayoutMainPage';
import styles from './MainCostType.module.scss';
import {ICostType, PropsMainCostType} from './interfaces';
import {statusConfigs, tabsCatalogs} from '~/constants/config/data';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import {AddCircle, Edit, Eye, Lock, Unlock, Warning2} from 'iconsax-react';
import {Fragment, useState} from 'react';
import SearchBlock from '~/components/utils/SearchBlock';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import FilterCustom from '~/components/common/FilterCustom';
import MainTable from '~/components/utils/MainTable';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import StateActive from '~/components/utils/StateActive';
import IconActionTable from '~/components/utils/IconActionTable';
import PositionContainer from '~/components/common/PositionContainer';
import {useRouter} from 'next/router';
import FormCreateCostType from '../FormCreateCostType';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {CONFIG_PAGING, CONFIG_TYPE_FIND, QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import servicesTypeServices from '~/services/servicesTypeServices';
import Pagination from '~/components/common/Pagination';
import Dialog from '~/components/common/Dialog';
import Loading from '~/components/common/Loading';
import FormUpdateCostType from '../FormUpdateCostType';

function MainCostType({}: PropsMainCostType) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_open, _uuidUpdate} = router.query;

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [keyword, setKeyword] = useState<string>('');
	const [status, setStatus] = useState<number | null>(null);

	const resetFilter = () => {
		setKeyword('');
		setStatus(null);
	};

	const [dataChangeStatus, setDataChangeStatus] = useState<{uuid: string; status: number} | null>(null);

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
		items: ICostType[];
		pagination: {
			totalCount: number;
			totalPage: number;
		};
	}>([QUERY_KEY.table_cost_type, page, pageSize, keyword, status], {
		queryFn: () =>
			httpRequest({
				http: servicesTypeServices.listServicesType({
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

	const funcChangeStatus = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageSuccess: true,
				showMessageFailed: true,
				msgSuccess:
					dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? 'Khóa loại chi phí thành công!' : 'Mở khóa loại chi phí thành công!',
				http: servicesTypeServices.changeStatusServicesType({
					uuid: dataChangeStatus?.uuid!,
					status: dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? STATUS_CONFIG.LOCKED : STATUS_CONFIG.ACTIVE,
					description: '',
				}),
			}),
		onSuccess(data) {
			if (data) {
				setDataChangeStatus(null);
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_cost_type],
				});
			}
		},
	});

	return (
		<Fragment>
			<Loading loading={funcChangeStatus.isLoading} />
			<LayoutMainPage
				title='Quản lý danh mục'
				tabs={tabsCatalogs}
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
			>
				<FlexLayout column gap-12>
					<SearchBlock
						keyword={keyword}
						setKeyword={setKeyword}
						placeholder='Tìm kiếm theo tên loại chi phí'
						action={
							<FlexLayout row gap-8 fit-height>
								<FlexItem flex-1 overflow-y scrollbar>
									<FlexLayout row gap-8>
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
								data={data?.items || []}
								loading={isLoading}
								title='Dữ liệu trống'
								note='Danh mục loại chi phí hiện đang trống!'
							>
								<Table<ICostType>
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
											title: 'Tên loại chi phí',
											render: (row, _) => <>{row?.name}</>,
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
														tooltip={
															row?.status == STATUS_CONFIG.ACTIVE
																? 'Khóa loại chi phí'
																: 'Mở khóa loại chi phí'
														}
														onClick={() =>
															setDataChangeStatus({
																uuid: row?.uuid,
																status: row?.status,
															})
														}
													/>

													<IconActionTable
														icon={<Edit color='#292D32' size={24} />}
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
					<FormCreateCostType
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
					<FormUpdateCostType
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
					title={dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? 'Khoá loại chi phí' : 'Mở khóa loại chi phí'}
					note={
						dataChangeStatus?.status == STATUS_CONFIG.ACTIVE
							? 'Bạn có chắc chắn muốn khóa loại chi phí không?'
							: 'Bạn có chắc chắn muốn mở khóa loại chi phí không?'
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
			</LayoutMainPage>
		</Fragment>
	);
}

export default MainCostType;

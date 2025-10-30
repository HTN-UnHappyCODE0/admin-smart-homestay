import {Fragment, useState} from 'react';
import styles from './MainPaymentAccount.module.scss';
import {IPaymentAccount, PropsMainPaymentAccount} from './interfaces';
import Loading from '~/components/common/Loading';
import FlexLayout from '~/components/layouts/FlexLayout';
import Header from '~/components/utils/Header';
import Button from '~/components/common/Button';
import {AddCircle, Edit, Eye, Lock, Unlock, Warning2} from 'iconsax-react';
import SearchBlock from '~/components/utils/SearchBlock';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import MainTable from '~/components/utils/MainTable';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import StateActive from '~/components/utils/StateActive';
import IconActionTable from '~/components/utils/IconActionTable';
import {statusConfigs} from '~/constants/config/data';
import {CONFIG_PAGING, QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import {useRouter} from 'next/router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import paymentAccountServices from '~/services/paymentAccountServices';
import Pagination from '~/components/common/Pagination';
import Dialog from '~/components/common/Dialog';
import PositionContainer from '~/components/common/PositionContainer';
import FormCreatePaymentAccount from '../FormCreatePaymentAccount';
import FilterCustom from '~/components/common/FilterCustom';

function MainPaymentAccount({}: PropsMainPaymentAccount) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_open} = router.query;

	const [keyword, setKeyword] = useState<string>('');
	const [status, setStatus] = useState<number | null>(null);
	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);

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
		items: IPaymentAccount[];
		pagination: {
			totalCount: number;
			totalPage: number;
		};
	}>([QUERY_KEY.table_payment_account, page, pageSize, keyword, status], {
		queryFn: () =>
			httpRequest({
				http: paymentAccountServices.getListBankPayment({
					isPaging: CONFIG_PAGING.IS_PAGING,
					keyword: keyword,
					page: page,
					pageSize: pageSize,
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
					dataChangeStatus?.status == STATUS_CONFIG.ACTIVE
						? 'Khóa tài khoản thanh toán thành công!'
						: 'Mở khóa tài khoản thanh toán thành công!',
				http: paymentAccountServices.updateStatus({
					uuid: dataChangeStatus?.uuid!,
					status: dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? STATUS_CONFIG.LOCKED : STATUS_CONFIG.ACTIVE,
					description: '',
				}),
			}),
		onSuccess(data) {
			if (data) {
				setDataChangeStatus(null);
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_payment_account],
				});
			}
		},
	});

	return (
		<Fragment>
			<Loading loading={funcChangeStatus.isLoading} />
			<FlexLayout column gap-12>
				<Header
					title='Tài khoản thanh toán'
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
						</FlexLayout>
					}
				/>

				<FlexItem flex-1 overflow-x>
					<MainTable>
						<DataWrapper
							data={data.items || []}
							loading={isLoading}
							title='Dữ liệu trống!'
							note='Danh sách tài khoản hiện đang trống!'
						>
							<Table<IPaymentAccount>
								rowKey={(row) => row.uuid}
								data={data.items || []}
								fixedHeader={true}
								column={[
									{
										title: 'STT',
										render: (_, index) => <>{index + 1}</>,
									},
									{
										title: 'Tên tài khoản',
										render: (row, _) => <>{row?.bankAccount || '---'}</>,
									},
									{
										title: 'Tên ngân hàng',
										render: (row, _) => <>{row?.bankName || '---'}</>,
									},
									{
										title: 'Số tài khoản',
										render: (row, _) => <>{row?.bankNumber || '---'}</>,
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
												<IconActionTable icon={<Eye color='#292D32' size={24} />} tooltip='Xem chi tiết' />
												<IconActionTable
													icon={<Edit color='#292D32' size={24} />}
													tooltip='Chỉnh sửa tài khoản thanh toán'
												/>

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
															? 'Khóa tài khoản thanh toán'
															: 'Mở khóa tài khoản thanh toán'
													}
													onClick={() =>
														setDataChangeStatus({
															uuid: row?.uuid,
															status: row?.status,
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
				<FormCreatePaymentAccount
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

			<Dialog
				open={!!dataChangeStatus}
				type={dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? 'error' : 'primary'}
				backgroundIconColor={dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? '#ffdce4' : '#b5f4d4ff'}
				borderIconColor={dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? '#fff0f3' : '#d6f6e6ff'}
				title={dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? 'Khoá tài khoản thanh toán' : 'Mở khóa tài khoản thanh toán'}
				note={
					dataChangeStatus?.status == STATUS_CONFIG.ACTIVE
						? 'Bạn có chắc chắn muốn khóa tài khoản thanh toán này không?'
						: 'Bạn có chắc chắn muốn mở khóa tài khoản thanh toán này không?'
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

export default MainPaymentAccount;

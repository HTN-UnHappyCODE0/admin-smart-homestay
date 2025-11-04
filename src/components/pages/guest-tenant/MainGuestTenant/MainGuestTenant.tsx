import {Fragment, useState} from 'react';
import styles from './MainGuestTenant.module.scss';
import {IGuestTenant, PropsMainGuestTenant} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Header from '~/components/utils/Header';
import Button from '~/components/common/Button';
import {DriverRefresh, Edit, Eye, Lock, Unlock, Warning2} from 'iconsax-react';
import SearchBlock from '~/components/utils/SearchBlock';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import FilterCustom from '~/components/common/FilterCustom';
import {CONFIG_PAGING, CONFIG_TYPE_FINDING, QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import MainTable from '~/components/utils/MainTable';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import StateActive from '~/components/utils/StateActive';
import IconActionTable from '~/components/utils/IconActionTable';
import Pagination from '~/components/common/Pagination';
import {useRouter} from 'next/router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import PositionContainer from '~/components/common/PositionContainer';
import FormUpdateGuestTenant from '../FormUpdateGuestTenant';
import {httpRequest} from '~/services';
import Dialog from '~/components/common/Dialog';
import DetailGuestTenant from '../DetailGuestTenant';
import guestTenantServices from '~/services/guestTenantServices';
import {statusConfigs} from '~/constants/config/data';
import userServices from '~/services/userServices';
import accountServices from '~/services/accountServices';

function MainGuestTenant({}: PropsMainGuestTenant) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuidUpdate, _uuidDetail} = router.query;

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [keyword, setKeyword] = useState<string>('');
	const [status, setStatus] = useState<number | null>(null);
	const [uuidReset, setUuidReset] = useState<string>('');
	const [dataChangeStatus, setDataChangeStatus] = useState<{uuid: string; status: number} | null>(null);

	const resetFilter = () => {
		setKeyword('');
		setStatus(null);
		setPage(0);
		setPageSize(0);
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
		items: IGuestTenant[];
		pagination: {
			totalCount: number;
			totalPage: number;
		};
	}>([QUERY_KEY.table_guest_tenant, page, pageSize, keyword, status], {
		queryFn: () =>
			httpRequest({
				http: guestTenantServices.getListGuests({
					isPaging: CONFIG_PAGING.IS_PAGING,
					typeFinding: CONFIG_TYPE_FINDING.DTO,
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
		mutationFn: () => {
			const item = data?.items?.find((i) => i.uuid === dataChangeStatus?.uuid);

			return httpRequest({
				showMessageSuccess: true,
				showMessageFailed: true,
				msgSuccess:
					dataChangeStatus?.status == STATUS_CONFIG.ACTIVE
						? 'Khóa tài khoản khách thuê thành công!'
						: 'Mở khóa tài khoản khách thuê thành công!',
				http: userServices.changeStatus({
					uuid: dataChangeStatus?.uuid!,
					status: dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? STATUS_CONFIG.LOCKED : STATUS_CONFIG.ACTIVE,
					description: item?.description ?? '---',
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setDataChangeStatus(null);
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_guest_tenant],
				});
			}
		},
	});

	const funcResetPassword = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageSuccess: true,
				showMessageFailed: true,
				msgSuccess: 'Reset mật khẩu thành công!',
				http: accountServices.superResetPassword({
					userUuid: uuidReset,
					confirmNewPassword: '',
					newPassword: '',
				}),
			}),
		onSuccess(data) {
			if (data) {
				setUuidReset('');
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_guest_tenant],
				});
			}
		},
	});

	return (
		<Fragment>
			<FlexLayout column gap-12>
				<Header title='Tài khoản khách thuê' />

				<SearchBlock
					keyword={keyword}
					setKeyword={setKeyword}
					placeholder='Tìm kiếm theo họ tên, email, số điện thoại'
					action={
						<FlexLayout row gap-8 fit-height>
							<FlexItem flex-1 overflow-y scrollbar>
								<FlexLayout row gap-8>
									<FilterCustom
										name='Trạng thái hoạt động'
										value={status}
										setValue={setStatus}
										listOption={statusConfigs.map((item) => ({
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
							title='Thành viên trống!'
							note='Danh sách thành viên hiện đang trống!'
						>
							<Table<IGuestTenant>
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
										render: (row, _) => <>{row?.userName || '---'}</>,
									},
									{
										title: 'Mã khách thuê',
										render: (row, _) => <>{row?.code || '---'}</>,
									},
									{
										title: 'Tên khách thuê',
										render: (row, _) => <>{row?.name || '---'}</>,
									},
									{
										title: 'Số điện thoại',
										render: (row, _) => <>{row?.phoneNumber || '---'}</>,
									},
									{
										title: 'Ghi chú',
										render: (row, _) => <>{row?.description || '---'}</>,
									},
									{
										title: 'Trạng thái tài khoản',
										render: (row, _) => <StateActive stateActive={row?.status} listState={statusConfigs} />,
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
																_uuidDetail: row?.uuid,
															},
														})
													}
												/>
												<IconActionTable
													icon={<DriverRefresh color='#292D32' size={24} />}
													tooltip='Reset mật khẩu'
													onClick={() => setUuidReset(row?.uuid)}
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
															? 'Khóa tài khoản khách thuê'
															: 'Mở khóa tài khoản khách thuê'
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
							total={data?.pagination?.totalCount || 0}
							dependencies={[pageSize, keyword, status]}
						/>
					</MainTable>
				</FlexItem>

				{/* Update */}
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
					<FormUpdateGuestTenant
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

				{/* Detail */}
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
					<DetailGuestTenant
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

				<Dialog
					open={!!dataChangeStatus}
					type={dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? 'error' : 'primary'}
					backgroundIconColor={dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? '#ffdce4' : '#b5f4d4ff'}
					borderIconColor={dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? '#fff0f3' : '#d6f6e6ff'}
					title={dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? 'Khoá tài khoản khách thuê' : 'Mở khóa tài khoản khách thuê'}
					note={
						dataChangeStatus?.status == STATUS_CONFIG.ACTIVE
							? 'Bạn có chắc chắn muốn khóa tài khoản khách thuê không?'
							: 'Bạn có chắc chắn muốn mở khóa tài khoản khách thuê không?'
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

				<Dialog
					open={!!uuidReset}
					type='error'
					backgroundIconColor='#ffdce4'
					borderIconColor='#fff0f3'
					title='Reset mật khẩu'
					note={
						<span>
							Bạn có chắc chắn muốn reset mật khẩu tài khoản khách thuê? <br />
							Reset mật khẩu tài khoản khách thuê sẽ không ảnh hưởng đến mật khẩu của bạn.
						</span>
					}
					icon={<Warning2 size='28' color='#EE0033' />}
					onClose={() => setUuidReset('')}
					onSubmit={funcResetPassword.mutate}
				/>
			</FlexLayout>
		</Fragment>
	);
}

export default MainGuestTenant;

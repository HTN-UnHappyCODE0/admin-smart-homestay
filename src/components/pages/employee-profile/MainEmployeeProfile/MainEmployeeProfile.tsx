import {Fragment, useState} from 'react';
import styles from './MainEmployeeProfile.module.scss';
import {IEmployeeProfile, PropsMainEmployeeProfile} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Header from '~/components/utils/Header';
import Button from '~/components/common/Button';
import {AddCircle, Edit, Eye, Lock, Unlock, UserAdd, Warning2} from 'iconsax-react';
import SearchBlock from '~/components/utils/SearchBlock';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import {roleAccounts, stateAccounts, statusConfigs} from '~/constants/config/data';
import MainTable from '~/components/utils/MainTable';
import DataWrapper from '~/components/utils/DataWrapper';
import Loading from '~/components/common/Loading';
import Table from '~/components/common/Table';
import StateActive from '~/components/utils/StateActive';
import IconActionTable from '~/components/utils/IconActionTable';
import Pagination from '~/components/common/Pagination';
import {CONFIG_PAGING, CONFIG_TYPE_FINDING, QUERY_KEY, STATE_ACCOUNT, STATUS_CONFIG, TYPE_USER} from '~/constants/config/enum';
import {useRouter} from 'next/router';
import PositionContainer from '~/components/common/PositionContainer';
import FormCreateEmployeeProfile from '../FormCreateEmployeeProfile';
import Dialog from '~/components/common/Dialog';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import userServices from '~/services/userServices';
import DetailEmployeeProfile from '../DetailEmployeeProfile';
import Popup from '~/components/common/Popup';
import FormCreateAccount from '../FormCreateAccount';
import FilterCustom from '~/components/common/FilterCustom';
import FormUpdateEmployeeProfile from '../FormUpdateEmployeeProfile';

function MainEmployeeProfile({}: PropsMainEmployeeProfile) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_open, _uuid, _uuidUpdate} = router.query;

	const [dataChangeStatus, setDataChangeStatus] = useState<{uuid: string; status: number | null} | null>(null);

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [keyword, setKeyword] = useState<string>('');
	const [status, setStatus] = useState<number | null>(null);
	const [dataCreateAccount, setDataCreateAccount] = useState<{name: string; userUuid: string} | null>(null);

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
		items: IEmployeeProfile[];
		pagination: {
			totalCount: number;
			totalPage: number;
		};
	}>([QUERY_KEY.table_employee_profile, page, pageSize, keyword, status], {
		queryFn: () =>
			httpRequest({
				http: userServices.getUsers({
					isPaging: CONFIG_PAGING.IS_PAGING,
					typeFinding: CONFIG_TYPE_FINDING.DTO,
					page: page,
					pageSize: pageSize,
					keyword: keyword,
					type: [TYPE_USER.STAFF, TYPE_USER.MANAGE, TYPE_USER.ADMINISTRATOR],
					hasRented: null,
					status: status,
					userUuid: '',
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
					dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? 'Khóa nhân viên thành công!' : 'Mở khóa nhân viên thành công!',
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
					queryKey: [QUERY_KEY.table_employee_profile],
				});
			}
		},
	});

	return (
		<Fragment>
			<Loading loading={funcChangeStatus.isLoading} />
			<FlexLayout column gap-12>
				<Header
					title='Quản lý hồ sơ nhân viên'
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
							note='Danh sách hồ sơ nhân viên đang trống!'
						>
							<Table<IEmployeeProfile>
								rowKey={(row) => row.uuid}
								data={data.items || []}
								fixedHeader={true}
								column={[
									{
										title: 'STT',
										render: (_, index) => <>{index + 1}</>,
									},
									{
										fixedLeft: true,
										title: 'Mã nhân viên',
										render: (row, _) => <>{row?.code || '---'}</>,
									},
									{
										title: 'Tên nhân viên',
										render: (row, _) => <>{row?.name}</>,
									},
									{
										title: 'Số điện thoại',
										render: (row, _) => <>{row?.phoneNumber || '---'}</>,
									},

									{
										title: 'Email',
										render: (row, _) => <>{row?.email || '---'}</>,
									},
									{
										title: 'Căn hộ quản lý',
										render: (row, _) => <>{row?.numApartment || '0'}</>,
									},
									{
										title: 'Trạng thái tài khoản',
										render: (row, _) => (
											<StateActive
												stateActive={!row?.userName ? STATE_ACCOUNT.NOT_ISSUE : STATE_ACCOUNT.ISSUED}
												listState={stateAccounts}
											/>
										),
									},
									{
										title: 'Tên tài khoản',
										render: (row, _) => <>{row?.userName || '---'}</>,
									},
									{
										title: 'Vai trò',
										render: (row, _) => <>{roleAccounts.find((role) => role.state == row?.type)?.text || '---'} </>,
									},

									{
										title: 'Trạng thái hoạt động',
										render: (row, _) => <StateActive stateActive={row?.status} listState={statusConfigs} />,
									},
									{
										title: 'Hành động',
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
																_uuid: row?.uuid,
															},
														})
													}
												/>
												<IconActionTable
													icon={<Edit color='#292D32' size={24} />}
													tooltip='Chỉnh sửa hồ sơ'
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
												<IconActionTable
													icon={
														row?.status == STATUS_CONFIG.ACTIVE ? (
															<Lock color='#292D32' size={24} />
														) : (
															<Unlock color='#292D32' size={24} />
														)
													}
													tooltip={row?.status == STATUS_CONFIG.ACTIVE ? 'Khóa nhân viên' : 'Mở nhân viên'}
													onClick={() =>
														setDataChangeStatus({
															uuid: row?.uuid,
															status: row?.status,
														})
													}
												/>
												{row?.userName == null && (
													<IconActionTable
														icon={<UserAdd color='#292D32' size={24} />}
														tooltip='Cấp tài khoản'
														onClick={() => setDataCreateAccount({name: row?.name, userUuid: row?.uuid})}
													/>
												)}
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
				<FormCreateEmployeeProfile
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
					const {_uuid, ...rest} = router.query;

					router.replace({
						pathname: router.pathname,
						query: {
							...rest,
						},
					});
				}}
			>
				<DetailEmployeeProfile
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
				<FormUpdateEmployeeProfile
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
				title={dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? 'Khoá nhân viên' : 'Mở khóa nhân viên'}
				note={
					dataChangeStatus?.status == STATUS_CONFIG.ACTIVE
						? 'Bạn có chắc chắn muốn khóa nhân viên không?'
						: 'Bạn có chắc chắn muốn mở khóa nhân viên không?'
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

			<Popup open={!!dataCreateAccount} onClose={() => setDataCreateAccount(null)}>
				<FormCreateAccount
					data={{name: dataCreateAccount?.name!, userUuid: dataCreateAccount?.userUuid!}}
					onClose={() => setDataCreateAccount(null)}
				/>
			</Popup>
		</Fragment>
	);
}

export default MainEmployeeProfile;

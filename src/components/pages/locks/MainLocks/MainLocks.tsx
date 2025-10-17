import FlexLayout from '~/components/layouts/FlexLayout';
import styles from './MainLocks.module.scss';
import {ILock, PropsMainLocks} from './interfaces';
import Header from '~/components/utils/Header';
import Button from '~/components/common/Button';
import {AddCircle, DocumentText, DriverRefresh, Edit, Key, Warning2} from 'iconsax-react';
import SearchBlock from '~/components/utils/SearchBlock';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import FilterCustom from '~/components/common/FilterCustom';
import {Fragment, useState} from 'react';
import {statusConfigs} from '~/constants/config/data';
import MainTable from '~/components/utils/MainTable';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import Pagination from '~/components/common/Pagination';
import IconActionTable from '~/components/utils/IconActionTable';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {CONFIG_PAGING, CONFIG_TYPE_FIND, QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import lockServices from '~/services/lockServices';
import {getDetailAddress} from '~/common/funcs/optionConvert';
import Dialog from '~/components/common/Dialog';
import Popup from '~/components/common/Popup';
import FormChangePassword from '../FormChangePassword';
import Loading from '~/components/common/Loading';
import {useRouter} from 'next/router';
import PositionContainer from '~/components/common/PositionContainer';
import FormCreateLock from '../FormCreateLock';
import MainHistoryUnlock from '../MainHistoryUnlock';
import StateActive from '~/components/utils/StateActive';

function MainLocks({}: PropsMainLocks) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_open, _uuidHistory} = router.query;

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [keyword, setKeyword] = useState<string>('');
	const [status, setStatus] = useState<number | null>(null);

	const [uuidReset, setUuidReset] = useState<string>('');
	const [uuidChangePassword, setUuidChangePassword] = useState<string>('');

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
		items: ILock[];
		pagination: {
			totalCount: number;
			totalPage: number;
		};
	}>([QUERY_KEY.table_lock, page, pageSize, keyword, status], {
		queryFn: () =>
			httpRequest({
				http: lockServices.listLock({
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

	const funcResetPassword = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageSuccess: true,
				showMessageFailed: true,
				msgSuccess: 'Reset mật khẩu thành công!',
				http: lockServices.resetUserPassword({
					uuid: uuidReset,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setUuidReset('');
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_lock],
				});
			}
		},
	});

	return (
		<Fragment>
			<Loading loading={funcResetPassword.isLoading} />
			<FlexLayout column gap-12>
				<Header
					title='Danh sách khóa'
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
							<Table<ILock>
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
										title: 'ID ổ khóa',
										render: (row, _) => <>{row?.code}</>,
									},
									{
										title: 'Mật khẩu',
										render: (row, _) => <>{row?.password}</>,
									},
									{
										title: 'Tên căn hộ',
										render: (row, _) => <>{row?.apartmentUu?.name || '---'}</>,
									},
									{
										title: 'Địa chỉ',
										render: (row, _) => (
											<>
												{getDetailAddress({
													address: row?.apartmentUu?.address,
													provinceName: row?.apartmentUu?.province?.fullName,
													districtName: '',
													wardName: row?.apartmentUu?.ward?.fullName,
												})}
											</>
										),
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
													icon={<Key color='#292D32' size={24} />}
													tooltip='Đổi mật khẩu'
													onClick={() => setUuidChangePassword(row?.uuid)}
												/>
												<IconActionTable
													icon={<DriverRefresh color='#292D32' size={24} />}
													tooltip='Reset mật khẩu người dùng'
													onClick={() => setUuidReset(row?.uuid)}
												/>
												<IconActionTable
													icon={<DocumentText color='#292D32' size={24} />}
													tooltip='Lịch sử mở cửa'
													onClick={() =>
														router.replace({
															pathname: router.pathname,
															query: {
																...router.query,
																_uuidHistory: row?.uuid,
															},
														})
													}
												/>
												<IconActionTable icon={<Edit color='#292D32' size={24} />} tooltip='Chỉnh sửa khóa' />
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
				<FormCreateLock
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
				open={!!_uuidHistory}
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
				<MainHistoryUnlock
					onClose={() => {
						const {_uuidHistory, ...rest} = router.query;

						router.replace({
							pathname: router.pathname,
							query: {
								...rest,
							},
						});
					}}
				/>
			</PositionContainer>

			<Popup open={!!uuidChangePassword} onClose={() => setUuidChangePassword('')}>
				<FormChangePassword uuidLock={uuidChangePassword} onClose={() => setUuidChangePassword('')} />
			</Popup>

			<Dialog
				open={!!uuidReset}
				type='error'
				backgroundIconColor='#ffdce4'
				borderIconColor='#fff0f3'
				title='Reset mật khẩu'
				note={
					<span>
						Bạn có chắc chắn muốn reset mật khẩu người dùng? <br />
						Reset mật khẩu người dùng sẽ không ảnh hưởng đến mật khẩu của bạn.
					</span>
				}
				icon={<Warning2 size='28' color='#EE0033' />}
				onClose={() => setUuidReset('')}
				onSubmit={funcResetPassword.mutate}
			/>
		</Fragment>
	);
}

export default MainLocks;

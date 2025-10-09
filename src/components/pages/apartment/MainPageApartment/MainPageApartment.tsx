import {Fragment, useState} from 'react';
import styles from './MainPageApartment.module.scss';
import {IApartment, PropsMainPageApartment} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Header from '~/components/utils/Header';
import Button from '~/components/common/Button';
import {AddCircle, Edit, Eye, Lock} from 'iconsax-react';
import SearchBlock from '~/components/utils/SearchBlock';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import FilterCustom from '~/components/common/FilterCustom';
import {CONFIG_PAGING, CONFIG_TYPE_FIND, QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import MainTable from '~/components/utils/MainTable';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import SwitchButton from '~/components/common/SwitchButton';
import StateActive from '~/components/utils/StateActive';
import IconActionTable from '~/components/utils/IconActionTable';
import Pagination from '~/components/common/Pagination';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import apartmentServices from '~/services/apartmentServices';
import Dialog from '~/components/common/Dialog';
import {HiOutlineLockClosed, HiOutlineLockOpen} from 'react-icons/hi';
import {convertCoin} from '~/common/funcs/convertCoin';
import {stateApartments, statusConfigs} from '~/constants/config/data';

function MainPageApartment({}: PropsMainPageApartment) {
	const queryClient = useQueryClient();

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [keyword, setKeyword] = useState<string>('');
	const [stateApartment, setStateApartment] = useState<number | null>(null);
	const [status, setStatus] = useState<number | null>(null);

	const [uuidOpen, setUuidOpen] = useState<string>('');
	const [uuidLocked, setUuidLocked] = useState<string>('');

	const resetFilter = () => {
		setPage(1);
		setPageSize(20);
		setKeyword('');
		setStateApartment(null);
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
		items: IApartment[];
		pagination: {
			totalCount: number;
			totalPage: number;
		};
	}>([QUERY_KEY.table_apartment, page, pageSize, keyword, stateApartment, status], {
		queryFn: () =>
			httpRequest({
				http: apartmentServices.getListApartments({
					isPaging: CONFIG_PAGING.IS_PAGING,
					typeFinding: CONFIG_TYPE_FIND.TABLE,
					page: page,
					pageSize: pageSize,
					keyword: keyword,
					state: stateApartment,
					status: status,
					province: '',
					ward: '',
					sizeFrom: null,
					sizeTo: null,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const funcLocked = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageSuccess: true,
				showMessageFailed: true,
				msgSuccess: 'Khóa căn hộ thành công!',
				http: apartmentServices.changeStatus({
					uuid: uuidLocked,
					status: STATUS_CONFIG.LOCKED,
					description: '',
				}),
			}),
		onSuccess(data) {
			if (data) {
				setUuidLocked('');
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_apartment],
				});
			}
		},
	});

	const funcOpen = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageSuccess: true,
				showMessageFailed: true,
				msgSuccess: 'Mở khóa căn hộ thành công!',
				http: apartmentServices.changeStatus({
					uuid: uuidOpen,
					status: STATUS_CONFIG.ACTIVE,
					description: '',
				}),
			}),
		onSuccess(data) {
			if (data) {
				setUuidOpen('');
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_apartment],
				});
			}
		},
	});

	return (
		<Fragment>
			<FlexLayout column gap-12>
				<Header
					title='Danh sách căn hộ'
					actions={
						<FlexLayout row gap-6>
							<Button icon={<AddCircle />} p_8_24 rounded_40 bright-cyan bold>
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
									<FilterCustom
										name='Trạng thái căn hộ'
										value={stateApartment}
										setValue={setStateApartment}
										listOption={stateApartments.map((item) => ({
											uuid: item.state,
											name: item.text,
										}))}
									/>
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
							title='Căn hộ trống!'
							note='Danh sách căn hộ hiện đang trống!'
						>
							<Table<IApartment>
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
										title: 'Loại hình căn hộ',
										render: (row, _) => <>{row?.apartmentTypeUu?.name}</>,
									},
									{
										title: 'ID ổ khóa',
										render: (row, _) => <>{row?.lock?.code}</>,
									},
									{
										title: 'Tên căn hộ',
										render: (row, _) => <>{row?.name}</>,
									},
									{
										title: 'Diện tích (m2)',
										render: (row, _) => <>{row?.apartmentSize}</>,
									},
									{
										title: 'Địa chỉ (Tỉnh - xã)',
										render: (row, _) => (
											<>
												{row?.province?.fullName} - {row?.ward?.fullName}
											</>
										),
									},
									{
										title: 'Yêu cầu xem căn hộ',
										render: (row, _) => <>{row?.numVisitRequest}</>,
									},
									{
										title: 'Yêu cầu xử lý sự cố',
										render: (row, _) => <>{row?.numIncidentRequest}</>,
									},
									{
										title: 'Giá cho thuê (VND)',
										render: (row, _) => <>{convertCoin(row?.rentPrice)}</>,
									},
									{
										title: 'Giá quảng cáo(VND)',
										render: (row, _) => <>{convertCoin(row?.adPrice)}</>,
									},
									{
										title: 'Aptomat',
										render: (row, _) => <SwitchButton checkOn={row?.uuid == '1'} />,
									},
									{
										title: 'Đồng hồ nước',
										render: (row, _) => <SwitchButton checkOn={row?.uuid == '1'} />,
									},
									{
										title: 'Người quản lý',
										render: (row, _) => <>{row?.managerUu?.name}</>,
									},
									{
										title: 'Trạng thái căn hộ',
										render: (row, _) => <StateActive stateActive={row?.state} listState={stateApartments} />,
									},
									{
										title: 'Trạng thái hoạt động',
										render: (row, _) => <StateActive stateActive={row?.status} listState={statusConfigs} />,
									},
									{
										title: 'Tác vụ',
										fixedRight: true,
										render: (row, _) => (
											<FlexLayout row>
												<IconActionTable icon={<Eye color='#292D32' size={24} />} tooltip='Xem chi tiết' />
												{row?.status === STATUS_CONFIG.ACTIVE && (
													<IconActionTable
														icon={<HiOutlineLockClosed color='#EE0033' size={24} />}
														tooltip='Khóa căn hộ'
														onClick={() => setUuidLocked(row?.uuid)}
													/>
												)}
												{row?.status === STATUS_CONFIG.LOCKED && (
													<IconActionTable
														icon={<HiOutlineLockOpen color='#33C041' size={24} />}
														tooltip='Mở khóa căn hộ'
														onClick={() => setUuidOpen(row?.uuid)}
													/>
												)}

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
							dependencies={[pageSize, keyword, stateApartment, status]}
						/>
					</MainTable>
				</FlexItem>
			</FlexLayout>

			<Dialog
				type='primary'
				backgroundIconColor='#25C173'
				borderIconColor='#25C173'
				icon={<HiOutlineLockOpen size={28} color='#fff' />}
				open={!!uuidOpen}
				onClose={() => setUuidOpen('')}
				title='Mở khóa căn hộ'
				note='Bạn có chắc chắn muốn mở khóa căn hộ không?'
				onSubmit={funcOpen.mutate}
			/>

			<Dialog
				type='error'
				backgroundIconColor='#fff0f3'
				borderIconColor='#fff0f3'
				open={!!uuidLocked}
				onClose={() => setUuidLocked('')}
				title='Khóa căn hộ'
				note='Bạn có chắc chắn muốn khóa căn hộ không?'
				onSubmit={funcLocked.mutate}
			/>
		</Fragment>
	);
}

export default MainPageApartment;

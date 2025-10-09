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
import {CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND, QUERY_KEY, TYPE_DATE} from '~/constants/config/enum';
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
import {statusApartments} from '~/constants/config/data';

function MainPageApartment({}: PropsMainPageApartment) {
	const queryClient = useQueryClient();

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [keyword, setKeyword] = useState<string>('');
	const [status, setStatus] = useState<number | null>(null);
	const [statusDevice, setStatusDevice] = useState<number | null>(null);
	const [area, setArea] = useState<number | null>(null);
	const [province, setProvince] = useState<string>('');
	const [ward, setWard] = useState<string>('');

	const [open, setOpen] = useState<boolean>(false);
	const [uuidOpen, setUuidOpen] = useState<string>('');
	const [uuidLocked, setUuidLocked] = useState<string>('');

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
		items: IApartment[];
		pagination: {
			totalCount: number;
			totalPage: number;
		};
	}>([QUERY_KEY.table_apartment, page, pageSize, keyword, status], {
		queryFn: () =>
			httpRequest({
				http: apartmentServices.getListApartments({
					page: page,
					pageSize: pageSize,
					keyword: keyword,
					isPaging: CONFIG_PAGING.IS_PAGING,
					typeFinding: CONFIG_TYPE_FIND.TABLE,
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
					status: CONFIG_STATUS.LOCKED,
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
					status: CONFIG_STATUS.ACTIVE,
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
							<Button icon={<AddCircle />} p_8_24 rounded_40 bright-cyan bold onClick={() => setOpen(true)}>
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
										value={status}
										setValue={setStatus}
										listOption={statusApartments.map((item) => ({
											uuid: item.state,
											name: item.text,
										}))}
									/>
									<FilterCustom
										name='Trạng thái thiết bị'
										value={statusDevice}
										setValue={setStatusDevice}
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
										name='Diện tích'
										value={area}
										setValue={setArea}
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
										name='Tỉnh'
										value={province}
										setValue={setProvince}
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
										name='Xã'
										value={ward}
										setValue={setWard}
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
										render: (row, _) => <StateActive stateActive={row?.status} listState={statusApartments} />,
									},
									{
										title: 'Tác vụ',
										fixedRight: true,
										render: (row, _) => (
											<FlexLayout row>
												<IconActionTable icon={<Eye color='#292D32' size={24} />} tooltip='Xem chi tiết' />
												{row?.status === CONFIG_STATUS.ACTIVE && (
													<IconActionTable
														icon={<HiOutlineLockClosed color='#EE0033' size={24} />}
														tooltip='Khóa'
														onClick={() => setUuidLocked(row?.uuid)}
													/>
												)}
												{row?.status === CONFIG_STATUS.LOCKED && (
													<IconActionTable
														icon={<HiOutlineLockOpen color='#33C041' size={24} />}
														tooltip='Mở'
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
							dependencies={[keyword, status]}
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

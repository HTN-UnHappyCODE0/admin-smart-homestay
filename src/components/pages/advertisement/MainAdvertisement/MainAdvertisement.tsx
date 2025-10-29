import {useRouter} from 'next/router';
import styles from './MainAdvertisement.module.scss';
import {IAdvertisement, PropsMainAdvertisement} from './interfaces';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Fragment, useState} from 'react';
import {CONFIG_PAGING, CONFIG_TYPE_FIND, QUERY_KEY, STATE_SWITCH, TYPE_DATE} from '~/constants/config/enum';
import FlexLayout from '~/components/layouts/FlexLayout';
import Header from '~/components/utils/Header';
import Button from '~/components/common/Button';
import {AddCircle, DocumentSketch, Edit, Eye, RepeatCircle, Warning2} from 'iconsax-react';
import {PATH} from '~/constants/config';
import SearchBlock from '~/components/utils/SearchBlock';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import FilterCustom from '~/components/common/FilterCustom';
import {stateApartmentAdvertisement, statusApartmentAdvertisement} from '~/constants/config/data';
import FilterDateRange from '~/components/common/FilterDateRange';
import Pagination from '~/components/common/Pagination';
import MainTable from '~/components/utils/MainTable';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import Link from 'next/link';
import {getUnitByAdPrice} from '~/common/funcs/getUnitByAdPrice';
import moment from 'moment';
import StateActive from '~/components/utils/StateActive';
import SwitchButton from '~/components/common/SwitchButton';
import IconActionTable from '~/components/utils/IconActionTable';
import {httpRequest} from '~/services';
import advertisementServices from '~/services/advertisementServices';
import Dialog from '~/components/common/Dialog';

function MainAdvertisement({}: PropsMainAdvertisement) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuid, _uuidAdvertisement, _open} = router.query;

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [keyword, setKeyword] = useState<string>('');
	const [status, setStatus] = useState<number | null>(null);
	const [stateAdvertisement, setStateAdvertisement] = useState<number | null>(null);
	const [date, setDate] = useState<{from: Date | null; to: Date | null} | null>(null);
	const [typeDate, setTypeDate] = useState<TYPE_DATE>(TYPE_DATE.ALL);

	const [dataChangeStateSwitch, setDataChangeStateSwitch] = useState<{
		advertisementUuid: string;
		state: number;
		name: string;
	} | null>(null);

	const resetFilter = () => {
		setKeyword('');
		setStatus(null);
		setTypeDate(TYPE_DATE.ALL);
		setDate(null);
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
		items: IAdvertisement[];
		pagination: {
			totalCount: number;
			totalPage: number;
		};
	}>([QUERY_KEY.table_apartment_advertisement, page, pageSize, keyword, status, stateAdvertisement], {
		queryFn: () =>
			httpRequest({
				http: advertisementServices.getListAdvertisement({
					isPaging: CONFIG_PAGING.IS_PAGING,
					typeFinding: CONFIG_TYPE_FIND.TABLE,
					page: page,
					pageSize: pageSize,
					keyword: keyword,
					state: stateAdvertisement,
					status: status,
					provinceId: '',
					wardId: '',
					adCode: '',
					address: '',
					apartmentCode: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	const funcChangeSwitch = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageSuccess: true,
				showMessageFailed: true,
				msgSuccess:
					dataChangeStateSwitch?.state == STATE_SWITCH.ON
						? `Tắt ${dataChangeStateSwitch?.name} thành công!`
						: `Bật ${dataChangeStateSwitch?.name} thành công!`,
				http: advertisementServices.changeStateAdvertisement({
					uuid: dataChangeStateSwitch?.advertisementUuid!,
					state: dataChangeStateSwitch?.state === STATE_SWITCH.ON ? STATE_SWITCH.OFF : STATE_SWITCH.ON,
					description: '',
				}),
			}),
		onSuccess(data) {
			if (data) {
				setDataChangeStateSwitch(null);
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_apartment_advertisement],
				});
			}
		},
	});

	return (
		<Fragment>
			<FlexLayout column gap-12>
				<Header
					title='Bài đăng & quảng cáo'
					actions={
						<FlexLayout row gap-6>
							<Button icon={<AddCircle />} p_8_24 rounded_40 bright-cyan bold>
								Tạo bài đăng
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
										name='Căn hộ'
										value={status}
										setValue={setStatus}
										listOption={[
											{
												uuid: 1,
												name: 'Căn hộ 1',
											},
											{
												uuid: 2,
												name: 'Căn hộ 2',
											},
										]}
									/>
									<FilterCustom
										name='Trạng thái'
										value={status}
										setValue={setStatus}
										listOption={statusApartmentAdvertisement.map((item) => ({
											uuid: item.state,
											name: item.text,
										}))}
									/>
									<FilterDateRange date={date} setDate={setDate} typeDate={typeDate} setTypeDate={setTypeDate} />
									<FilterCustom
										name='Hiển thị'
										value={stateAdvertisement}
										setValue={setStateAdvertisement}
										listOption={stateApartmentAdvertisement.map((item) => ({
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
							title='Quảng cáo trống!'
							note='Danh sách quảng cáo hiện đang trống!'
						>
							<Table<IAdvertisement>
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
										title: 'Mã bài đăng',
										render: (row, _) => (
											<Link className={styles.link} href={PATH.Advertisement}>
												{row?.code}
											</Link>
										),
									},
									{
										title: 'Tiêu đề bài đăng',
										render: (row, _) => <>{row?.title || '---'}</>,
									},
									{
										title: 'Giá thuê/tháng',
										render: (row, _) => <>{row?.price || '---'}</>,
									},
									{
										title: 'Tiền cọc',
										render: (row, _) => <>{row?.deposit || '---'}</>,
									},
									{
										title: 'Giá điện/kiểu tính',
										render: (row: IAdvertisement) => {
											const electric = row.adPrices?.find((item) => item.serviceUu?.type === 0);
											const unit = getUnitByAdPrice(electric?.serviceUu?.type ?? 0, electric?.type ?? 0);
											const priceText = electric ? `${electric.price.toLocaleString('vi-VN')}/${unit}` : '---';
											return <>{priceText}</>;
										},
									},
									{
										title: 'Giá nước/kiểu tính',
										render: (row: IAdvertisement) => {
											const water = row.adPrices?.find((item) => item.serviceUu?.type === 1);
											const unit = getUnitByAdPrice(water?.serviceUu?.type ?? 0, water?.type ?? 0);
											const priceText = water ? `${water.price.toLocaleString('vi-VN')}/${unit}` : '---';
											return <>{priceText}</>;
										},
									},

									{
										title: 'Trạng thái',
										render: (row, _) => (
											<StateActive stateActive={row?.status} listState={statusApartmentAdvertisement} />
										),
									},
									{
										title: 'Thời gian đăng',
										render: (row, _) => <>{moment(row?.startDate).format('DD/MM/YYYY HH:mm:ss')}</>,
									},
									{
										title: 'Thời hạn đăng',
										render: (row, _) => <>{moment(row?.expireDate).format('DD/MM/YYYY HH:mm:ss')}</>,
									},
									{
										title: 'Hiển thị',
										render: (row) => (
											<SwitchButton
												checkOn={row?.state === 1}
												onClick={() =>
													setDataChangeStateSwitch({
														advertisementUuid: row?.uuid!,
														state: row?.state!,
														name: row?.title,
													})
												}
											/>
										),
									},
									{
										title: 'Tác vụ',
										fixedRight: true,
										render: (row, _) => (
											<FlexLayout row>
												<IconActionTable
													icon={<Eye color='#303229ff' size={24} />}
													tooltip='Xem chi tiết'
													href={`${PATH.ApartmentDetail}?_uuid=${row?.uuid}`}
												/>
												<IconActionTable icon={<Edit color='#292D32' size={24} />} tooltip='Chỉnh sửa' />
												<IconActionTable
													icon={<DocumentSketch color='#292D32' size={24} />}
													tooltip='Copy và đăng mới'
												/>
												{/*  */}
												<IconActionTable
													icon={<RepeatCircle color='#292D32' size={24} />}
													tooltip='Đăng lại ngay'
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
							dependencies={[pageSize, keyword, status, stateAdvertisement]}
						/>
					</MainTable>
				</FlexItem>

				<Dialog
					open={!!dataChangeStateSwitch}
					type={dataChangeStateSwitch?.state == STATE_SWITCH.ON ? 'error' : 'primary'}
					backgroundIconColor={dataChangeStateSwitch?.state == STATE_SWITCH.ON ? '#ffdce4' : '#b5f4d4ff'}
					borderIconColor={dataChangeStateSwitch?.state == STATE_SWITCH.ON ? '#fff0f3' : '#d6f6e6ff'}
					title={
						dataChangeStateSwitch?.state == STATE_SWITCH.ON
							? `Tắt ${dataChangeStateSwitch?.name}`
							: `Bật ${dataChangeStateSwitch?.name}`
					}
					note={
						dataChangeStateSwitch?.state == STATE_SWITCH.ON
							? `Bạn có chắc chắn muốn tắt ${dataChangeStateSwitch?.name} không?`
							: `Bạn có chắc chắn muốn bật ${dataChangeStateSwitch?.name} không?`
					}
					icon={
						dataChangeStateSwitch?.state == STATE_SWITCH.ON ? (
							<Warning2 size='28' color='#EE0033' />
						) : (
							<Warning2 size='28' color='#25C173' />
						)
					}
					onClose={() => setDataChangeStateSwitch(null)}
					onSubmit={funcChangeSwitch.mutate}
				/>
			</FlexLayout>
		</Fragment>
	);
}

export default MainAdvertisement;

import WrapperForm from '~/components/utils/WrapperForm';
import MainDetailApartment from '../../MainDetailApartment';
import styles from './ListAdvertisementApartment.module.scss';
import {IAdvertisement, PropsListAdvertisementApartment} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Search from '~/components/common/Search';
import FilterCustom from '~/components/common/FilterCustom';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import Button from '~/components/common/Button';
import {DocumentSketch, Edit, Eye, RepeatCircle, Warning2} from 'iconsax-react';
import {useRouter} from 'next/router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import FilterDateRange from '~/components/common/FilterDateRange';
import {
	CONFIG_PAGING,
	CONFIG_TYPE_FINDING,
	QUERY_KEY,
	STATE_APARTMENT_ADVERTISEMENT,
	STATE_SWITCH,
	TYPE_DATE,
} from '~/constants/config/enum';
import MainTable from '~/components/utils/MainTable';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import Link from 'next/link';
import {PATH} from '~/constants/config';
import StateActive from '~/components/utils/StateActive';
import moment from 'moment';
import IconActionTable from '~/components/utils/IconActionTable';
import Pagination from '~/components/common/Pagination';
import SwitchButton from '~/components/common/SwitchButton';
import {httpRequest} from '~/services';
import advertisementServices from '~/services/advertisementServices';
import {stateApartmentAdvertisement, statusApartmentAdvertisement} from '~/constants/config/data';
import {getUnitByAdPrice} from '~/common/funcs/getUnitByAdPrice';
import Dialog from '~/components/common/Dialog';
import PositionContainer from '~/components/common/PositionContainer';
import FormCreateAdvertisement from './components/FormCreateAdvertisement';
import {convertCoin} from '~/common/funcs/convertCoin';
import DetailAdvertisement from './components/DetailAdvertisement';

function ListAdvertisementApartment({}: PropsListAdvertisementApartment) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuid, _uuidDetail, _open} = router.query;

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
	}>([QUERY_KEY.table_apartment_advertisement_detail, page, pageSize, keyword, status, stateAdvertisement], {
		queryFn: () =>
			httpRequest({
				http: advertisementServices.getListPagedAdvertisement({
					isPaging: CONFIG_PAGING.IS_PAGING,
					typeFinding: CONFIG_TYPE_FINDING.DTO,
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
					apartmentUuid: _uuid as string,
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
					queryKey: [QUERY_KEY.table_apartment_advertisement_detail],
				});
			}
		},
	});

	return (
		<MainDetailApartment>
			<WrapperForm title='Danh sách quảng cáo'>
				<FlexLayout row gap-8 justify-space-between wrap>
					<FlexLayout row gap-8 wrap>
						<Search keyword={keyword} setKeyword={setKeyword} />
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
					<FlexItem>
						<Button
							icon={<Edit />}
							p_8_24
							rounded_8
							blue
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
							Tạo bài đăng
						</Button>
					</FlexItem>
				</FlexLayout>

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
											<Link className={styles.link} href={PATH.ListAdvertisementApartment}>
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
										render: (row, _) => <>{convertCoin(row?.price || 0)}</>,
									},
									{
										title: 'Tiền cọc',
										render: (row, _) => <>{convertCoin(row?.deposit || 0)}</>,
									},
									{
										title: 'Giá điện/kiểu tính',
										render: (row: IAdvertisement) => {
											const electric = row.adElectricInfo;
											if (!electric) return <>---</>;
											const unit = getUnitByAdPrice(electric.serviceUu?.type ?? 0, electric.type ?? 0);
											const priceText = `${electric.price.toLocaleString('vi-VN')}/${unit}`;
											return <>{priceText}</>;
										},
									},
									{
										title: 'Giá nước/kiểu tính',
										render: (row: IAdvertisement) => {
											const water = row.adWaterInfo;
											if (!water) return <>---</>;
											const unit = getUnitByAdPrice(water.serviceUu?.type ?? 0, water.type ?? 0);
											const priceText = `${water.price.toLocaleString('vi-VN')}/${unit}`;
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
												<IconActionTable icon={<Edit color='#292D32' size={24} />} tooltip='Chỉnh sửa' />
												<IconActionTable
													icon={<DocumentSketch color='#292D32' size={24} />}
													tooltip='Copy và đăng mới'
												/>
												{row?.status === STATE_APARTMENT_ADVERTISEMENT.EXPIRED && (
													<IconActionTable
														icon={<RepeatCircle color='#292D32' size={24} />}
														tooltip='Đăng lại ngay'
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
					<FormCreateAdvertisement
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
					<DetailAdvertisement
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
			</WrapperForm>
		</MainDetailApartment>
	);
}

export default ListAdvertisementApartment;

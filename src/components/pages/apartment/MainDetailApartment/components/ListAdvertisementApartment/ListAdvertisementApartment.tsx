import WrapperForm from '~/components/utils/WrapperForm';
import MainDetailApartment from '../../MainDetailApartment';
import styles from './ListAdvertisementApartment.module.scss';
import {IAdvertisement, PropsListAdvertisementApartment} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Search from '~/components/common/Search';
import FilterCustom from '~/components/common/FilterCustom';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import Button from '~/components/common/Button';
import {DocumentSketch, Edit, Eye, RepeatCircle} from 'iconsax-react';
import {useRouter} from 'next/router';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import FilterDateRange from '~/components/common/FilterDateRange';
import {CONFIG_PAGING, CONFIG_TYPE_FIND, QUERY_KEY, STATE_APARTMENT_PAYMENT_TYPE, TYPE_DATE} from '~/constants/config/enum';
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
import {statusApartmentAdvertisement} from '~/constants/config/data';

function ListAdvertisementApartment({}: PropsListAdvertisementApartment) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuid, _uuidListAdvertisement} = router.query;

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [type, setType] = useState<number | null>(null);
	const [keyword, setKeyword] = useState<string>('');
	const [status, setStatus] = useState<number | null>(null);
	const [stateApartment, setStateApartment] = useState<number | null>(null);
	const [date, setDate] = useState<{from: Date | null; to: Date | null} | null>(null);
	const [typeDate, setTypeDate] = useState<TYPE_DATE>(TYPE_DATE.ALL);

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
	}>([QUERY_KEY.table_apartment_advertisement, page, pageSize, keyword, status], {
		queryFn: () =>
			httpRequest({
				http: advertisementServices.getListAdvertisement({
					isPaging: CONFIG_PAGING.IS_PAGING,
					typeFinding: CONFIG_TYPE_FIND.TABLE,
					page: page,
					pageSize: pageSize,
					keyword: keyword,
					state: stateApartment,
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

	const getUnitByAdPrice = (serviceType: number, type: number) => {
		if (serviceType === 0) return 'KW';
		if (serviceType === 1) {
			if (type === STATE_APARTMENT_PAYMENT_TYPE.USAGE_BASED) return 'khối';
			if (type === STATE_APARTMENT_PAYMENT_TYPE.PERSON) return 'người';
		}
		return '';
	};

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
							value={status}
							setValue={setStatus}
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
										_uuidListAdvertisement: 'open',
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
										render: (row, _) => <>{row?.price || '---'}</>,
									},
									{
										title: 'Tiền cọc',
										render: (row, _) => <>{row?.deposite || '---'}</>,
									},
									{
										title: 'Giá điện/kiểu tính',
										render: (row) => {
											const electric = row?.adPrices?.find((item) => item.serviceUu?.type === 0);
											if (!electric) return <>—</>;

											const unit = getUnitByAdPrice(electric.serviceUu.type, electric.type);

											return (
												<>
													{electric.price.toLocaleString('vi-VN')}/ {unit}
												</>
											);
										},
									},
									{
										title: 'Giá nước/kiểu tính',
										render: (row) => {
											const water = row?.adPrices?.find((item) => item.serviceUu?.type === 1);
											if (!water) return <>—</>;

											const unit = getUnitByAdPrice(water.serviceUu.type, water.type);

											return (
												<>
													{water.price.toLocaleString('vi-VN')}/ {unit}
												</>
											);
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
										render: (row, _) => <SwitchButton checkOn={row?.uuid == '1'} />,
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
													tooltip='Copy và đăng lại'
												/>
												<IconActionTable
													icon={<RepeatCircle color='#292D32' size={24} />}
													tooltip='Xác nhận đăng lại'
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
							total={10}
							// total={data?.pagination.totalCount || 0}
							dependencies={[pageSize, keyword, status]}
						/>
					</MainTable>
				</FlexItem>
			</WrapperForm>
		</MainDetailApartment>
	);
}

export default ListAdvertisementApartment;

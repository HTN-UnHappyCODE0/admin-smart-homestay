import FlexLayout from '~/components/layouts/FlexLayout';
import styles from './ListMeterApartment.module.scss';
import {IListMeterApartment, PropsListMeterApartment} from './interfaces';
import {PATH} from '~/constants/config';
import {useRouter} from 'next/router';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import Search from '~/components/common/Search';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import {Edit, Eye, Warning2} from 'iconsax-react';
import {useState} from 'react';
import {CONFIG_PAGING, CONFIG_TYPE_FIND, QUERY_KEY, STATE_SWITCH} from '~/constants/config/enum';
import FilterCustom from '~/components/common/FilterCustom';
import WrapperForm from '~/components/utils/WrapperForm';
import Pagination from '~/components/common/Pagination';
import Dialog from '~/components/common/Dialog';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import Link from 'next/link';
import MainDetailApartment from '../../MainDetailApartment';
import Button from '~/components/common/Button';
import SwitchButton from '~/components/common/SwitchButton';
import {httpRequest} from '~/services';
import meterServices from '~/services/meterServices';
import Moment from 'react-moment';
import apartmentServices from '~/services/apartmentServices';
import PositionContainer from '~/components/common/PositionContainer';
import FormUpdateListMeter from './components/FormUpdateListMeter';

function ListMeterApartment({}: PropsListMeterApartment) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuid, _uuidListMeter} = router.query;

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [type, setType] = useState<number | null>(null);
	const [keyword, setKeyword] = useState<string>('');
	const [status, setStatus] = useState<number | null>(null);
	const [date, setDate] = useState<{from: Date | null; to: Date | null} | null>(null);

	const [dataChangeStateSwitch, setDataChangeStateSwitch] = useState<{
		apartmentMeterUuid: string;
		state: number;
		name: string;
	} | null>(null);

	const resetFilter = () => {
		setKeyword('');
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
		items: IListMeterApartment[];
		pagination: {
			totalCount: number;
			totalPage: number;
		};
	}>([QUERY_KEY.table_apartment_list_meter, page, pageSize, keyword, status, _uuid], {
		queryFn: () =>
			httpRequest({
				http: meterServices.listMeterInApartment({
					isPaging: CONFIG_PAGING.IS_PAGING,
					typeFinding: CONFIG_TYPE_FIND.TABLE,
					page: page,
					pageSize: pageSize,
					keyword: keyword,
					status: status,
					apartmentUuid: _uuid as string,
					meterTypeUuid: '',
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
				http: apartmentServices.changeStateMeter({
					apartmentMeterUuid: dataChangeStateSwitch?.apartmentMeterUuid!,
					state: dataChangeStateSwitch?.state === STATE_SWITCH.ON ? STATE_SWITCH.OFF : STATE_SWITCH.ON,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setDataChangeStateSwitch(null);
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_apartment_list_meter],
				});
			}
		},
	});

	return (
		<MainDetailApartment>
			<WrapperForm title='Danh sách thiết bị'>
				<FlexLayout row gap-8 justify-space-between wrap>
					<FlexLayout row gap-8 wrap>
						<Search keyword={keyword} setKeyword={setKeyword} />
						<FilterCustom
							name='Trạng thái sự cố'
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
										_uuidListMeter: 'open',
									},
								})
							}
						>
							Chỉnh sửa
						</Button>
					</FlexItem>
				</FlexLayout>

				<div style={{marginTop: '12px'}}>
					<FlexItem flex-1 overflow-x>
						<DataWrapper
							data={data?.items || []}
							loading={isLoading}
							title='Dữ liệu trống!'
							note='Danh sách dữ liệu hiện đang trống!'
						>
							<Table<IListMeterApartment>
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
										title: 'Tên thiết bị',
										render: (row, _) => <>{row?.meterUu?.name || '---'}</>,
									},
									{
										title: 'Mã kết nối',
										render: (row, _) => (
											<Link className={styles.link} href={PATH.Any}>
												{row?.meterUu?.serialNumber}
											</Link>
										),
									},
									{
										title: 'Thời gian lắp đặt',
										render: (row, _) => <>{<Moment date={row?.meterUu?.installedDate} format='HH:MM, DD/MM/YYYY' />}</>,
									},
									{
										title: 'Người lắp đặt',
										render: (row, _) => <>{row?.meterUu?.userInstallUu || '---'}</>,
									},
									{
										title: 'Trạng thái',
										render: (row, _) => (
											<SwitchButton
												checkOn={row?.onState === STATE_SWITCH.ON}
												onClick={() =>
													setDataChangeStateSwitch({
														apartmentMeterUuid: row?.uuid!,
														state: row?.onState!,
														name: row?.meterTypeUu?.name,
													})
												}
											/>
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
							total={1}
							dependencies={[pageSize, date?.from, date?.to, type]}
						/>
					</FlexItem>
				</div>
			</WrapperForm>

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
				open={!!_uuidListMeter}
				onClose={() => {
					const {_uuidListMeter, ...rest} = router.query;
					router.replace({
						pathname: router.pathname,
						query: {
							...rest,
						},
					});
				}}
			>
				<FormUpdateListMeter
					onClose={() => {
						const {_uuidListMeter, ...rest} = router.query;
						router.replace({
							pathname: router.pathname,
							query: {
								...rest,
							},
						});
					}}
				/>
			</PositionContainer>
		</MainDetailApartment>
	);
}

export default ListMeterApartment;

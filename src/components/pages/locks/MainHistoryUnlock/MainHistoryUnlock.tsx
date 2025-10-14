import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import styles from './MainHistoryUnlock.module.scss';
import {IDetailLock, IHistoryUnlock, PropsMainHistoryUnlock} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import WrapperForm from '~/components/utils/WrapperForm';
import GridColumn from '~/components/layouts/GridColumn';
import InfoDetail from '~/components/utils/InfoDetail';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {CONFIG_PAGING, QUERY_KEY, TYPE_DATE} from '~/constants/config/enum';
import {useState} from 'react';
import {httpRequest} from '~/services';
import lockServices from '~/services/lockServices';
import {useRouter} from 'next/router';
import FilterDateRange from '~/components/common/FilterDateRange';
import moment from 'moment';
import Pagination from '~/components/common/Pagination';
import FilterCustom from '~/components/common/FilterCustom';
import {typeLocks} from '~/constants/config/data';
import Moment from 'react-moment';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';

function MainHistoryUnlock({onClose}: PropsMainHistoryUnlock) {
	const router = useRouter();

	const {_uuidHistory} = router.query;

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [type, setType] = useState<number | null>(null);
	const [typeDate, setTypeDate] = useState<TYPE_DATE>(TYPE_DATE.THIS_MONTH);
	const [date, setDate] = useState<{from: Date | null; to: Date | null} | null>(null);

	const {data: lock} = useQuery<IDetailLock>([QUERY_KEY.table_unlock_history, _uuidHistory], {
		queryFn: () =>
			httpRequest({
				http: lockServices.getDetailLock({uuid: _uuidHistory as string}),
			}),

		select(data) {
			return data;
		},
		enabled: !!_uuidHistory,
	});

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
		items: IHistoryUnlock[];
		pagination: {
			totalCount: number;
			totalPage: number;
		};
	}>([QUERY_KEY.table_detail_lock_history, page, pageSize, _uuidHistory, date?.from, date?.to, type], {
		queryFn: () =>
			httpRequest({
				http: lockServices.getLockHistory({
					keyword: '',
					isPaging: CONFIG_PAGING.IS_PAGING,
					page: page,
					pageSize: pageSize,
					lockUuid: _uuidHistory as string,
					type: type,
					startTime: date?.from ? moment(date.from).startOf('day').format('YYYY-MM-DDTHH:mm:ss') : null,
					endTime: date?.to ? moment(date.to).endOf('day').format('YYYY-MM-DDTHH:mm:ss') : null,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_uuidHistory && !!date?.from && !!date?.to,
	});

	return (
		<WrapperFormPostion
			width={1200}
			title='Lịch sử mở khóa'
			actions={
				<FlexLayout row gap-8>
					<Button p_8_24 rounded_8 white bold onClick={onClose}>
						Đóng
					</Button>
				</FlexLayout>
			}
		>
			<WrapperForm title='Thông tin ổ khóa'>
				<GridColumn col_3>
					<InfoDetail name='ID ổ khóa' value={lock?.code} textColor='#1F5FFF' />
					<InfoDetail name='Căn hộ' value={lock?.apartmentUu?.name} />
				</GridColumn>
			</WrapperForm>
			<WrapperForm title='Lịch sử mở khóa'>
				<FlexLayout column gap-12>
					<FlexLayout row gap-8>
						<FilterCustom
							name='Phương thức mở'
							value={type}
							setValue={setType}
							listOption={typeLocks?.map((v) => ({
								uuid: v?.state,
								name: v?.text,
							}))}
						/>
						<FilterDateRange
							hiddenOptionAll={true}
							date={date}
							setDate={setDate}
							typeDate={typeDate}
							setTypeDate={setTypeDate}
						/>
					</FlexLayout>

					<FlexItem flex-1 overflow-x>
						<DataWrapper
							data={data?.items || []}
							loading={isLoading}
							title='Dữ liệu trống!'
							note='Lịch sử mở khóa hiện đang trống!'
						>
							<Table<IHistoryUnlock>
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
										title: 'Phương thức mở',
										render: (row, _) => <>{typeLocks?.find((v) => v?.state == row?.type)?.text}</>,
									},
									{
										title: 'Tài khoản',
										render: (row, _) => <>{row?.user?.name || '---'}</>,
									},
									{
										title: 'Thời gian mở',
										render: (row, _) => <Moment date={row?.created} format='HH:mm, DD/MM/YYYY' />,
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
							dependencies={[pageSize, _uuidHistory, date?.from, date?.to, type]}
						/>
					</FlexItem>
				</FlexLayout>
			</WrapperForm>
		</WrapperFormPostion>
	);
}

export default MainHistoryUnlock;

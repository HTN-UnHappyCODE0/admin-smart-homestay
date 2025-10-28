import {Fragment, useState} from 'react';
import styles from './MainElectricWater.module.scss';
import {PropsMainElectricWater} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Header from '~/components/utils/Header';
import SearchBlock from '~/components/utils/SearchBlock';
import FilterCustom from '~/components/common/FilterCustom';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import Button from '~/components/common/Button';
import {useQueryClient} from '@tanstack/react-query';
import Pagination from '~/components/common/Pagination';
import MainTable from '~/components/utils/MainTable';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import StateActive from '~/components/utils/StateActive';
import IconActionTable from '~/components/utils/IconActionTable';
import {Eye} from 'iconsax-react';
import {PATH} from '~/constants/config';
import moment from 'moment';
import Link from 'next/link';

function MainElectricWater({}: PropsMainElectricWater) {
	const queryClient = useQueryClient();

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [keyword, setKeyword] = useState<string>('');
	const [status, setStatus] = useState<number | null>(null);

	const resetFilter = () => {
		setPage(1);
		setPageSize(20);
		setKeyword('');
		setStatus(null);
	};

	return (
		<Fragment>
			<FlexLayout column gap-12>
				<Header title='Quản lý điện nước' />
				<SearchBlock
					keyword={keyword}
					setKeyword={setKeyword}
					placeholder='Tìm kiếm theo mã, tên danh mục'
					action={
						<FlexLayout row gap-8 fit-height>
							<FlexItem flex-1 overflow-y scrollbar>
								<FlexLayout row gap-8>
									<FilterCustom
										name='Trạng thái'
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
							// data={data?.items || []}
							data={[1]}
							loading={false}
							title='Dữ liệu trống!'
							note='Danh sách dữ liệu hiện đang trống!'
						>
							<Table<{
								uuid: string;
								name: string;
								paymentPeriod: string;
								datePower: string;
								powerBeginMonth: number;
								powerEndMonth: number;
								powerConsume: number;
								dateWater: string;
								waterBeginMonth: number;
								waterEndMonth: number;
								waterConsume: number;
							}>
								rowKey={(row) => row.uuid}
								// data={data?.items || []}
								data={[
									{
										uuid: '1',
										name: '1',
										paymentPeriod: 'Tháng 10',
										datePower: '01/08 - 31/08/2025',
										powerBeginMonth: 500,
										powerEndMonth: 590,
										powerConsume: 90,
										dateWater: '01/08 - 31/08/2025',
										waterBeginMonth: 500,
										waterEndMonth: 580,
										waterConsume: 90,
									},
								]}
								fixedHeader={true}
								column={[
									{
										title: 'STT',
										fixedLeft: true,
										render: (_, index) => <>{index + 1}</>,
									},
									{
										title: 'Căn hộ',
										render: (row, _) => <>{row?.name}</>,
									},
									{
										title: 'Kỳ thanh toán',
										render: (row, _) => <>{row?.paymentPeriod || '---'}</>,
									},
									{
										title: 'Thời gian tiêu thụ điện',
										render: (row, _) => <>{moment(row?.datePower).format('DD/MM/YYYY HH:mm:ss')}</>,
									},
									{
										title: 'Số điện đầu tháng',
										render: (row, _) => <>{row?.powerBeginMonth || '---'}</>,
									},
									{
										title: 'Số điện cuối tháng',
										render: (row, _) => <>{row?.powerEndMonth || '---'}</>,
									},
									{
										title: 'Số điện tiêu thụ',
										render: (row, _) => (
											<Link href={'#'} className={styles.link}>
												{row?.powerConsume || '---'}
											</Link>
										),
									},
									{
										title: 'Thời gian tiêu thụ nước',
										render: (row, _) => <>{moment(row?.dateWater).format('DD/MM/YYYY HH:mm:ss')}</>,
									},
									{
										title: 'Số nước đầu tháng',
										render: (row, _) => <>{row?.waterBeginMonth || '---'}</>,
									},
									{
										title: 'Số nước cuối tháng',
										render: (row, _) => <>{row?.waterEndMonth || '---'}</>,
									},
									{
										title: 'Số nước tiêu thụ',
										render: (row, _) => (
											<Link href={'#'} className={styles.link}>
												{row?.waterConsume || '---'}
											</Link>
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
													href={`${PATH.ElectricWaterDetail}?_uuid=${row?.uuid}`}
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
							// total={data?.pagination.totalCount || 0}
							total={10}
							dependencies={[pageSize, keyword, status]}
						/>
					</MainTable>
				</FlexItem>
			</FlexLayout>
		</Fragment>
	);
}

export default MainElectricWater;

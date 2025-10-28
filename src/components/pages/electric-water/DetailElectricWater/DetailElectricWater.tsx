import {useRouter} from 'next/router';
import styles from './DetailElectricWater.module.scss';
import {PropsDetailElectricWater} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import LayoutMainPage from '~/components/layouts/LayoutMainPage';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import WrapperForm from '~/components/utils/WrapperForm';
import InfoDetail from '~/components/utils/InfoDetail';
import GridColumn from '~/components/layouts/GridColumn';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import Search from '~/components/common/Search';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import {useState} from 'react';
import Link from 'next/link';
import moment from 'moment';
import FilterCustom from '~/components/common/FilterCustom';

function DetailElectricWater({}: PropsDetailElectricWater) {
	const router = useRouter();

	const {_uuid} = router.query;

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [keyword, setKeyword] = useState<string>('');
	const [status, setStatus] = useState<number | null>(null);
	const [date, setDate] = useState<{from: Date | null; to: Date | null} | null>(null);

	const resetFilter = () => {
		setKeyword('');
		setStatus(null);
		setDate(null);
	};

	return (
		<FlexLayout column gap-12>
			<LayoutMainPage
				breadcrumb={
					<Breadcrumb
						listUrls={[
							{
								title: 'Quản lý điện nước',
								path: PATH.ElectricWater,
							},
							{
								title: 'Chi tiết',
								path: PATH.ElectricWaterDetail,
							},
						]}
					/>
				}
				title='Chi tiết căn hộ'
				tabs={[]}
			>
				<FlexLayout column gap-16>
					<WrapperForm title='Thông tin điện nước'>
						<FlexLayout column gap-16>
							<InfoDetail name='Căn hộ' value={'Căn hộ số 3'} />
							<GridColumn col_3>
								<InfoDetail name='Số điện đầu tháng' value={'500'} />
								<InfoDetail name='Số điện hiện tại' value={'500'} />
								<InfoDetail name='Số điện đã tiêu thụ' value={'58'} textColor='#FF4747' />
								<InfoDetail name='Số nước đầu tháng' value={'468'} />
								<InfoDetail name='Số nước hiện tại' value={'567'} />
								<InfoDetail name='Số nước đã tiêu thụ' value={'12'} textColor='#FF4747' />
							</GridColumn>
						</FlexLayout>
					</WrapperForm>

					<WrapperForm title='Thông tin điện nước'>
						<FlexLayout row gap-8 justify-space-between wrap fit-height>
							<FlexItem>
								<FlexLayout row gap-8 wrap>
									<Search keyword={keyword} setKeyword={setKeyword} />
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
							<FlexItem>
								<FlexLayout row gap-8>
									<Button p_8_24 black rounded_24 bold onClick={resetFilter}>
										Đặt lại
									</Button>
								</FlexLayout>
							</FlexItem>
						</FlexLayout>

						<div style={{marginTop: '20px'}}>
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
									]}
								/>
							</DataWrapper>
						</div>
					</WrapperForm>
				</FlexLayout>
			</LayoutMainPage>
		</FlexLayout>
	);
}

export default DetailElectricWater;

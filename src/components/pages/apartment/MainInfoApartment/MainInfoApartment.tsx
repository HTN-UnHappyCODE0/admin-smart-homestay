import {Fragment, useState} from 'react';
import styles from './MainInfoApartment.module.scss';
import {PropsMainInfoApartment} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import LayoutMainPage from '~/components/layouts/LayoutMainPage';
import {useRouter} from 'next/router';
import {tabsDetailApartments} from '~/constants/config/data';
import WrapperForm from '~/components/utils/WrapperForm';
import StateActive from '~/components/utils/StateActive';
import GridColumn from '~/components/layouts/GridColumn';
import InfoDetail from '~/components/utils/InfoDetail';
import SwitchButton from '~/components/common/SwitchButton';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import Pagination from '~/components/common/Pagination';
import Moment from 'react-moment';

function MainInfoApartment({}: PropsMainInfoApartment) {
	const router = useRouter();
	const {_uuid} = router.query;

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [keyword, setKeyword] = useState<string>('');
	const [type, setType] = useState<number | null>(null);

	return (
		<FlexLayout column gap-12>
			<LayoutMainPage
				breadcrumb={
					<Breadcrumb
						listUrls={[
							{
								title: 'Danh sách căn hộ',
								path: PATH.Apartment,
							},
							{
								path: '',
								title: 'Chi tiết căn hộ',
							},
						]}
						actions={
							<FlexLayout row gap-6>
								<Button p_8_16 rounded_8 red bold>
									Khóa căn hộ
								</Button>
								<Button p_8_16 rounded_8 bright-cyan bold>
									Chỉnh sửa
								</Button>
							</FlexLayout>
						}
					/>
				}
				title='Chi tiết căn hộ'
				tabs={tabsDetailApartments(_uuid as string)}
			>
				<FlexLayout column gap-16>
					<div className={styles.grid}>
						<WrapperForm
							title='Thông tin căn hộ'
							actions={
								<FlexLayout row gap-6 items-center>
									<p
										style={{
											color: '#202939',
											fontSize: '14px',
											fontWeight: '500',
										}}
									>
										Trạng thái:
									</p>
									<StateActive
										isSmall={true}
										stateActive={1}
										listState={[
											{
												backgroundColor: '#06AED4',
												state: 1,
												text: 'Hoạt động',
												textColor: '#fff',
											},
											{
												backgroundColor: '#EE0033',
												state: 2,
												text: 'Bị khóa',
												textColor: '#fff',
											},
										]}
									/>
								</FlexLayout>
							}
						>
							<FlexLayout column gap-16>
								<GridColumn col_3>
									<InfoDetail name='Tên căn hộ' value='TH3-042024' />
									<InfoDetail name='Loại căn hộ' value='Chung cư mini' />
									<InfoDetail name='Diện tích' value='82 m2' />
									<InfoDetail name='ID ổ khóa' value='M2H55020' />
									<InfoDetail name='Phòng' value={'Phòng ngủ *3, Phòng khách *1, Phòng vệ sinh*2'} />
									<InfoDetail name='Nội thất' value='0' />
									<InfoDetail name='Giá cho thuê' value='5.6000.000/tháng' />
									<InfoDetail name='Giá quảng cáo' value='5.6000.000/tháng' />
								</GridColumn>

								<InfoDetail name='Địa chỉ chi tiết' value='quận Long Biên, TP Hà Nội' />
								<InfoDetail name='Mô tả chi tiết' value='Công trình hải Dương số 34' />
								<InfoDetail
									name='Hình ảnh'
									value=''
									images={[
										'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
										'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
										'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
									]}
								/>
							</FlexLayout>
						</WrapperForm>

						<FlexLayout column gap-16>
							<WrapperForm title='Thông tin chủ căn hộ'>
								<InfoDetail isMarginTop={true} name='Tên chủ hộ' value='Nguyễn Ngọc Minh' />
								<InfoDetail isMarginTop={true} name='Số điện thoại' value='096996888' />
								<InfoDetail isMarginTop={true} name='Số tài khoản' value='Nguyễn Ngọc Minh' />
								<InfoDetail isMarginTop={true} name='Ngân hàng' value='Vietcombank' />
							</WrapperForm>

							<WrapperForm title='Thông tin quản lý'>
								<InfoDetail isMarginTop={true} name='Tên người quản lý' value='Nguyễn Ngọc Minh' />
								<InfoDetail isMarginTop={true} name='Số điện thoại' value='096996888' />
							</WrapperForm>
						</FlexLayout>
					</div>
					<WrapperForm title='Quản lý điện nước'>
						<GridColumn col_4>
							<InfoDetail name='Số điện đầu tháng' value='842' />
							<InfoDetail name='Số điện hiện tại' value='900' />
							<InfoDetail name='Số điện đã tiêu thụ' value='58' />
							<InfoDetail name='Aptomat' value='' actions={<SwitchButton checkOn={true} />} />
							<InfoDetail name='Số nước đầu tháng' value='2466' />
							<InfoDetail name='Số nước hiện tại' value='2478' />
							<InfoDetail name='Số nước đã tiêu thụ' value='12' />
							<InfoDetail name='Đồng hồ nước' value='' actions={<SwitchButton checkOn={true} />} />
						</GridColumn>
					</WrapperForm>

					<WrapperForm title='Thông tin hợp đồng'>
						<GridColumn col_4>
							<InfoDetail name='Mã hợp đồng' value='MHĐ04242' />
							<InfoDetail name='Người thuê' value='Đặng Linh Trang' />
							<InfoDetail name='Số người ở ' value='58' />
							<InfoDetail name='Số nước đầu tháng' value='2466' />
							<InfoDetail name='Số nước hiện tại' value='2478' />
							<InfoDetail name='Số nước đã tiêu thụ' value='12' />
						</GridColumn>
					</WrapperForm>

					<WrapperForm title='Thông tin người thuê'>
						<DataWrapper
							data={[1]}
							loading={false}
							title='Thông tin người thuê trống!'
							note='Danh sách thông tin người thuê hiện đang trống!'
						>
							<Table<any>
								rowKey={(row) => row.uuid}
								data={[1]}
								fixedHeader={true}
								column={[
									{
										title: 'STT',
										fixedLeft: true,
										render: (_, index) => <>{index + 1}</>,
									},
									{
										title: 'Tên căn hộ',
										render: (row, _) => <>{row?.apartment?.name || '---'}</>,
									},
									{
										title: 'Tài khoản',
										render: (row, _) => <>{row?.user?.name || '---'}</>,
									},
									{
										title: 'Thời gian',
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
							total={1}
							dependencies={[pageSize, keyword, status]}
						/>
					</WrapperForm>
				</FlexLayout>
			</LayoutMainPage>
		</FlexLayout>
	);
}

export default MainInfoApartment;

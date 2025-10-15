import {Fragment} from 'react';
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

function MainInfoApartment({}: PropsMainInfoApartment) {
	const router = useRouter();

	const {_uuid} = router.query;

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
				<GridColumn col_2>
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
						<GridColumn col_3>
							<InfoDetail name='Tên căn hộ' value='TH3-042024' />
							<InfoDetail name='Loại căn hộ' value='Chung cư mini' />
							<InfoDetail name='Diện tích' value='82 m2' />
						</GridColumn>

						<div style={{marginTop: '20px'}}>
							<GridColumn col_3>
								<InfoDetail name='ID ổ khóa' value='M2H55020' />
								<InfoDetail name='Phòng' value={'Phòng ngủ *3, Phòng khách *1, Phòng vệ sinh*2'} />
								<InfoDetail name='Nội thất' value='0' />
							</GridColumn>
						</div>

						<div style={{marginTop: '20px'}}>
							<GridColumn col_3>
								<InfoDetail name='Giá cho thuê' value='5.6000.000/tháng' />
								<InfoDetail name='Giá quảng cáo' value='5.6000.000/tháng' />
							</GridColumn>
						</div>

						<div style={{marginTop: '20px'}}>
							<GridColumn col_1>
								<InfoDetail name='Địa chỉ chi tiết' value='quận Long Biên, TP Hà Nội' />
							</GridColumn>
						</div>

						<div style={{marginTop: '20px'}}>
							<GridColumn col_1>
								<InfoDetail name='Mô tả chi tiết' value='Công trình hải Dương số 34' />
							</GridColumn>
						</div>

						<div style={{marginTop: '20px'}}>
							<GridColumn col_1>
								<InfoDetail
									name='Hình ảnh'
									value=''
									images={[
										'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
										'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
										'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
									]}
								/>
							</GridColumn>
						</div>
					</WrapperForm>

					<WrapperForm title='Thông tin chủ căn hộ'>
						<div style={{marginTop: '20px'}}>
							<GridColumn col_1>
								<InfoDetail name='Tên chủ hộ' value='Nguyễn Ngọc Minh' />
							</GridColumn>
						</div>

						<div style={{marginTop: '20px'}}>
							<GridColumn col_1>
								<InfoDetail name='Số điện thoại' value='096996888' />
							</GridColumn>
						</div>

						<div style={{marginTop: '20px'}}>
							<GridColumn col_1>
								<InfoDetail name='Số tài khoản' value='Nguyễn Ngọc Minh' />
							</GridColumn>
						</div>

						<div style={{marginTop: '20px'}}>
							<GridColumn col_1>
								<InfoDetail name='Tên chủ hộ' value='Nguyễn Ngọc Minh' />
							</GridColumn>
						</div>
					</WrapperForm>
				</GridColumn>
			</LayoutMainPage>
		</FlexLayout>
	);
}

export default MainInfoApartment;

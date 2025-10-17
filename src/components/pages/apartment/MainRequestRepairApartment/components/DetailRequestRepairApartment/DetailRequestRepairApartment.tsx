import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import styles from './DetailRequestRepairApartment.module.scss';
import {PropsDetailRequestRepairApartment} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import StateActive from '~/components/utils/StateActive';
import Moment from 'react-moment';
import WrapperForm from '~/components/utils/WrapperForm';
import InfoDetail from '~/components/utils/InfoDetail';
import GridColumn from '~/components/layouts/GridColumn';

function DetailRequestRepairApartment({onClose}: PropsDetailRequestRepairApartment) {
	return (
		<WrapperFormPostion
			width={1200}
			title='Chi tiết yêu cầu'
			actions={
				<FlexLayout row gap-8>
					<Button p_8_24 rounded_8 green bold onClick={onClose}>
						Xác nhận đã xử lý
					</Button>
					<Button p_8_24 rounded_8 red bold onClick={onClose}>
						Từ chối xem
					</Button>
					<Button p_8_24 rounded_8 white bold onClick={onClose}>
						Đóng
					</Button>
				</FlexLayout>
			}
			nodes={
				<FlexLayout row gap-8 items-center>
					<p className={styles.text}>Trạng thái yêu cầu:</p>
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

					<div style={{height: '16px', width: '1px', background: '#CDD5DF'}}></div>
					<p className={styles.text}>Thời gian xem:</p>
					<p className={styles.time}>
						<Moment format='HH:mm, DD/MM/YYYY' />
					</p>
				</FlexLayout>
			}
		>
			<WrapperForm title='Thông tin sự cố'>
				<GridColumn col_2>
					<InfoDetail name='Tên căn hộ' value={'Chung cư số 14A Ngô Đình Diệm'} />
					<InfoDetail name='Địa chỉ' value={'Số 46 Ngô Đình Diệm, Tây Hồ, Hà Nội'} />
					<InfoDetail name='Tài khoản báo sửa' value={'Vũ Đức Minh'} />
					<InfoDetail name='Số điện thoại' value={'0362238888'} />
				</GridColumn>
			</WrapperForm>

			<WrapperForm title='Hình ảnh sự cố'>
				<InfoDetail
					name=''
					value=''
					images={[
						'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
						'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
						'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
					]}
				/>
			</WrapperForm>
		</WrapperFormPostion>
	);
}

export default DetailRequestRepairApartment;

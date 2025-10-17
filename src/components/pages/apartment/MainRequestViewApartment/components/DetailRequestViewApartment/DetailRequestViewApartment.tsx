import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import styles from './DetailRequestViewApartment.module.scss';
import {PropsDetailRequestViewApartment} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import StateActive from '~/components/utils/StateActive';
import Moment from 'react-moment';
import WrapperForm from '~/components/utils/WrapperForm';
import InfoDetail from '~/components/utils/InfoDetail';
import Image from 'next/image';
import GridColumn from '~/components/layouts/GridColumn';

function DetailRequestViewApartment({onClose}: PropsDetailRequestViewApartment) {
	return (
		<WrapperFormPostion
			width={1200}
			title='Chi tiết yêu cầu xem căn hộ'
			actions={
				<FlexLayout row gap-8>
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
			<WrapperForm title='Thông tin người xem'>
				<FlexLayout column gap-16>
					<Image
						src='https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png'
						alt='Ảnh đại diện'
						width={120}
						height={120}
						style={{borderRadius: '4px'}}
					/>

					<GridColumn col_3>
						<InfoDetail name='Tên tài khoản' value={'Vũ Đức Minh'} textColor='#1F5FFF' />
						<InfoDetail name='Số điện thoại' value={'0362238888'} />
					</GridColumn>
				</FlexLayout>
			</WrapperForm>

			<WrapperForm title='Thông tin CMND/CCCD'>
				<GridColumn col_3>
					<InfoDetail name='Số CMND/CCCD' value={'142882868'} textColor='#1F5FFF' />
					<InfoDetail name='Nơi cấp' value={'Vĩnh Phúc'} />
					<InfoDetail name='Ngày cấp' value={'10/10/2016'} />
					<InfoDetail
						name='Ảnh mặt trước'
						value=''
						actions={
							<Image
								src='https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png'
								alt='Ảnh mặt trước'
								width={368}
								height={216}
								style={{borderRadius: '8px'}}
							/>
						}
					/>

					<InfoDetail
						name='Ảnh mặt sau'
						value=''
						actions={
							<Image
								src='https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png'
								alt='Ảnh mặt sau'
								width={368}
								height={216}
								style={{borderRadius: '8px'}}
							/>
						}
					/>
				</GridColumn>
			</WrapperForm>
		</WrapperFormPostion>
	);
}

export default DetailRequestViewApartment;

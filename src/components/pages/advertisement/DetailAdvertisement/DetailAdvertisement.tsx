import {useRouter} from 'next/router';
import styles from './DetailAdvertisement.module.scss';
import {PropsDetailAdvertisement} from './interfaces';
import {useQueryClient} from '@tanstack/react-query';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import StateActive from '~/components/utils/StateActive';
import Moment from 'react-moment';
import WrapperForm from '~/components/utils/WrapperForm';
import GridColumn from '~/components/layouts/GridColumn';
import InfoDetail from '~/components/utils/InfoDetail';
import SwitchButton from '~/components/common/SwitchButton';

function DetailAdvertisement({onClose}: PropsDetailAdvertisement) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuidDetail} = router.query;

	return (
		<WrapperFormPostion
			width={1200}
			title='Chi tiết yêu cầu xem căn hộ'
			actions={
				<FlexLayout row gap-8>
					<Button p_8_24 rounded_8 bright-cyan bold onClick={() => {}}>
						Copy và đăng lại
					</Button>
					<Button p_8_24 rounded_8 blue bold onClick={() => {}}>
						Chỉnh sửa
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
					<p className={styles.text}>Thời gian đăng:</p>
					<p className={styles.time}>
						<Moment format='HH:mm, DD/MM/YYYY' />
					</p>
					<div style={{height: '16px', width: '1px', background: '#CDD5DF'}}></div>
					<p className={styles.text}>Thời hạn đăng:</p>
					<p className={styles.time}>
						<Moment format='HH:mm, DD/MM/YYYY' />
					</p>
				</FlexLayout>
			}
		>
			<WrapperForm title='Thông tin bài đăng'>
				<FlexLayout column gap-16>
					<GridColumn col_3>
						<InfoDetail name='Lượt truy cập' value={'8.000'} />
						<InfoDetail name='Người đăng' value={'Vũ Đức Anh'} textColor='#1F5FFF' />
						<InfoDetail name='Hiển thị' value='Hiển thị' actions={<SwitchButton checkOn={true} />} />
					</GridColumn>

					<GridColumn col_3>
						<InfoDetail name='Giá thuê (VND)' value={'5.600.000'} />
						<InfoDetail name='Tiền cọc (VND)' value={'5.600.000'} />
						<InfoDetail name='SĐT liên hệ' value={'036223888'} />
					</GridColumn>

					<GridColumn col_3>
						<InfoDetail name='Giá điện (VND)' value={'4.000/KW'} />
						<InfoDetail name='Giá nước (VND)' value={'100.000/Người'} />
						<InfoDetail name='Chỉnh sửa gần nhất' value={'24/08/2025 08:25:22'} />
						<InfoDetail name='Tiêu đề bài đăng' value={'Chung cư ABCD 2444'} />
					</GridColumn>
					<InfoDetail
						name='Mô tả chi tiết'
						value={
							'Quán Mình có nhà mặt tiền ngay ngã 3 , siêu đông người qua lại Luỹ Bán Bích + Vườn Lài, quán có bàn ghế trong nhà rộng hơn 100m vuông và vỉa hè rộng thênh thang, muốn tìm người hợp tác kinh doanh ăn chia, bán 24/24 vẫn đc , không tốn tiền thuê, có thể ở lại, hoàn toàn an toàn cho ai có ý định khởi nghiệp, hợp tác win win, quán đối diện KATINAT các Bank ngân hàng, nha khoa lớn, xung quanh toàn các thương hiệu đỉnh chóp Sài Gòn . Ai có ý định alo mình nhé , thanks, vui lòng xem kỹ video và hình y chang thực tế'
						}
					/>
				</FlexLayout>
			</WrapperForm>

			<WrapperForm title='Thông tin căn hộ'>
				<FlexLayout column gap-16>
					<GridColumn col_3>
						<InfoDetail name='Tên căn hộ' value={'Chung cư ABC 14A - Lý Diệu'} />
						<InfoDetail name='Loại hình căn hộ' value={'Chung cư mini'} />
						<InfoDetail name='Diện tích' value='92 m2' />
					</GridColumn>

					<GridColumn col_3>
						<InfoDetail name='Thông tin phòng' value={'Phòng ngủ *3, Phòng khách *1, Phòng vệ sinh*2'} />
						<InfoDetail name='Nội thất' value={'---'} />
					</GridColumn>
					<InfoDetail
						name='Hình ảnh'
						value=''
						// images={apartmentInfo?.attachments?.map((item) => `${process.env.NEXT_PUBLIC_IMAGE}/${item}`)}
						images={[
							'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
							'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
							'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/482752AXp/anh-mo-ta.png',
						]}
					/>
				</FlexLayout>
			</WrapperForm>
		</WrapperFormPostion>
	);
}

export default DetailAdvertisement;

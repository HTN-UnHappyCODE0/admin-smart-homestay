import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import styles from './MainHistoryUnlock.module.scss';
import {IHistoryUnlock, PropsMainHistoryUnlock} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import WrapperForm from '~/components/utils/WrapperForm';
import GridColumn from '~/components/layouts/GridColumn';
import InfoDetail from '~/components/utils/InfoDetail';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';

function MainHistoryUnlock({onClose}: PropsMainHistoryUnlock) {
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
					<InfoDetail name='ID ổ khóa' value={502242} textColor='#1F5FFF' />
					<InfoDetail name='Căn hộ' value='Căn hộ ABC số 42 A' />
				</GridColumn>
			</WrapperForm>
			<WrapperForm title='Lịch sử mở khóa'>
				<DataWrapper data={[1]} loading={false} title='Dữ liệu trống!' note='Lịch sử mở khóa hiện đang trống!'>
					<Table<IHistoryUnlock>
						rowKey={(row) => row.uuid}
						data={[{uuid: '1'}, {uuid: '2'}]}
						fixedHeader={true}
						column={[
							{
								title: 'STT',
								fixedLeft: true,
								render: (_, index) => <>{index + 1}</>,
							},
							{
								title: 'Phương thức mở',
								render: (row, _) => <>{'Mở bằng app '}</>,
							},
							{
								title: 'Tài khoản',
								render: (row, _) => <>{'Vũ đức anh'}</>,
							},
							{
								title: 'Thời gian mở',
								render: (row, _) => <>{'24/08/2025'}</>,
							},
						]}
					/>
				</DataWrapper>
			</WrapperForm>
		</WrapperFormPostion>
	);
}

export default MainHistoryUnlock;

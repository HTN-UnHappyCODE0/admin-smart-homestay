import {useRouter} from 'next/router';
import styles from './DetailRequestContract.module.scss';
import {PropsDetailRequestContract} from './interfaces';
import {useQueryClient} from '@tanstack/react-query';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import WrapperForm from '~/components/utils/WrapperForm';
import GridColumn from '~/components/layouts/GridColumn';
import InfoDetail from '~/components/utils/InfoDetail';

function DetailRequestContract({onClose}: PropsDetailRequestContract) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuidDetail} = router.query;

	return (
		<WrapperFormPostion
			width={1200}
			title='Chi tiết yêu cầu xem căn hộ'
			actions={
				<FlexLayout row gap-8>
					<Button p_8_24 rounded_8 white bold onClick={onClose}>
						Hủy bỏ
					</Button>
					<Button p_8_24 rounded_8 bright-cyan bold onClick={() => {}}>
						Lưu lại
					</Button>
				</FlexLayout>
			}
		>
			<WrapperForm title='Thông tin nội thất'>
				<FlexLayout column gap-16>
					<GridColumn col_3>
						<InfoDetail name='Tên thiết bị' value={'---'} />
						<InfoDetail name='Mã kết nối' value={'---'} />
					</GridColumn>
				</FlexLayout>
			</WrapperForm>
		</WrapperFormPostion>
	);
}

export default DetailRequestContract;

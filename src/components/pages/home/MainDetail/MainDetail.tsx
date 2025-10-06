import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import styles from './MainDetail.module.scss';
import {PropsMainDetail} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';

function MainDetail({}: PropsMainDetail) {
	return (
		<WrapperFormPostion
			width={1200}
			title='Thêm danh mục'
			actions={
				<FlexLayout row gap-8>
					<Button p_8_24 rounded_8 white bold>
						Hủy bỏ
					</Button>
					<Button p_8_24 rounded_8 bright-cyan bold>
						Lưu lại
					</Button>
				</FlexLayout>
			}
		>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, magnam? Quod a nam soluta ducimus vel reprehenderit nihil. Harum
		</WrapperFormPostion>
	);
}

export default MainDetail;

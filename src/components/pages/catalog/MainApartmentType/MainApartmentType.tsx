import LayoutMainPage from '~/components/layouts/LayoutMainPage';
import styles from './MainApartmentType.module.scss';
import {PropsMainApartmentType} from './interfaces';
import {tabsCatalogs} from '~/constants/config/data';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import {AddCircle} from 'iconsax-react';

function MainApartmentType({}: PropsMainApartmentType) {
	return (
		<LayoutMainPage
			title='Quản lý danh mục'
			tabs={tabsCatalogs}
			actions={
				<FlexLayout row gap-6>
					<Button icon={<AddCircle />} p_8_24 rounded_40 bright-cyan bold>
						Thêm mới
					</Button>
				</FlexLayout>
			}
		>
			MainApartmentType
		</LayoutMainPage>
	);
}

export default MainApartmentType;

import FlexLayout from '~/components/layouts/FlexLayout';
import styles from './MainDetailApartment.module.scss';
import {PropsMainDetailApartment} from './interfaces';
import LayoutMainPage from '~/components/layouts/LayoutMainPage';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import {tabsDetailApartments} from '~/constants/config/data';
import {useRouter} from 'next/router';

function MainDetailApartment({children}: PropsMainDetailApartment) {
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
								title: 'Chi tiết căn hộ',
								path: PATH.ApartmentDetail,
							},
						]}
						actions={
							<FlexLayout row gap-6>
								<Button p_8_16 rounded_8 red bold>
									Khóa căn hộ
								</Button>
								<Button p_8_16 rounded_8 bright-cyan bold href={`${PATH.UpdateApartment}?_uuid=${_uuid}`}>
									Chỉnh sửa
								</Button>
							</FlexLayout>
						}
					/>
				}
				title='Chi tiết căn hộ'
				tabs={tabsDetailApartments(_uuid as string)}
			>
				{children}
			</LayoutMainPage>
		</FlexLayout>
	);
}

export default MainDetailApartment;

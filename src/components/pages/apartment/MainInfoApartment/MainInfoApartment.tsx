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
				MainInfoApartment
			</LayoutMainPage>
		</FlexLayout>
	);
}

export default MainInfoApartment;

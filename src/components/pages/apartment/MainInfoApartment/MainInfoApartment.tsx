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
									24/08/2025
								</p>
								<div
									style={{
										width: '8px',
										height: '8px',
										borderRadius: '50%',
										background: '#9AA4B2',
									}}
								></div>
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
						MainInfoApartment
					</WrapperForm>
				</GridColumn>
			</LayoutMainPage>
		</FlexLayout>
	);
}

export default MainInfoApartment;

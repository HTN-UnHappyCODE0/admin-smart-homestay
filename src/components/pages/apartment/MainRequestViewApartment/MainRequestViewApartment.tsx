import FlexLayout from '~/components/layouts/FlexLayout';
import styles from './MainRequestViewApartment.module.scss';
import {PropsMainRequestViewApartment} from './interfaces';
import LayoutMainPage from '~/components/layouts/LayoutMainPage';
import Breadcrumb from '~/components/common/Breadcrumb/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button/Button';
import {tabsDetailApartments} from '~/constants/config/data';
import {useRouter} from 'next/router';
import MainTable from '~/components/utils/MainTable';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import Search from '~/components/common/Search';
import FilterDateRange from '~/components/common/FilterDateRange';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import StateActive from '~/components/utils/StateActive';
import IconActionTable from '~/components/utils/IconActionTable';
import {Edit, Eye, Lock} from 'iconsax-react';
import {useState} from 'react';
import {TYPE_DATE} from '~/constants/config/enum';
import FilterCustom from '~/components/common/FilterCustom';
import WrapperForm from '~/components/utils/WrapperForm';

function MainRequestViewApartment({}: PropsMainRequestViewApartment) {
	const router = useRouter();
	const {_uuid} = router.query;

	const [keyword, setKeyword] = useState<string>('');
	const [status, setStatus] = useState<number | null>(null);
	const [typeDate, setTypeDate] = useState<TYPE_DATE>(TYPE_DATE.ALL);
	const [date, setDate] = useState<{from: Date | null; to: Date | null} | null>(null);

	const resetFilter = () => {
		setKeyword('');
		setTypeDate(TYPE_DATE.ALL);
		setDate(null);
	};

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
				<WrapperForm title='Danh sách yêu cầu xem căn hộ'>
					<MainTable>
						<FlexLayout row gap-8 justify-space-between wrap fit-height>
							<FlexItem>
								<FlexLayout row gap-8 wrap>
									<Search keyword={keyword} setKeyword={setKeyword} />
									<FilterDateRange date={date} setDate={setDate} typeDate={typeDate} setTypeDate={setTypeDate} />
									<FilterCustom
										name='Trạng thái'
										value={status}
										setValue={setStatus}
										listOption={[
											{
												uuid: 1,
												name: 'Hoạt động',
											},
											{
												uuid: 2,
												name: 'Đang khóa',
											},
										]}
									/>
								</FlexLayout>
							</FlexItem>
						</FlexLayout>

						<div style={{marginTop: '20px'}}>
							<DataWrapper data={[1]} loading={false} title='Thành viên trống!' note='Danh sách thành viên hiện đang trống!'>
								<Table<{uuid: string; name: string}>
									rowKey={(row) => row.uuid}
									data={[
										{uuid: '1', name: '1'},
										{uuid: '2', name: '2'},
										{uuid: '3', name: '3'},
									]}
									fixedHeader={true}
									column={[
										{
											title: 'STT',
											fixedLeft: true,
											render: (_, index) => <>{index + 1}</>,
										},
										{
											title: 'Tên',
											render: (row, _) => (
												<>
													{row.name} - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab minus,
													asperiores dolores, non consequatur obcaecati voluptatibus reprehenderit laudantium
													sapiente minima magnam fugit iure? Eos, quas. Impedit quod earum asperiores harum.
												</>
											),
										},
										{
											title: 'Trạng thái',
											render: (row, _) => (
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
											),
										},
										{
											title: 'Tác vụ',
											fixedRight: true,
											render: (row, _) => (
												<FlexLayout row>
													<IconActionTable icon={<Eye color='#292D32' size={24} />} tooltip='Xem chi tiết' />
													<IconActionTable icon={<Lock color='#292D32' size={24} />} tooltip='Khóa' />
													<IconActionTable icon={<Edit color='#292D32' size={24} />} tooltip='Chỉnh sửa' />
												</FlexLayout>
											),
										},
									]}
								/>
							</DataWrapper>
						</div>
					</MainTable>
				</WrapperForm>
			</LayoutMainPage>
		</FlexLayout>
	);
}

export default MainRequestViewApartment;

import FlexLayout from '~/components/layouts/FlexLayout';
import styles from './MainHome.module.scss';
import {PropsMainHome} from './interfaces';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import Header from '~/components/utils/Header';
import Button from '~/components/common/Button';
import {AddCircle, Edit, Eye, Lock} from 'iconsax-react';
import SearchBlock from '~/components/utils/SearchBlock';
import {Fragment, useState} from 'react';
import FilterCustom from '~/components/common/FilterCustom';
import {TYPE_DATE} from '~/constants/config/enum';
import FilterDateRange from '~/components/common/FilterDateRange';
import MainTable from '~/components/utils/MainTable';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import IconActionTable from '~/components/utils/IconActionTable';
import StateActive from '~/components/utils/StateActive';
import Pagination from '~/components/common/Pagination';
import SwitchButton from '~/components/common/SwitchButton';
import Popup from '~/components/common/Popup';
import PositionContainer from '~/components/common/PositionContainer';
import MainDetail from '../MainDetail';
import Breadcrumb from '~/components/common/Breadcrumb';
import {PATH} from '~/constants/config';
import WrapperForm from '~/components/utils/WrapperForm';

function MainHome({}: PropsMainHome) {
	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [keyword, setKeyword] = useState<string>('');
	const [status, setStatus] = useState<number | null>(null);
	const [typeDate, setTypeDate] = useState<TYPE_DATE>(TYPE_DATE.ALL);
	const [date, setDate] = useState<{from: Date | null; to: Date | null} | null>(null);

	const [open, setOpen] = useState<boolean>(false);

	const resetFilter = () => {
		setKeyword('');
		setStatus(null);
		setTypeDate(TYPE_DATE.ALL);
		setDate(null);
	};

	return (
		<Fragment>
			<FlexLayout column gap-12>
				<Header
					title='Thống kê tổng quan'
					actions={
						<FlexLayout row gap-6>
							<Button icon={<AddCircle />} p_8_24 rounded_40 bright-cyan bold onClick={() => setOpen(true)}>
								Thêm mới
							</Button>
						</FlexLayout>
					}
				/>

				<Breadcrumb
					listUrls={[
						{
							title: 'Danh sách căn hộ',
							path: PATH.Home,
						},
						{
							path: '',
							title: 'Chi tiết căn hộ',
						},
					]}
					actions={
						<FlexLayout row gap-6>
							<Button p_8_24 rounded_8 white bold>
								Hủy bỏ
							</Button>
							<Button p_8_24 rounded_8 bright-cyan bold>
								Lưu lại
							</Button>
						</FlexLayout>
					}
				/>

				<WrapperForm title='Thông tin căn hộ' actions={<p>Thêm loại phòng</p>}>
					Main Form
				</WrapperForm>

				<WrapperForm title='Danh sách phòng trong căn hộ' actions={<p>Thêm loại phòng</p>}>
					Main Form
				</WrapperForm>

				<SearchBlock
					keyword={keyword}
					setKeyword={setKeyword}
					placeholder='Tìm kiếm theo họ tên, email, số điện thoại'
					action={
						<FlexLayout row gap-8 fit-height>
							<FlexItem flex-1 overflow-y scrollbar>
								<FlexLayout row gap-8>
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
									<FilterDateRange date={date} setDate={setDate} typeDate={typeDate} setTypeDate={setTypeDate} />
								</FlexLayout>
							</FlexItem>
							<FlexLayout row gap-8>
								<Button p_8_24 black rounded_24 bold onClick={resetFilter}>
									Đặt lại
								</Button>
							</FlexLayout>
						</FlexLayout>
					}
				/>
				<FlexItem flex-1 overflow-x>
					<MainTable>
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
												{row.name} - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab minus, asperiores
												dolores, non consequatur obcaecati voluptatibus reprehenderit laudantium sapiente minima
												magnam fugit iure? Eos, quas. Impedit quod earum asperiores harum.
											</>
										),
									},
									{
										title: 'Aptomat',
										render: (row, _) => <SwitchButton checkOn={row.uuid == '1'} />,
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

						<Pagination
							page={page}
							onSetPage={setPage}
							pageSize={pageSize}
							onSetPageSize={setPageSize}
							total={100}
							dependencies={[keyword, status]}
						/>
					</MainTable>
				</FlexItem>
			</FlexLayout>

			<PositionContainer open={open} onClose={() => setOpen(false)}>
				<MainDetail />
			</PositionContainer>
		</Fragment>
	);
}

export default MainHome;

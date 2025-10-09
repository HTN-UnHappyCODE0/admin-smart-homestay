import {Fragment, useState} from 'react';
import styles from './MainPageApartment.module.scss';
import {PropsMainPageApartment} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Header from '~/components/utils/Header';
import Button from '~/components/common/Button';
import {AddCircle, Edit, Eye, Lock} from 'iconsax-react';
import SearchBlock from '~/components/utils/SearchBlock';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import FilterCustom from '~/components/common/FilterCustom';
import {TYPE_DATE} from '~/constants/config/enum';
import MainTable from '~/components/utils/MainTable';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import SwitchButton from '~/components/common/SwitchButton';
import StateActive from '~/components/utils/StateActive';
import IconActionTable from '~/components/utils/IconActionTable';
import Pagination from '~/components/common/Pagination';

function MainPageApartment({}: PropsMainPageApartment) {
	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [keyword, setKeyword] = useState<string>('');
	const [status, setStatus] = useState<number | null>(null);
	const [statusDevice, setStatusDevice] = useState<number | null>(null);
	const [area, setArea] = useState<number | null>(null);
	const [province, setProvince] = useState<string>('');
	const [ward, setWard] = useState<string>('');
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
					title='Danh sách căn hộ'
					actions={
						<FlexLayout row gap-6>
							<Button icon={<AddCircle />} p_8_24 rounded_40 bright-cyan bold onClick={() => setOpen(true)}>
								Thêm mới
							</Button>
						</FlexLayout>
					}
				/>

				<SearchBlock
					keyword={keyword}
					setKeyword={setKeyword}
					placeholder='Tìm kiếm theo mã, tên danh mục'
					action={
						<FlexLayout row gap-8 fit-height>
							<FlexItem flex-1 overflow-y scrollbar>
								<FlexLayout row gap-8>
									<FilterCustom
										name='Trạng thái căn hộ'
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

									<FilterCustom
										name='Trạng thái thiết bị'
										value={statusDevice}
										setValue={setStatusDevice}
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

									<FilterCustom
										name='Diện tích'
										value={area}
										setValue={setArea}
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

									<FilterCustom
										name='Tỉnh'
										value={province}
										setValue={setProvince}
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

									<FilterCustom
										name='Xã'
										value={ward}
										setValue={setWard}
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
							<Table<{
								uuid: string;
								code: string;
								typeApartment: string;
								lockCode: string;
								name: string;
								area: number;
								province: string;
								ward: string;
								viewRequest1: number;
								viewRequest2?: number;
								rentPrice?: number;
								advertisingPrice?: number;
							}>
								rowKey={(row) => row.uuid}
								data={[
									{
										uuid: '1',
										code: 'MH24040',
										typeApartment: 'Chung cư mini',
										lockCode: '245502',
										name: 'Căn hộ số 1',
										area: 45,
										province: 'Hà Nội',
										ward: 'Phường A',
										viewRequest1: 5,
										viewRequest2: 1,
										rentPrice: 5000000,
										advertisingPrice: 1000000,
									},
									{
										uuid: '2',
										code: 'MH24041',
										typeApartment: 'Chung cư mini',
										lockCode: '245502',
										name: 'Căn hộ số 2',
										area: 50,
										province: 'Hà Nội',
										ward: 'Phường B',
										viewRequest1: 2,
										viewRequest2: 0,
										rentPrice: 6000000,
										advertisingPrice: 2000000,
									},
									{
										uuid: '3',
										code: 'MH24042',
										typeApartment: 'Chung cư mini',
										lockCode: '245502',
										name: 'Căn hộ số 3',
										area: 60,
										province: 'Hà Nội',
										ward: 'Phường C',
										viewRequest1: 3,
										viewRequest2: 1,
										rentPrice: 7000000,
										advertisingPrice: 3000000,
									},
								]}
								fixedHeader={true}
								column={[
									{
										title: 'STT',
										fixedLeft: true,
										render: (_, index) => <>{index + 1}</>,
									},
									{
										title: 'Mã căn hộ',
										render: (row, _) => <>{row.code}</>,
									},
									{
										title: 'Loại hình căn hộ',
										render: (row, _) => <>{row.typeApartment}</>,
									},
									{
										title: 'ID ổ khóa',
										render: (row, _) => <>{row.lockCode}</>,
									},
									{
										title: 'Tên căn hộ',
										render: (row, _) => <>{row.name}</>,
									},
									{
										title: 'Diện tích (m2)',
										render: (row, _) => <>{row.area}</>,
									},
									{
										title: 'Địa chỉ (Tỉnh - xã)',
										render: (row, _) => (
											<>
												{row.province} - {row.ward}
											</>
										),
									},
									{
										title: 'Yêu cầu xem căn hộ',
										render: (row, _) => <>{row.viewRequest1}</>,
									},
									{
										title: 'Yêu cầu xử lý sự cố',
										render: (row, _) => <>{row.viewRequest2}</>,
									},
									{
										title: 'Giá cho thuê (VND)',
										render: (row, _) => <>{row.rentPrice}</>,
									},
									{
										title: 'Giá quảng cáo(VND)',
										render: (row, _) => <>{row.advertisingPrice}</>,
									},
									{
										title: 'Aptomat',
										render: (row, _) => <SwitchButton checkOn={row.uuid == '1'} />,
									},
									{
										title: 'Đồng hồ nước',
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
		</Fragment>
	);
}

export default MainPageApartment;

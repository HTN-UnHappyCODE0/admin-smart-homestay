import LayoutMainPage from '~/components/layouts/LayoutMainPage';
import styles from './MainCostType.module.scss';
import {PropsMainCostType} from './interfaces';
import {tabsCatalogs} from '~/constants/config/data';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import {AddCircle, Edit, Eye, Lock} from 'iconsax-react';
import {useState} from 'react';
import SearchBlock from '~/components/utils/SearchBlock';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import FilterCustom from '~/components/common/FilterCustom';
import MainTable from '~/components/utils/MainTable';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import StateActive from '~/components/utils/StateActive';
import IconActionTable from '~/components/utils/IconActionTable';
import PositionContainer from '~/components/common/PositionContainer';
import {useRouter} from 'next/router';
import FormCreateCostType from '../FormCreateCostType';
import FormDetailRoomType from '../FormDetailRoomType';
import FormDetailCostType from '../FormDetailCostType';

function MainCostType({}: PropsMainCostType) {
	const router = useRouter();
	const [keyword, setKeyword] = useState<string>('');
	const [status, setStatus] = useState<number | null>(null);

	const resetFilter = () => {
		setKeyword('');
		setStatus(null);
	};

	const {_open, _uuid} = router.query;

	return (
		<LayoutMainPage
			title='Quản lý danh mục'
			tabs={tabsCatalogs}
			actions={
				<FlexLayout row gap-6>
					<Button
						icon={<AddCircle />}
						p_8_24
						rounded_40
						bright-cyan
						bold
						onClick={() =>
							router.replace({
								pathname: router.pathname,
								query: {
									...router.query,
									_open: 'create',
								},
							})
						}
					>
						Thêm mới
					</Button>
				</FlexLayout>
			}
		>
			<FlexLayout column gap-12>
				<SearchBlock
					keyword={keyword}
					setKeyword={setKeyword}
					placeholder='Tìm kiếm theo tên loại chi phí'
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
						<DataWrapper data={[1]} loading={false} title='Dữ liệu trống' note='Danh mục loại chi phí hiện đang trống!'>
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
										title: 'Tên loại chi phí',
										render: (row, _) => <>{row?.name}</>,
									},
									{
										title: 'Ghi chú',
										render: (row, _) => <>{row?.name}</>,
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
										title: 'Hành động',
										fixedRight: true,
										render: (row, _) => (
											<FlexLayout row>
												<IconActionTable
													icon={<Eye color='#292D32' size={24} />}
													onClick={() =>
														router.replace({
															pathname: router.pathname,
															query: {
																...router.query,
																_uuid: row?.uuid,
															},
														})
													}
													tooltip='Xem chi tiết'
												/>
												<IconActionTable icon={<Lock color='#292D32' size={24} />} tooltip='Khóa' />
												<IconActionTable icon={<Edit color='#292D32' size={24} />} tooltip='Chỉnh sửa' />
											</FlexLayout>
										),
									},
								]}
							/>
						</DataWrapper>
					</MainTable>
				</FlexItem>
			</FlexLayout>
			<PositionContainer
				open={_open == 'create'}
				onClose={() => {
					const {_open, ...rest} = router.query;

					router.replace({
						pathname: router.pathname,
						query: {
							...rest,
						},
					});
				}}
			>
				<FormCreateCostType />
			</PositionContainer>
			<PositionContainer
				open={!!_uuid}
				onClose={() => {
					const {_uuid, ...rest} = router.query;

					router.replace({
						pathname: router.pathname,
						query: {
							...rest,
						},
					});
				}}
			>
				<FormDetailCostType />
			</PositionContainer>
		</LayoutMainPage>
	);
}

export default MainCostType;

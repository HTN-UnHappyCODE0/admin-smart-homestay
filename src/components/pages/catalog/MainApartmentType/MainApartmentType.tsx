import LayoutMainPage from '~/components/layouts/LayoutMainPage';
import styles from './MainApartmentType.module.scss';
import {IApartmentType, PropsMainApartmentType} from './interfaces';
import {statusConfigs, tabsCatalogs} from '~/constants/config/data';
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
import FormCreateApartmentType from '../FormCreateApartmentType';
import FormDetailApartmentType from '../FormDetailApartmentType';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import apartmentTypeServices from '~/services/apartmentTypeServices';

function MainApartmentType({}: PropsMainApartmentType) {
	const router = useRouter();
	const [keyword, setKeyword] = useState<string>('');
	const [status, setStatus] = useState<number | null>(null);

	const resetFilter = () => {
		setKeyword('');
		setStatus(null);
	};

	const {_open, _uuid} = router.query;

	const {data: apartmentTypes = [], isLoading} = useQuery<IApartmentType[]>([QUERY_KEY.table_apartment_type, keyword, status], {
		queryFn: () =>
			httpRequest({
				http: apartmentTypeServices.getListApartmentType({
					keyword: keyword,
					status: status,
				}),
			}),
		select(data) {
			return data;
		},
	});

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
					placeholder='Tìm kiếm theo tên danh mục'
					action={
						<FlexLayout row gap-8 fit-height>
							<FlexItem flex-1 overflow-y scrollbar>
								<FlexLayout row gap-8>
									<FilterCustom
										name='Trạng thái'
										value={status}
										setValue={setStatus}
										listOption={statusConfigs?.map((v) => ({
											uuid: v?.state,
											name: v?.text,
										}))}
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
						<DataWrapper
							data={apartmentTypes}
							loading={isLoading}
							title='Dữ liệu trống!'
							note='Danh mục loại hình căn hộ hiện đang trống!'
						>
							<Table<IApartmentType>
								rowKey={(row) => row.uuid}
								data={apartmentTypes}
								fixedHeader={true}
								column={[
									{
										title: 'STT',
										fixedLeft: true,
										render: (_, index) => <>{index + 1}</>,
									},
									{
										title: 'Tên loại hình căn hộ',
										render: (row, _) => <>{row?.name}</>,
									},
									{
										title: 'Ghi chú',
										render: (row, _) => <>{row?.name}</>,
									},
									{
										title: 'Trạng thái',
										render: (row, _) => <StateActive stateActive={row?.status} listState={statusConfigs} />,
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
				<FormCreateApartmentType />
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
				<FormDetailApartmentType />
			</PositionContainer>
		</LayoutMainPage>
	);
}

export default MainApartmentType;

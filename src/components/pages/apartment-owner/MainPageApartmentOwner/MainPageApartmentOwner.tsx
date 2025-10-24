import {Fragment, useState} from 'react';
import styles from './MainPageApartmentOwner.module.scss';
import {IApartmentOwner, PropsMainPageApartmentOwner} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Header from '~/components/utils/Header';
import Button from '~/components/common/Button';
import {AddCircle, Edit, Eye} from 'iconsax-react';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import SearchBlock from '~/components/utils/SearchBlock';
import MainTable from '~/components/utils/MainTable';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import IconActionTable from '~/components/utils/IconActionTable';
import {PATH} from '~/constants/config';
import {useQuery} from '@tanstack/react-query';
import {CONFIG_PAGING, CONFIG_TYPE_FIND, QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import {useRouter} from 'next/router';
import PositionContainer from '~/components/common/PositionContainer';
import FormCreateApartmentOwner from '../FormCreateApartmentOwner';
import Pagination from '~/components/common/Pagination';
import DetailApartmentOwner from '../DetailApartmentOwner';
import userServices from '~/services/userServices';

function MainPageApartmentOwner({}: PropsMainPageApartmentOwner) {
	const router = useRouter();

	const {_open, _uuid, _uuidUpdate} = router.query;

	const [keyword, setKeyword] = useState<string>('');
	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);

	const {
		data = {
			items: [],
			pagination: {
				totalCount: 0,
				totalPage: 0,
			},
		},
		isLoading,
	} = useQuery<{
		items: IApartmentOwner[];
		pagination: {
			totalCount: number;
			totalPage: number;
		};
	}>([QUERY_KEY.table_apartment_owner, page, pageSize, keyword], {
		queryFn: () =>
			httpRequest({
				http: userServices.getUsers({
					isPaging: CONFIG_PAGING.IS_PAGING,
					typeFinding: 5,
					status: STATUS_CONFIG.ACTIVE,
					page: page,
					pageSize: pageSize,
					keyword: keyword,
					hasRented: null,
					type: 10,
					userUuid: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	return (
		<Fragment>
			<FlexLayout column gap-12>
				<Header
					title='Chủ căn hộ'
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
				/>

				<SearchBlock keyword={keyword} setKeyword={setKeyword} placeholder='Tìm kiếm theo tên chủ căn hộ' />

				<FlexItem flex-1 overflow-x>
					<MainTable>
						<DataWrapper
							data={data.items || []}
							loading={isLoading}
							title='Căn hộ trống!'
							note='Danh sách căn hộ hiện đang trống!'
						>
							<Table<IApartmentOwner>
								rowKey={(row) => row.uuid}
								data={data.items || []}
								fixedHeader={true}
								column={[
									{
										title: 'STT',
										fixedLeft: true,
										render: (_, index) => <>{index + 1}</>,
									},
									{
										title: 'Tên chủ căn hộ',
										render: (row, _) => <>{row?.name || '---'}</>,
									},
									{
										title: 'Căn hộ sở hữu',
										render: (row, _) => <>{row?.numApartment || '---'}</>,
									},
									{
										title: 'Số điện thoại',
										render: (row, _) => <>{row?.phoneNumber || '---'}</>,
									},
									{
										title: 'Ghi chú',
										render: (row, _) => <>{row?.description || '---'}</>,
									},

									{
										title: 'Hành động',
										fixedRight: true,
										render: (row, _) => (
											<FlexLayout row>
												<IconActionTable
													icon={<Eye size={24} />}
													tooltip='Xem chi tiết'
													onClick={() =>
														router.replace({
															pathname: router.pathname,
															query: {
																...router.query,
																_uuid: row?.uuid,
															},
														})
													}
												/>

												<IconActionTable icon={<Edit size={24} />} tooltip='Chỉnh sửa' />
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
							total={data?.pagination.totalCount || 0}
							dependencies={[pageSize, keyword]}
						/>
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
				<FormCreateApartmentOwner
					onClose={() => {
						const {_open, ...rest} = router.query;

						router.replace({
							pathname: router.pathname,
							query: {
								...rest,
							},
						});
					}}
				/>
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
				<DetailApartmentOwner
					onClose={() => {
						const {_uuid, ...rest} = router.query;

						router.replace({
							pathname: router.pathname,
							query: {
								...rest,
							},
						});
					}}
				/>
			</PositionContainer>
		</Fragment>
	);
}

export default MainPageApartmentOwner;

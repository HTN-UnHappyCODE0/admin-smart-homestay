import {Fragment, useState} from 'react';
import styles from './DetailFurniture.module.scss';
import {IDetailFurniture, IListoffurnishedapartments, PropsDetailFurniture} from './interfaces';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import {ContextForm} from '~/components/common/Form';
import WrapperForm from '~/components/utils/WrapperForm';
import GridColumn from '~/components/layouts/GridColumn';
import InfoDetail from '~/components/utils/InfoDetail';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import Moment from 'react-moment';
import {useQuery} from '@tanstack/react-query';
import {CONFIG_PAGING, QUERY_KEY, TYPE_DATE} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import furnitureServices from '~/services/furnitureServices';
import {useRouter} from 'next/router';
import StateActive from '~/components/utils/StateActive';
import test from 'node:test';
import {text} from 'stream/consumers';
import {statusConfigs, statusFurniture} from '~/constants/config/data';

function DetailFurniture({onClose}: PropsDetailFurniture) {
	const router = useRouter();

	const {_uuid} = router.query;

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [type, setType] = useState<number | null>(null);
	const [typeDate, setTypeDate] = useState<TYPE_DATE>(TYPE_DATE.THIS_MONTH);
	const [date, setDate] = useState<{from: Date | null; to: Date | null} | null>(null);

	const {data: furniture} = useQuery<IDetailFurniture>([QUERY_KEY.detail_furniture, _uuid], {
		queryFn: () =>
			httpRequest({
				http: furnitureServices.furnitureDetail({uuid: _uuid as string}),
			}),

		select(data) {
			return data;
		},
		enabled: !!_uuid,
	});

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
		items: IListoffurnishedapartments[];
		pagination: {
			totalCount: number;
			totalPage: number;
		};
	}>([QUERY_KEY.table_detail_furniture, page, pageSize, _uuid], {
		queryFn: () =>
			httpRequest({
				http: furnitureServices.apartmentUsing({
					keyword: '',
					isPaging: CONFIG_PAGING.IS_PAGING,
					page: page,
					pageSize: pageSize,
					uuid: _uuid as string,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_uuid,
	});

	return (
		<Fragment>
			<WrapperFormPostion
				width={1000}
				title='Chi tiết nội thất'
				actions={
					<FlexLayout row gap-8>
						<Button p_8_24 rounded_8 white bold onClick={onClose}>
							Hủy bỏ
						</Button>
						<ContextForm.Consumer>
							{({isDone}) => (
								<Button disable={!isDone} p_8_24 rounded_8 bright-cyan bold>
									Chỉnh sửa
								</Button>
							)}
						</ContextForm.Consumer>
					</FlexLayout>
				}
			>
				<WrapperForm title='Thông tin nội thất'>
					<GridColumn col_3>
						<InfoDetail name='Tên nội thất' value={furniture?.name || '--'} />
						<InfoDetail name='Số lượng' value={furniture?.using || '--'} textColor='#1F5FFF' />
						<InfoDetail name='Ngày bổ sung' value={<Moment date={furniture?.lastAdded} format='HH:mm, DD/MM/YYYY' />} />
						<InfoDetail name='Ghi chú' value={furniture?.description || '--'} />
					</GridColumn>
				</WrapperForm>
				<WrapperForm title='Danh sách căn hộ sử dụng nội thất'>
					<FlexLayout column gap-12>
						<FlexItem flex-1 overflow-x>
							<DataWrapper
								data={data?.items || []}
								loading={false}
								title='Dữ liệu trống!'
								note='Danh sách căn hộ sử dụng nội thất hiện đang trống!'
							>
								<Table<IListoffurnishedapartments>
									rowKey={(row) => row.uuid}
									data={data?.items || []}
									fixedHeader={true}
									column={[
										{
											title: 'STT',
											fixedLeft: true,
											render: (_, index) => <>{index + 1}</>,
										},

										{
											title: 'Tên căn hộ',
											render: (row, _) => <>{row?.apartmentUu?.name || '---'}</>,
										},
										{
											title: 'Địa chỉ',
											render: (row, _) => <>{row?.apartmentUu?.address || '---'}</>,
										},
										{
											title: 'Số lượng',
											render: (row, _) => <>{row?.count || '---'}</>,
										},
										{
											title: 'Ngày bổ sung',
											render: (row, _) => <Moment date={row?.lastAdded} format='HH:mm, DD/MM/YYYY' />,
										},
										{
											title: 'Trạng thái',
											render: (row, _) => <StateActive stateActive={row?.status} listState={statusFurniture} />,
										},
									]}
								/>
							</DataWrapper>
						</FlexItem>
					</FlexLayout>
				</WrapperForm>
			</WrapperFormPostion>
		</Fragment>
	);
}

export default DetailFurniture;

import {Fragment, useState} from 'react';
import styles from './DetailApartmentOwner.module.scss';
import {IApartmentOwner, IDetailApartmentOwner, PropsDetailApartmentOwner} from './interfaces';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import {ContextForm} from '~/components/common/Form';
import WrapperForm from '~/components/utils/WrapperForm';
import GridColumn from '~/components/layouts/GridColumn';
import InfoDetail from '~/components/utils/InfoDetail';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import userServices from '~/services/userServices';
import Pagination from '~/components/common/Pagination';
import IconActionTable from '~/components/utils/IconActionTable';
import {Eye} from 'iconsax-react';
import {getDetailAddress} from '~/common/funcs/optionConvert';

function DetailApartmentOwner({onClose}: PropsDetailApartmentOwner) {
	const router = useRouter();
	const {_uuid} = router.query;

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);

	const {data: apartmentOwner, isLoading} = useQuery<IDetailApartmentOwner>([QUERY_KEY.detail_apartment_owner, _uuid], {
		queryFn: () =>
			httpRequest({
				http: userServices.getApartmentOwnersDetail({uuid: _uuid as string}),
			}),

		select(data) {
			return data;
		},
		enabled: !!_uuid,
	});

	return (
		<Fragment>
			<WrapperFormPostion
				width={1200}
				title='Chi tiết chủ căn hộ'
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
				<WrapperForm title='Thông tin chủ căn hộ'>
					<GridColumn col_3>
						<InfoDetail name='Tên chủ căn hộ' value={apartmentOwner?.name || '---'} />
						<InfoDetail name='Số điện thoại' value={apartmentOwner?.phoneNumber || '---'} />
						<InfoDetail name='Số căn hộ' value={apartmentOwner?.numApartment || '0'} />
						<InfoDetail name='Số tài khoản' value={apartmentOwner?.bankInfos?.[0]?.bankNumber || '---'} />
						<InfoDetail name='Tên chủ tài khoản' value={apartmentOwner?.bankInfos?.[0]?.bankAccount || '---'} />
						<InfoDetail name='Ngân hàng' value={apartmentOwner?.bankInfos?.[0]?.bankName || '---'} />
						<InfoDetail name='Ghi chú' value={apartmentOwner?.description || '---'} />
					</GridColumn>
				</WrapperForm>

				<WrapperForm title='Danh sách căn hộ'>
					<FlexLayout column gap-12>
						<FlexItem flex-1 overflow-x>
							<DataWrapper
								data={apartmentOwner?.apartmentOwnerUus || []}
								loading={isLoading}
								title='Dữ liệu trống!'
								note='Danh sách căn hộ hiện đang trống!'
							>
								<Table<IApartmentOwner>
									rowKey={(row) => row.uuid}
									data={apartmentOwner?.apartmentOwnerUus || []}
									fixedHeader={true}
									column={[
										{
											title: 'STT',
											fixedLeft: true,
											render: (_, index) => <>{index + 1}</>,
										},

										{
											title: 'Tên căn hộ',
											render: (row, _) => <>{row?.name || '---'}</>,
										},
										{
											title: 'Địa chỉ',
											render: (row, _) => (
												<>
													{getDetailAddress({
														address: row?.address!,
														wardName: row?.ward?.fullName,
														provinceName: row?.province?.fullName,
														districtName: '',
													})}
												</>
											),
										},

										{
											title: 'Hành động',
											render: (row, _) => (
												<FlexLayout row>
													<IconActionTable icon={<Eye color='#303229ff' size={24} />} tooltip='Xem chi tiết' />
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
								total={0}
								dependencies={[pageSize, _uuid]}
							/>
						</FlexItem>
					</FlexLayout>
				</WrapperForm>
			</WrapperFormPostion>
		</Fragment>
	);
}

export default DetailApartmentOwner;

import {useRouter} from 'next/router';
import styles from './DetailGuestTenant.module.scss';
import {IDetailGuestTenant, IGuestContract, PropsDetailGuestTenant} from './interfaces';
import {useState} from 'react';
import {CONFIG_PAGING, CONFIG_TYPE_FINDING, QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import StateActive from '~/components/utils/StateActive';
import Moment from 'react-moment';
import WrapperForm from '~/components/utils/WrapperForm';
import InfoDetail from '~/components/utils/InfoDetail';
import GridColumn from '~/components/layouts/GridColumn';
import Image from 'next/image';
import Pagination from '~/components/common/Pagination';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import Link from 'next/link';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import guestTenantServices from '~/services/guestTenantServices';
import {httpRequest} from '~/services';
import {statusConfigs} from '~/constants/config/data';
import contractServices from '~/services/contractServices';
import userServices from '~/services/userServices';
import accountServices from '~/services/accountServices';
import Dialog from '~/components/common/Dialog';
import {Warning2} from 'iconsax-react';
import PositionContainer from '~/components/common/PositionContainer';
import FormUpdateGuestTenant from '../FormUpdateGuestTenant';

function DetailGuestTenant({onClose}: PropsDetailGuestTenant) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuidDetail, _uuidUpdate} = router.query;

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [uuidReset, setUuidReset] = useState<string>('');
	const [dataChangeStatus, setDataChangeStatus] = useState<{uuid: string; status: number} | null>(null);

	const {data: guestTenantDetail} = useQuery<IDetailGuestTenant>([QUERY_KEY.detail_guest_tenant, _uuidDetail], {
		queryFn: () =>
			httpRequest({
				http: guestTenantServices.getDetailGuest({uuid: _uuidDetail as string}),
			}),

		select(data) {
			return data;
		},
		enabled: !!_uuidDetail,
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
		items: IGuestContract[];
		pagination: {
			totalCount: number;
			totalPage: number;
		};
	}>([QUERY_KEY.detail_guest_tenant, page, pageSize, _uuidDetail], {
		queryFn: () =>
			httpRequest({
				http: contractServices.getListContracts({
					keyword: '',
					isPaging: CONFIG_PAGING.IS_PAGING,
					typeFinding: CONFIG_TYPE_FINDING.CATALOG,
					page: page,
					pageSize: pageSize,
					renterUuid: _uuidDetail as string,
					apartmentUuid: '',
					status: null,
				}),
			}),
		enabled: !!_uuidDetail,
		select(data) {
			return data;
		},
	});

	const funcChangeStatus = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageSuccess: true,
				showMessageFailed: true,
				msgSuccess:
					dataChangeStatus?.status == STATUS_CONFIG.ACTIVE
						? 'Khóa tài khoản khách thuê thành công!'
						: 'Mở khóa tài khoản khách thuê thành công!',
				http: userServices.changeStatus({
					uuid: dataChangeStatus?.uuid!,
					status: dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? STATUS_CONFIG.LOCKED : STATUS_CONFIG.ACTIVE,
					description: '',
				}),
			}),
		onSuccess(data) {
			if (data) {
				setDataChangeStatus(null);
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.detail_guest_tenant],
				});
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_guest_tenant],
				});
			}
		},
	});

	const funcResetPassword = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageSuccess: true,
				showMessageFailed: true,
				msgSuccess: 'Reset mật khẩu thành công!',
				http: accountServices.superResetPassword({
					userUuid: uuidReset,
					confirmNewPassword: '',
					newPassword: '',
				}),
			}),
		onSuccess(data) {
			if (data) {
				setUuidReset('');
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.detail_guest_tenant],
				});
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_guest_tenant],
				});
			}
		},
	});

	return (
		<WrapperFormPostion
			width={1200}
			title='Chi tiết tài khoản khách thuê'
			actions={
				<FlexLayout row gap-8>
					<Button p_8_24 rounded_8 white bold onClick={onClose}>
						Đóng
					</Button>
					<Button p_8_24 rounded_8 black bold onClick={() => setUuidReset(_uuidDetail as string)}>
						Reset mật khẩu
					</Button>
					{guestTenantDetail?.status === STATUS_CONFIG.ACTIVE && (
						<Button
							p_8_24
							rounded_8
							red
							bold
							onClick={() =>
								setDataChangeStatus({
									uuid: _uuidDetail as string,
									status: STATUS_CONFIG.ACTIVE,
								})
							}
						>
							Khóa tài khoản
						</Button>
					)}
					{guestTenantDetail?.status === STATUS_CONFIG.LOCKED && (
						<Button
							p_8_24
							rounded_8
							green
							bold
							onClick={() =>
								setDataChangeStatus({
									uuid: _uuidDetail as string,
									status: STATUS_CONFIG.LOCKED,
								})
							}
						>
							Mở khóa tài khoản
						</Button>
					)}
					<Button
						p_8_24
						rounded_8
						blue
						bold
						onClick={() => {
							router.replace({
								pathname: router.pathname,
								query: {
									...router.query,
									_uuidUpdate: _uuidDetail,
								},
							});
						}}
					>
						Chỉnh sửa
					</Button>
				</FlexLayout>
			}
			nodes={
				<FlexLayout row gap-8 items-center>
					<p className={styles.text}>Trạng thái tài khoản:</p>
					<StateActive isSmall={true} stateActive={guestTenantDetail?.status!} listState={statusConfigs} />
				</FlexLayout>
			}
		>
			<WrapperForm title='Thông tin tài khoản'>
				<GridColumn col_3>
					<InfoDetail name='Tên tài khoản' value={guestTenantDetail?.userName || '---'} />
					<InfoDetail name='Số điện thoại' value={guestTenantDetail?.phoneNumber || '---'} />
					<InfoDetail name='Email' value={guestTenantDetail?.email || '---'} />
					<InfoDetail name='Ghi chú' value={guestTenantDetail?.description || '---'} />
				</GridColumn>
			</WrapperForm>

			<WrapperForm title='Thông tin CMND/CCCD'>
				<GridColumn col_3>
					<InfoDetail name='Số CMND/CCCD' value={guestTenantDetail?.identification?.identityNumber || '---'} />
					<InfoDetail name='Nơi cấp' value={guestTenantDetail?.identification?.issuedPlace || '---'} />
					<InfoDetail name='Ngày cấp' value={guestTenantDetail?.identification?.issuedDate || '---'} />
					<InfoDetail
						name='Ảnh mặt trước'
						value=''
						actions={
							<Image
								src={`${process.env.NEXT_PUBLIC_IMAGE}/${guestTenantDetail?.identification?.idFrontImage}`}
								alt='Ảnh mặt trước'
								width={368}
								height={216}
								style={{borderRadius: '8px'}}
							/>
						}
					/>

					<InfoDetail
						name='Ảnh mặt sau'
						value=''
						actions={
							<Image
								src={`${process.env.NEXT_PUBLIC_IMAGE}/${guestTenantDetail?.identification?.idBackImage}`}
								alt='Ảnh mặt sau'
								width={368}
								height={216}
								style={{borderRadius: '8px'}}
							/>
						}
					/>
				</GridColumn>
			</WrapperForm>

			<WrapperForm title='Danh sách hợp đồng'>
				<FlexLayout column gap-12>
					<FlexItem flex-1 overflow-x>
						<DataWrapper data={data?.items || []} loading={isLoading} title='Dữ liệu trống!' note='Dữ liệu hiện đang trống!'>
							<Table<IGuestContract>
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
										title: 'Mã hợp đồng',
										render: (row, _) => (
											<Link href={'#'} className={styles.link}>
												{row?.code}
											</Link>
										),
									},
									{
										title: 'Ngày bắt đầu',
										render: (row, _) => <Moment date={row?.from} format='HH:mm, DD/MM/YYYY' />,
									},
									{
										title: 'Ngày gia hạn tiếp theo',
										render: (row, _) => <Moment date={row?.to} format='HH:mm, DD/MM/YYYY' />,
									},
									{
										title: 'Trạng thái hợp đồng',
										render: (row, _) => <StateActive stateActive={row?.status} listState={statusConfigs} />,
									},
								]}
							/>
						</DataWrapper>

						<Pagination
							page={page}
							onSetPage={setPage}
							pageSize={pageSize}
							onSetPageSize={setPageSize}
							total={data?.pagination?.totalCount || 0}
							dependencies={[pageSize, _uuidDetail]}
						/>
					</FlexItem>
				</FlexLayout>
			</WrapperForm>

			<Dialog
				open={!!dataChangeStatus}
				type={dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? 'error' : 'primary'}
				backgroundIconColor={dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? '#ffdce4' : '#b5f4d4ff'}
				borderIconColor={dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? '#fff0f3' : '#d6f6e6ff'}
				title={dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? 'Khoá tài khoản khách thuê' : 'Mở khóa tài khoản khách thuê'}
				note={
					dataChangeStatus?.status == STATUS_CONFIG.ACTIVE
						? 'Bạn có chắc chắn muốn khóa tài khoản khách thuê không?'
						: 'Bạn có chắc chắn muốn mở khóa tài khoản khách thuê không?'
				}
				icon={
					dataChangeStatus?.status == STATUS_CONFIG.ACTIVE ? (
						<Warning2 size='28' color='#EE0033' />
					) : (
						<Warning2 size='28' color='#25C173' />
					)
				}
				onClose={() => setDataChangeStatus(null)}
				onSubmit={funcChangeStatus.mutate}
			/>

			<Dialog
				open={!!uuidReset}
				type='error'
				backgroundIconColor='#ffdce4'
				borderIconColor='#fff0f3'
				title='Reset mật khẩu'
				note={
					<span>
						Bạn có chắc chắn muốn reset mật khẩu tài khoản khách thuê? <br />
						Reset mật khẩu tài khoản khách thuê sẽ không ảnh hưởng đến mật khẩu của bạn.
					</span>
				}
				icon={<Warning2 size='28' color='#EE0033' />}
				onClose={() => setUuidReset('')}
				onSubmit={funcResetPassword.mutate}
			/>

			<PositionContainer
				open={!!_uuidUpdate}
				onClose={() => {
					const {_uuidUpdate, ...rest} = router.query;

					router.replace({
						pathname: router.pathname,
						query: {
							...rest,
						},
					});
				}}
			>
				<FormUpdateGuestTenant
					onClose={() => {
						const {_uuidUpdate, ...rest} = router.query;

						router.replace({
							pathname: router.pathname,
							query: {
								...rest,
							},
						});
					}}
				/>
			</PositionContainer>
		</WrapperFormPostion>
	);
}

export default DetailGuestTenant;

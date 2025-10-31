import {Fragment, useState} from 'react';
import styles from './DetailEmployeeProfile.module.scss';
import {IApartmentManager, IDetailEmployeeProfile, PropsDetailEmployeeProfile} from './interfaces';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import WrapperForm from '~/components/utils/WrapperForm';
import GridColumn from '~/components/layouts/GridColumn';
import InfoDetail from '~/components/utils/InfoDetail';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import IconActionTable from '~/components/utils/IconActionTable';
import {Eye, Warning2} from 'iconsax-react';
import {useRouter} from 'next/router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {QUERY_KEY, STATE_ACCOUNT, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import userServices from '~/services/userServices';
import {roleAccounts, stateAccounts, statusConfigs} from '~/constants/config/data';
import {getDetailAddress} from '~/common/funcs/optionConvert';
import StateActive from '~/components/utils/StateActive';
import Loading from '~/components/common/Loading';
import Dialog from '~/components/common/Dialog';
import {PATH} from '~/constants/config';
import Link from 'next/link';
import Tippy from '@tippyjs/react';

function DetailEmployeeProfile({onClose}: PropsDetailEmployeeProfile) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuid} = router.query;

	const [openChangeStatus, setOpenChangeStatus] = useState<boolean>(false);

	const {data: employeeProfile} = useQuery<IDetailEmployeeProfile>([QUERY_KEY.detail_employee_profile, _uuid], {
		queryFn: () =>
			httpRequest({
				http: userServices.getStaffDetail({uuid: _uuid as string}),
			}),

		select(data) {
			return data;
		},
		enabled: !!_uuid,
	});

	const funcChangeStatus = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageSuccess: true,
				showMessageFailed: true,
				msgSuccess:
					employeeProfile?.status == STATUS_CONFIG.ACTIVE ? 'Khóa nhân viên thành công!' : 'Mở khóa nhân viên thành công!',
				http: userServices.changeStatus({
					uuid: employeeProfile?.uuid!,
					status: employeeProfile?.status == STATUS_CONFIG.ACTIVE ? STATUS_CONFIG.LOCKED : STATUS_CONFIG.ACTIVE,
					description: '',
				}),
			}),
		onSuccess(data) {
			if (data) {
				setOpenChangeStatus(false);
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.detail_employee_profile],
				});
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_employee_profile],
				});
			}
		},
	});

	return (
		<Fragment>
			<Loading loading={funcChangeStatus.isLoading} />
			<WrapperFormPostion
				width={1200}
				title={`Chi tiết hồ sơ ${employeeProfile?.code || ''}`}
				nodes={
					<FlexLayout row gap-8 items-center>
						<p
							style={{
								color: '#202939',
								fontSize: '14px',
								fontWeight: '500',
							}}
						>
							Trạng thái tài khoản:
						</p>
						<StateActive
							isSmall={true}
							stateActive={!employeeProfile?.userName ? STATE_ACCOUNT.NOT_ISSUE : STATE_ACCOUNT.ISSUED}
							listState={stateAccounts}
						/>
						<p
							style={{
								color: '#202939',
								fontSize: '14px',
								fontWeight: '500',
							}}
						>
							Trạng thái hoạt động:
						</p>
						<StateActive isSmall={true} stateActive={employeeProfile?.status!} listState={statusConfigs} />
					</FlexLayout>
				}
				actions={
					<FlexLayout row gap-8>
						<Button p_8_24 rounded_8 white bold onClick={onClose}>
							Hủy bỏ
						</Button>
						<Button
							p_8_24
							rounded_8
							red={employeeProfile?.status == STATUS_CONFIG.ACTIVE}
							green={employeeProfile?.status == STATUS_CONFIG.LOCKED}
							bold
							onClick={() => setOpenChangeStatus(true)}
						>
							{employeeProfile?.status == STATUS_CONFIG.ACTIVE ? 'Khóa nhân viên' : 'Mở nhân viên'}
						</Button>
						<Button p_8_24 rounded_8 bright-cyan bold href={`${PATH.EmployeeProfile}?_uuidUpdate=${_uuid}`}>
							Chỉnh sửa
						</Button>
					</FlexLayout>
				}
			>
				<WrapperForm title='Thông tin nhân viên'>
					<GridColumn col_3>
						<InfoDetail name='Tên ' value={employeeProfile?.name} />
						<InfoDetail name='Số điện thoại' value={employeeProfile?.phoneNumber} />
						<InfoDetail name='Căn hộ quản lý' value={employeeProfile?.numApartment || '0'} />
						<InfoDetail name='Email' value={employeeProfile?.email} />
						<InfoDetail name='Tên tài khoản' value={employeeProfile?.userName} />
						<InfoDetail name='Vai trò' value={roleAccounts.find((role) => role.state == employeeProfile?.type)?.text} />
						<InfoDetail name='Ghi chú' value={employeeProfile?.description} />
					</GridColumn>
				</WrapperForm>

				<WrapperForm title='Danh sách căn hộ '>
					<FlexLayout column gap-12>
						<FlexItem flex-1 overflow-x>
							<DataWrapper
								data={employeeProfile?.apartmentManagerUus || []}
								loading={false}
								title='Dữ liệu trống!'
								note='Danh sách căn hộ hiện đang trống!'
							>
								<Table<IApartmentManager>
									rowKey={(row) => row.uuid}
									data={employeeProfile?.apartmentManagerUus || []}
									fixedHeader={true}
									column={[
										{
											title: 'STT',
											render: (_, index) => <>{index + 1}</>,
										},

										{
											title: 'Tên căn hộ',
											render: (row, _) => (
												<Tippy content='Xem chi tiết căn hộ'>
													<Link href={`${PATH.ApartmentDetail}?_uuid=${row?.uuid}`} className={styles.link}>
														{row?.name || '---'}
													</Link>
												</Tippy>
											),
										},
										{
											title: 'Tên người thuê',
											render: (row, _) => <>{row?.ownerUu?.name || '---'}</>,
										},

										{
											title: 'Địa chỉ',
											render: (row, _) => (
												<>
													{getDetailAddress({
														address: row?.address,
														provinceName: row?.province?.fullName,
														districtName: '',
														wardName: row?.ward?.fullName,
													})}
												</>
											),
										},

										{
											title: 'Hành động',
											fixedRight: true,
											render: (row, _) => (
												<FlexLayout row>
													<IconActionTable
														icon={<Eye color='#292D32' size={24} />}
														tooltip='Xem chi tiết căn hộ'
														href={`${PATH.ApartmentDetail}?_uuid=${row?.uuid}`}
													/>
												</FlexLayout>
											),
										},
									]}
								/>
							</DataWrapper>
						</FlexItem>
					</FlexLayout>
				</WrapperForm>
			</WrapperFormPostion>

			<Dialog
				open={openChangeStatus}
				type={employeeProfile?.status == STATUS_CONFIG.ACTIVE ? 'error' : 'primary'}
				backgroundIconColor={employeeProfile?.status == STATUS_CONFIG.ACTIVE ? '#ffdce4' : '#b5f4d4ff'}
				borderIconColor={employeeProfile?.status == STATUS_CONFIG.ACTIVE ? '#fff0f3' : '#d6f6e6ff'}
				title={employeeProfile?.status == STATUS_CONFIG.ACTIVE ? 'Khoá nhân viên' : 'Mở khóa nhân viên'}
				note={
					employeeProfile?.status == STATUS_CONFIG.ACTIVE
						? 'Bạn có chắc chắn muốn khóa nhân viên không?'
						: 'Bạn có chắc chắn muốn mở khóa nhân viên không?'
				}
				icon={
					employeeProfile?.status == STATUS_CONFIG.ACTIVE ? (
						<Warning2 size='28' color='#EE0033' />
					) : (
						<Warning2 size='28' color='#25C173' />
					)
				}
				onClose={() => setOpenChangeStatus(false)}
				onSubmit={funcChangeStatus.mutate}
			/>
		</Fragment>
	);
}

export default DetailEmployeeProfile;

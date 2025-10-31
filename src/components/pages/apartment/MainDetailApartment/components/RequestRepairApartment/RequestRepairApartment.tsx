import FlexLayout from '~/components/layouts/FlexLayout';
import styles from './RequestRepairApartment.module.scss';
import {IIncidentApartment, PropsRequestRepairApartment} from './interfaces';
import LayoutMainPage from '~/components/layouts/LayoutMainPage';
import Breadcrumb from '~/components/common/Breadcrumb/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button/Button';
import {statusApartmentIncidentReport, tabsDetailApartments} from '~/constants/config/data';
import {useRouter} from 'next/router';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import Search from '~/components/common/Search';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import StateActive from '~/components/utils/StateActive';
import IconActionTable from '~/components/utils/IconActionTable';
import {CloseCircle, Eye, Warning2} from 'iconsax-react';
import {useState} from 'react';
import {CONFIG_PAGING, CONFIG_TYPE_FINDING, QUERY_KEY, STATE_APARTMENT_INCIDENT_REPORTS} from '~/constants/config/enum';
import FilterCustom from '~/components/common/FilterCustom';
import WrapperForm from '~/components/utils/WrapperForm';
import {FaCircleCheck} from 'react-icons/fa6';
import Pagination from '~/components/common/Pagination';
import Dialog from '~/components/common/Dialog';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import PositionContainer from '~/components/common/PositionContainer';
import DetailRequestRepairApartment from './components/DetailRequestRepairApartment';
import Form, {TextArea} from '~/components/common/Form';
import Popup from '~/components/common/Popup';
import {httpRequest} from '~/services';
import incidentServices from '~/services/incidentServices';
import Moment from 'react-moment';
import Loading from '~/components/common/Loading';
import ConfirmRequest from './components/ConfirmRequest';

function RequestRepairApartment({}: PropsRequestRepairApartment) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuid, _uuidRequestRepair} = router.query;

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [keyword, setKeyword] = useState<string>('');
	const [status, setStatus] = useState<number | null>(null);
	const [rejectRepairApartment, setRejectRepairApartment] = useState<string>('');
	const [uuidConfirm, setUuidConfirm] = useState<string>('');

	const [form, setForm] = useState<{note: string}>({
		note: '',
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
		items: IIncidentApartment[];
		pagination: {
			totalCount: number;
			totalPage: number;
		};
	}>([QUERY_KEY.table_apartment_incident_detail, page, pageSize, keyword, status, _uuid], {
		queryFn: () =>
			httpRequest({
				http: incidentServices.getIncidentReports({
					isPaging: CONFIG_PAGING.IS_PAGING,
					typeFinding: CONFIG_TYPE_FINDING.DTO,
					page: page,
					pageSize: pageSize,
					keyword: keyword,
					status: status,
					apartmentUuid: _uuid as string,
					userUuid: '',
				}),
			}),
		select(data) {
			return data;
		},
	});

	const funcRequestRepairApartment = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageSuccess: true,
				showMessageFailed: true,
				msgSuccess: 'Từ chối yêu cầu thành công',
				http: incidentServices.acceptOrRejectIncident({
					uuid: rejectRepairApartment,
					description: '',
					status: STATE_APARTMENT_INCIDENT_REPORTS.CANCELED,
				}),
			}),
		onSuccess(data) {
			if (data) {
				setRejectRepairApartment('');
				queryClient.invalidateQueries({
					queryKey: [QUERY_KEY.table_apartment_incident_detail],
				});
			}
		},
	});

	return (
		<FlexLayout column gap-12>
			<Loading loading={funcRequestRepairApartment.isLoading} />
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
				<WrapperForm title='Danh sách yêu cầu sửa chữa'>
					<FlexLayout row gap-8 justify-space-between wrap fit-height>
						<FlexItem>
							<FlexLayout row gap-8 wrap>
								<Search keyword={keyword} setKeyword={setKeyword} />
								<FilterCustom
									name='Trạng thái sự cố'
									value={status}
									setValue={setStatus}
									listOption={statusApartmentIncidentReport.map((item) => ({
										uuid: item.state,
										name: item.text,
									}))}
								/>
							</FlexLayout>
						</FlexItem>
					</FlexLayout>

					<div style={{marginTop: '12px'}}>
						<FlexItem flex-1 overflow-x>
							<DataWrapper
								data={data?.items || []}
								loading={isLoading}
								title='Dữ liệu trống!'
								note='Danh sách dữ liệu hiện đang trống!'
							>
								<Table<IIncidentApartment>
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
											title: 'Mã yêu cầu',
											render: (row, _) => <>{row?.code || '---'}</>,
										},
										{
											title: 'Tài khoản báo sửa',
											render: (row, _) => <>{row?.userReportUu?.name || '---'}</>,
										},
										{
											title: 'Số điện thoại',
											render: (row, _) => <>{row?.userReportUu?.code || '---'}</>,
										},
										{
											title: 'Ghi chú',
											render: (row, _) => <>{row?.description || '---'}</>,
										},
										{
											title: 'Thời gian yêu cầu',
											render: (row, _) => <>{<Moment date={row?.reportDate} format='DD/MM/YYYY' />}</>,
										},
										{
											title: 'Thời gian xử lý',
											render: (row, _) => <>{<Moment date={row?.resolveDate} format='DD/MM/YYYY' />}</>,
										},
										{
											title: 'Trạng thái sự cố',
											render: (row, _) => (
												<StateActive stateActive={row?.status} listState={statusApartmentIncidentReport} />
											),
										},
										{
											title: 'Tác vụ',
											fixedRight: true,
											render: (row, _) => (
												<FlexLayout row>
													<IconActionTable
														icon={<Eye color='#292D32' size={24} />}
														tooltip='Xem chi tiết'
														onClick={() =>
															router.replace({
																pathname: router.pathname,
																query: {
																	...router.query,
																	_uuidRequestRepair: row?.uuid,
																},
															})
														}
													/>
													{row?.status === STATE_APARTMENT_INCIDENT_REPORTS.PENDING && (
														<IconActionTable
															icon={<CloseCircle color='#EE0033' size={24} />}
															tooltip='Từ chối yêu cầu'
															onClick={() => setRejectRepairApartment(row?.uuid)}
														/>
													)}

													{row?.status === STATE_APARTMENT_INCIDENT_REPORTS.PENDING && (
														<IconActionTable
															icon={<FaCircleCheck color='#00a441ff' size={24} />}
															tooltip='Xác nhận đã xử lý'
															onClick={() => setUuidConfirm(row?.uuid)}
														/>
													)}
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
								total={data?.pagination?.totalCount || 0}
								dependencies={[pageSize, keyword, status, _uuid]}
							/>
						</FlexItem>
					</div>
				</WrapperForm>
			</LayoutMainPage>

			<Dialog
				open={!!rejectRepairApartment}
				type='error'
				backgroundIconColor='#ffdce4'
				borderIconColor='#fff0f3'
				title='Từ chối yêu cầu'
				note={<span>Bạn có chắc chắn muốn từ chối yêu cầu xử lý sửa chữa không?</span>}
				icon={<Warning2 size='28' color='#EE0033' />}
				onClose={() => setRejectRepairApartment('')}
				onSubmit={funcRequestRepairApartment.mutate}
				isDisabledBtnSubmit={!form?.note}
				form={
					<Form form={form} setForm={setForm}>
						<TextArea name='note' placeholder='Từ chối yêu cầu' />
					</Form>
				}
			/>

			<PositionContainer
				open={!!_uuidRequestRepair}
				onClose={() => {
					const {_uuidRequestRepair, ...rest} = router.query;

					router.replace({
						pathname: router.pathname,
						query: {
							...rest,
						},
					});
				}}
			>
				<DetailRequestRepairApartment
					onClose={() => {
						const {_uuidRequestRepair, ...rest} = router.query;

						router.replace({
							pathname: router.pathname,
							query: {
								...rest,
							},
						});
					}}
				/>
			</PositionContainer>

			<Popup open={!!uuidConfirm} onClose={() => setUuidConfirm('')}>
				<ConfirmRequest uuidConfirm={uuidConfirm} onClose={() => setUuidConfirm('')} />
			</Popup>
		</FlexLayout>
	);
}

export default RequestRepairApartment;

import {useRouter} from 'next/router';
import styles from './MainApartmentIncidentReport.module.scss';
import {IIncidentApartment, PropsMainApartmentIncidentReport} from './interfaces';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {Fragment, useState} from 'react';
import {CONFIG_PAGING, CONFIG_TYPE_FINDING, QUERY_KEY, STATE_APARTMENT_INCIDENT_REPORTS} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import incidentServices from '~/services/incidentServices';
import FlexLayout from '~/components/layouts/FlexLayout';
import Header from '~/components/utils/Header';
import Button from '~/components/common/Button';
import {AddCircle, CloseCircle, Eye, Warning2} from 'iconsax-react';
import SearchBlock from '~/components/utils/SearchBlock';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import FilterCustom from '~/components/common/FilterCustom';
import {statusApartmentIncidentReport} from '~/constants/config/data';
import MainTable from '~/components/utils/MainTable';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import Moment from 'react-moment';
import StateActive from '~/components/utils/StateActive';
import IconActionTable from '~/components/utils/IconActionTable';
import {FaCircleCheck} from 'react-icons/fa6';
import Pagination from '~/components/common/Pagination';
import Dialog from '~/components/common/Dialog';
import Form, {TextArea} from '~/components/common/Form';
import PositionContainer from '~/components/common/PositionContainer';
import Popup from '~/components/common/Popup';
import ConfirmRequest from '../ConfirmRequest';
import DetailApartmentIncidentReport from '../DetailApartmentIncidentReport';

function MainApartmentIncidentReport({}: PropsMainApartmentIncidentReport) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuid, _uuidDetailIncidentReport} = router.query;

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [keyword, setKeyword] = useState<string>('');
	const [status, setStatus] = useState<number | null>(null);
	const [rejectRepairApartment, setRejectRepairApartment] = useState<string>('');
	const [uuidConfirm, setUuidConfirm] = useState<string>('');

	const [form, setForm] = useState<{note: string}>({
		note: '',
	});

	const resetFilter = () => {
		setKeyword('');
		setStatus(null);
	};

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
	}>([QUERY_KEY.table_apartment_incident_module, page, pageSize, keyword, status, _uuid], {
		queryFn: () =>
			httpRequest({
				http: incidentServices.getIncidentReports({
					isPaging: CONFIG_PAGING.IS_PAGING,
					typeFinding: CONFIG_TYPE_FINDING.SIMPLE,
					page: page,
					pageSize: pageSize,
					keyword: keyword,
					status: status,
					apartmentUuid: '',
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
					queryKey: [QUERY_KEY.table_apartment_incident_module],
				});
			}
		},
	});

	return (
		<Fragment>
			<FlexLayout column gap-12>
				<Header
					title='Yêu cầu sửa chữa'
					actions={
						<FlexLayout row gap-6>
							<Button icon={<AddCircle />} p_8_24 rounded_40 bright-cyan bold href={'#'}>
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
							data={data?.items || []}
							loading={isLoading}
							title='Yêu cầu xem căn nhà trống!'
							note='Danh sách căn nhà hiện đang trống!'
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
																_uuidDetailIncidentReport: row?.uuid,
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
					</MainTable>
				</FlexItem>

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
					open={!!_uuidDetailIncidentReport}
					onClose={() => {
						const {_uuidDetailIncidentReport, ...rest} = router.query;

						router.replace({
							pathname: router.pathname,
							query: {
								...rest,
							},
						});
					}}
				>
					<DetailApartmentIncidentReport
						onClose={() => {
							const {_uuidDetailIncidentReport, ...rest} = router.query;

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
		</Fragment>
	);
}

export default MainApartmentIncidentReport;

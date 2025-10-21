import FlexLayout from '~/components/layouts/FlexLayout';
import styles from './MainRequestRepairApartment.module.scss';
import {IIncidentApartment, PropsMainRequestRepairApartment} from './interfaces';
import LayoutMainPage from '~/components/layouts/LayoutMainPage';
import Breadcrumb from '~/components/common/Breadcrumb/Breadcrumb';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button/Button';
import {tabsDetailApartments} from '~/constants/config/data';
import {useRouter} from 'next/router';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import Search from '~/components/common/Search';
import DataWrapper from '~/components/utils/DataWrapper';
import Table from '~/components/common/Table';
import StateActive from '~/components/utils/StateActive';
import IconActionTable from '~/components/utils/IconActionTable';
import {CloseCircle, Eye, Warning2} from 'iconsax-react';
import {useState} from 'react';
import {CONFIG_PAGING, CONFIG_TYPE_FIND, QUERY_KEY, TYPE_DATE} from '~/constants/config/enum';
import FilterCustom from '~/components/common/FilterCustom';
import WrapperForm from '~/components/utils/WrapperForm';
import {FaCircleCheck} from 'react-icons/fa6';
import Pagination from '~/components/common/Pagination';
import Dialog from '~/components/common/Dialog';
import {useMutation, useQuery} from '@tanstack/react-query';
import PositionContainer from '~/components/common/PositionContainer';
import DetailRequestRepairApartment from './components/DetailRequestRepairApartment';
import Form, {TextArea} from '~/components/common/Form';
import Popup from '~/components/common/Popup';
import ConfirmRequest from '../MainRequestViewApartment/components/ConfirmRequest';
import {httpRequest} from '~/services';
import incidentServices from '~/services/incidentServices';

function MainRequestRepairApartment({}: PropsMainRequestRepairApartment) {
	const router = useRouter();
	const {_uuid, _uuidDetail} = router.query;

	const [page, setPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(20);
	const [type, setType] = useState<number | null>(null);

	const [keyword, setKeyword] = useState<string>('');
	const [status, setStatus] = useState<number | null>(null);
	const [typeDate, setTypeDate] = useState<TYPE_DATE>(TYPE_DATE.ALL);
	const [date, setDate] = useState<{from: Date | null; to: Date | null} | null>(null);
	const [cancelApartment, setCancelApartment] = useState<string>('');
	const [uuidConfirm, setUuidConfirm] = useState<string>('');

	const [form, setForm] = useState<{note: string}>({
		note: '',
	});

	const resetFilter = () => {
		setKeyword('');
		setTypeDate(TYPE_DATE.ALL);
		setDate(null);
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
	}>([QUERY_KEY.table_apartment_incident, page, pageSize, keyword, status, _uuid], {
		queryFn: () =>
			httpRequest({
				http: incidentServices.getIncidentReports({
					isPaging: CONFIG_PAGING.IS_PAGING,
					typeFinding: CONFIG_TYPE_FIND.TABLE,
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

	const funcRequestView = useMutation({
		// mutationFn: () =>
		// 	httpRequest({
		// 		showMessageSuccess: true,
		// 		showMessageFailed: true,
		// 		msgSuccess: 'Reset mật khẩu thành công!',
		// 		http: lockServices.resetUserPassword({
		// 			uuid: cancelApartment,
		// 		}),
		// 	}),
		// onSuccess(data) {
		// 	if (data) {
		// 		setCancelApartment('');
		// 		queryClient.invalidateQueries({
		// 			queryKey: [QUERY_KEY.table_lock],
		// 		});
		// 	}
		// },
	});

	return (
		<FlexLayout column gap-12>
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
					</FlexLayout>

					<div style={{marginTop: '12px'}}>
						<FlexItem flex-1 overflow-x>
							<DataWrapper data={[1]} loading={false} title='Dữ liệu trống!' note='Danh sách dữ liệu hiện đang trống!'>
								<Table<{uuid: string; code: string; accountRepair: string; date: string}>
									rowKey={(row) => row.uuid}
									data={[
										{uuid: '1', code: '1', accountRepair: '0398162589', date: '24/08/2025 08:00 - 09:00'},
										{uuid: '2', code: '2', accountRepair: '0398162589', date: '24/08/2025 08:00 - 09:00'},
										{uuid: '3', code: '3', accountRepair: '0398162589', date: '24/08/2025 08:00 - 09:00'},
									]}
									fixedHeader={true}
									column={[
										{
											title: 'STT',
											fixedLeft: true,
											render: (_, index) => <>{index + 1}</>,
										},
										{
											title: 'Mã yêu cầu',
											render: (row, _) => <>{row.code}</>,
										},
										{
											title: 'Tài khoản báo sửa',
											render: (row, _) => <>{row.accountRepair}</>,
										},
										{
											title: 'Số điện thoại',
											render: (row, _) => <>{row.date}</>,
										},
										{
											title: 'Ghi chú',
											render: (row, _) => <>{row.date}</>,
										},
										{
											title: 'Thời gian yêu cầu',
											render: (row, _) => <>{row.date}</>,
										},
										{
											title: 'Thời gian xử lý',
											render: (row, _) => <>{row.date}</>,
										},
										{
											title: 'Trạng thái sự cố',
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
													<IconActionTable
														icon={<Eye color='#292D32' size={24} />}
														tooltip='Xem chi tiết'
														onClick={() =>
															router.replace({
																pathname: router.pathname,
																query: {
																	...router.query,
																	_uuidDetail: row?.uuid,
																},
															})
														}
													/>
													<IconActionTable
														icon={<CloseCircle color='#EE0033' size={24} />}
														tooltip='Từ chối yêu cầu'
														onClick={() => setCancelApartment(row?.uuid)}
													/>
													<IconActionTable
														icon={<FaCircleCheck color='#00a441ff' size={24} />}
														tooltip='Chấp nhận yêu cầu'
														onClick={() => setUuidConfirm(row?.uuid)}
													/>
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
								total={1}
								dependencies={[pageSize, date?.from, date?.to, type]}
							/>
						</FlexItem>
					</div>
				</WrapperForm>
			</LayoutMainPage>

			<Dialog
				open={!!cancelApartment}
				type='error'
				backgroundIconColor='#ffdce4'
				borderIconColor='#fff0f3'
				title='Từ chối yêu cầu'
				note={<span>Bạn có chắc chắn muốn từ chối yêu cầu xử lý sửa chữa YC2040 không?</span>}
				icon={<Warning2 size='28' color='#EE0033' />}
				onClose={() => setCancelApartment('')}
				onSubmit={funcRequestView.mutate}
				form={
					<Form form={form} setForm={setForm}>
						<TextArea name='note' placeholder='Từ chối yêu cầu' />
					</Form>
				}
			/>

			<PositionContainer
				open={!!_uuidDetail}
				onClose={() => {
					const {_uuidDetail, ...rest} = router.query;

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
						const {_uuidDetail, ...rest} = router.query;

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

export default MainRequestRepairApartment;

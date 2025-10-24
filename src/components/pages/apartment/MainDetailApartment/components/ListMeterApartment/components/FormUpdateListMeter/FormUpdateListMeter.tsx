import {useRouter} from 'next/router';
import styles from './FormUpdateListMeter.module.scss';
import {IFormUpdateApartment, PropsFormUpdateListMeter} from './interfaces';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import WrapperForm from '~/components/utils/WrapperForm';
import FormChooseMeter from '~/components/pages/apartment/FormCreateApartment/components/FormChooseMeter';
import FlexLayout from '~/components/layouts/FlexLayout';
import {useEffect, useState} from 'react';
import {CONFIG_PAGING, CONFIG_TYPE_FIND, IS_USED, QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import meterTypeServices from '~/services/meterTypeServices';
import Button from '~/components/common/Button';
import Form, {ContextForm} from '~/components/common/Form';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import apartmentServices from '~/services/apartmentServices';
import {convertCoin, price} from '~/common/funcs/convertCoin';
import {IDataUploadFile} from '~/components/common/UploadMultipleFile/interfaces';
import {IDetailApartmentForUpdate} from '~/components/pages/apartment/FormUpdateApartment/interfaces';
import Loading from '~/components/common/Loading';
import meterServices from '~/services/meterServices';

function FormUpdateListMeter({onClose}: PropsFormUpdateListMeter) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_uuid, _uuidListMeter} = router.query;

	const [form, setForm] = useState<IFormUpdateApartment>({
		meters: [],
	});

	const {data: apartment} = useQuery<IDetailApartmentForUpdate>([QUERY_KEY.table_apartment_list_meter, _uuid], {
		queryFn: () =>
			httpRequest({
				http: apartmentServices.apartmentDetailForUpdate({
					uuid: _uuid as string,
				}),
			}),
		onSuccess(data) {
			setForm({
				meters: data?.meters?.map((meter) => ({
					meterTypeName: meter?.meterTypeUu?.name,
					meterTypeUuid: meter?.meterTypeUu?.uuid,
					meterUuid: meter?.meterUu?.uuid,
					meterCode: meter?.meterUu?.code,
					meterName: meter?.meterUu?.name,
					meterSerialNumber: meter?.meterUu?.serialNumber,
				})),
			});
		},
		select(data) {
			return data;
		},
		enabled: !!_uuid,
	});

	const {data: listMeterType = [], isLoading: loadingMeterType} = useQuery<
		{
			uuid: string;
			code: string;
			name: string;
		}[]
	>([QUERY_KEY.list_meter_type], {
		queryFn: () =>
			httpRequest({
				http: meterTypeServices.listMeterType({
					keyword: '',
					isPaging: CONFIG_PAGING.NO_PAGING,
					typeFinding: CONFIG_TYPE_FIND.DROPDOWN,
					status: STATUS_CONFIG.ACTIVE,
					page: 1,
					pageSize: 100,
				}),
			}),
		select: (data) => data ?? [],
		enabled: !!_uuidListMeter && !!apartment,
		onSuccess(data) {
			if (!data?.length) return;

			setForm((prev) => {
				const merged = data.map((type) => {
					const exist = apartment?.meters?.find((m) => m.meterTypeUu?.uuid === type.uuid);

					return {
						meterTypeUuid: type.uuid,
						meterTypeName: type.name,
						meterUuid: exist?.meterUu?.uuid || '',
						meterCode: exist?.meterUu?.code || '',
						meterName: exist?.meterUu?.name || '',
						meterSerialNumber: exist?.meterUu?.serialNumber || '',
					};
				});

				return {
					...prev,
					meters: merged,
				};
			});
		},
	});

	const funcUpdateMeterApartment = useMutation({
		mutationFn: (body: {
			apartmentUuid: string;
			listMeter: {
				apartmentMeterUuid: string;
				meterUuid: string;
			}[];
		}) =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Chỉnh sửa thiết bị thành công!',
				http: meterServices.updateMeterInApartment(body),
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEY.table_apartment_list_meter],
			});
			onClose?.();
		},
	});

	const handleUpdateApartment = async () => {
		const payload = {
			apartmentUuid: _uuid as string,
			listMeter: form.meters
				.filter((m) => m.meterUuid)
				.map((m) => {
					const existed = apartment?.meters?.find((v) => v.meterTypeUu?.uuid === m.meterTypeUuid);
					return {
						apartmentMeterUuid: existed?.uuid || '',
						meterUuid: m.meterUuid,
					};
				}),
		};

		funcUpdateMeterApartment.mutate(payload);
	};

	return (
		<Form form={form} setForm={setForm} onSubmit={handleUpdateApartment}>
			<Loading loading={funcUpdateMeterApartment.isLoading} />
			<WrapperFormPostion
				width={1000}
				title='Chỉnh sửa danh sách thiết bị'
				actions={
					<FlexLayout row gap-8>
						<Button p_8_24 rounded_8 white bold onClick={onClose}>
							Hủy bỏ
						</Button>
						<ContextForm.Consumer>
							{({isDone}) => (
								<Button disable={!isDone} p_8_24 rounded_8 bright-cyan bold>
									Cập nhật
								</Button>
							)}
						</ContextForm.Consumer>
					</FlexLayout>
				}
			>
				<WrapperForm title='Danh sách thiết bị'>
					<FormChooseMeter
						meterApartment={apartment?.meters || []}
						meters={form.meters}
						setMeters={(meters) =>
							setForm((prev) => ({
								...prev,
								meters,
							}))
						}
						loading={loadingMeterType}
					/>
				</WrapperForm>
			</WrapperFormPostion>
		</Form>
	);
}

export default FormUpdateListMeter;

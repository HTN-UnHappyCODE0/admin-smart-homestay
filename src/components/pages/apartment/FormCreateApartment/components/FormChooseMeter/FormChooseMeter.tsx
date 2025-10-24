import DataWrapper from '~/components/utils/DataWrapper';
import styles from './FormChooseMeter.module.scss';
import {PropsFormChooseMeter} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import {Input, Select} from '~/components/common/Form';
import {useQuery} from '@tanstack/react-query';
import {CONFIG_PAGING, CONFIG_TYPE_FIND, IS_USED, QUERY_KEY, STATUS_CONFIG} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import meterServices from '~/services/meterServices';
import {IMeter} from '../../FormCreateApartment';
import {IMeterApartment} from '../../../FormUpdateApartment/interfaces';
import {useMemo} from 'react';

function FormChooseMeter({meterApartment = [], meters, setMeters, loading}: PropsFormChooseMeter) {
	return (
		<DataWrapper data={meters} loading={loading} title='Thiết bị trống!' note='Danh sách thiết bị hiện đang trống!'>
			<FlexLayout column gap-8>
				<div className={styles.grid}>
					<label className={styles.label}>
						<span>
							Thiết bị <span style={{color: 'red'}}>* </span>
						</span>
					</label>
					<label className={styles.label}>
						<span>Mã kết nối</span>
					</label>
				</div>
				{meters?.map((meter) => (
					<Meter key={meter?.meterTypeUuid} meterApartment={meterApartment} meter={meter} meters={meters} setMeters={setMeters} />
				))}
			</FlexLayout>
		</DataWrapper>
	);
}

export default FormChooseMeter;

function Meter({
	meterApartment = [],
	meter,
	meters,
	setMeters,
}: {
	meterApartment: IMeterApartment[];
	meter: IMeter;
	meters: IMeter[];
	setMeters: (meters: IMeter[]) => void;
}) {
	const concatMeter: {
		uuid: string;
		code: string;
		serialNumber: string;
		name: string;
	} | null = useMemo(() => {
		const dataMeter = meterApartment?.find((v) => v?.meterTypeUu?.uuid == meter?.meterTypeUuid);

		if (dataMeter) {
			return {
				uuid: dataMeter?.meterUu?.uuid,
				name: dataMeter?.meterUu?.name,
				code: dataMeter?.meterUu?.code,
				serialNumber: dataMeter?.meterUu?.serialNumber,
			};
		}

		return null;
	}, [meterApartment, meter]);

	const {data: listMeter = []} = useQuery<
		{
			uuid: string;
			code: string;
			serialNumber: string;
			name: string;
		}[]
	>([`${QUERY_KEY.list_meter}_${meter?.meterTypeUuid}`, meter?.meterTypeUuid], {
		queryFn: () =>
			httpRequest({
				http: meterServices.listmeter({
					isPaging: CONFIG_PAGING.NO_PAGING,
					typeFinding: CONFIG_TYPE_FIND.DROPDOWN,
					page: 1,
					pageSize: 100,
					keyword: '',
					status: STATUS_CONFIG.ACTIVE,
					installDateFrom: null,
					installDateTo: null,
					isUsed: IS_USED.NOT_USED,
					meterTypeUuid: meter?.meterTypeUuid,
				}),
			}),
		select(data) {
			return data;
		},
	});

	return (
		<div className={styles.grid}>
			<Input
				name='name'
				type='text'
				placeholder='Nhập tên thiết bị'
				value={meter?.meterTypeName}
				readOnly={true}
				showError={false}
				isShowValue={true}
			/>
			<Select
				placeholder='Lựa chọn'
				value={meter.meterUuid}
				options={!!concatMeter ? [concatMeter, ...listMeter] : listMeter}
				onSelect={(data) => {
					const newMeters = meters.map((m) =>
						m.meterTypeUuid === meter.meterTypeUuid
							? {
									...m,
									meterUuid: data?.uuid,
									meterCode: data?.code,
									meterName: data?.name,
									meterSerialNumber: data?.serialNumber,
							  }
							: m
					);

					setMeters(newMeters);
				}}
				getOptionLabel={(opt) => opt.serialNumber}
				getOptionValue={(opt) => opt.uuid}
			/>
		</div>
	);
}

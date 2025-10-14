import React, {useMemo} from 'react';
import TippyHeadless from '@tippyjs/react/headless';
import {PropsDateOption} from './interfaces';

import styles from './DateOption.module.scss';
import clsx from 'clsx';
import {TYPE_DATE} from '~/constants/config/enum';
import {ListOptionFilterDate} from '~/constants/config';
import RangeDatePicker from '../RangeDatePicker';
import {getDateRange} from '~/common/funcs/selectData';

function DateOption({hiddenOptionAll = false, date, setDate, typeDate, setTypeDate, show, setShow}: PropsDateOption) {
	const options = useMemo(() => {
		if (!hiddenOptionAll) {
			return ListOptionFilterDate;
		} else {
			return ListOptionFilterDate.filter((v) => v?.value != TYPE_DATE.ALL);
		}
	}, [hiddenOptionAll]);

	return (
		<TippyHeadless
			maxWidth={'100%'}
			interactive
			visible={Number(typeDate) == TYPE_DATE.LUA_CHON}
			placement='right-start'
			render={(attrs) => (
				<div className={styles.main_calender}>
					<RangeDatePicker
						value={date}
						onSetValue={setDate}
						onClose={() => setShow(false)}
						open={show && Number(typeDate) == TYPE_DATE.LUA_CHON}
					/>
				</div>
			)}
		>
			<div className={styles.mainOption}>
				{options.map((v, i) => (
					<div
						key={i}
						className={clsx(styles.option, {
							[styles.option_active]: Number(typeDate) == v.value,
						})}
						onClick={() => {
							if (v.value != TYPE_DATE.LUA_CHON) {
								setDate(getDateRange(v.value));
								setShow(false);
							}
							setTypeDate(v.value);
						}}
					>
						<p>{v.name}</p>
					</div>
				))}
			</div>
		</TippyHeadless>
	);
}

export default DateOption;

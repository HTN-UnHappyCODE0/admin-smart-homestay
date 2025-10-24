import React from 'react';

import {PropsSelectMany} from './interfaces';
import styles from './SelectMany.module.scss';
import clsx from 'clsx';
import {AddCircle} from 'iconsax-react';

function SelectMany({label, placeholder, textShow, readOnly, onClick}: PropsSelectMany) {
	return (
		<div
			className={clsx(styles.container, {
				[styles.readOnly]: readOnly,
			})}
		>
			{label && <label className={styles.label}>{label}</label>}

			<div className={styles.main_select} onClick={onClick}>
				<p className={clsx(styles.value, {[styles.placeholder]: !textShow})}>{textShow || placeholder}</p>

				{!readOnly && (
					<div className={styles.icon}>
						<AddCircle variant='Bold' size={18} />
					</div>
				)}
			</div>
		</div>
	);
}

export default SelectMany;

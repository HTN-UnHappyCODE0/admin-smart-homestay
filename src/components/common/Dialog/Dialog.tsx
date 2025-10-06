import React from 'react';

import {PropsDialog} from './interfaces';
import styles from './Dialog.module.scss';
import Popup from '../Popup';
import Button from '../Button';
import {IoClose} from 'react-icons/io5';
import {Danger} from 'iconsax-react';

function Dialog({
	open,
	title,
	note,
	icon = <Danger size='32' color='#F46161' variant='Bold' />,
	titleCancel = 'Hủy bỏ',
	titleSubmit = 'Xác nhận',
	onClose,
	onSubmit,
	type = 'primary',
}: PropsDialog) {
	return (
		<Popup open={open} onClose={onClose}>
			<div className={styles.container}>
				{icon}
				<h4 className={styles.title}>{title}</h4>
				<p className={styles.note}>{note}</p>
				<div className={styles.groupBtn}>
					<Button white rounded_8 bold maxContent p_12_32 onClick={onClose}>
						{titleCancel}
					</Button>
					<Button
						bold
						rounded_8
						maxContent
						p_12_32
						green={type == 'primary'}
						red={type == 'error'}
						orange={type == 'warning'}
						onClick={onSubmit}
					>
						{titleSubmit}
					</Button>
				</div>

				<div className={styles.close} onClick={onClose}>
					<IoClose size={28} color='#8492A6' />
				</div>
			</div>
		</Popup>
	);
}

export default Dialog;

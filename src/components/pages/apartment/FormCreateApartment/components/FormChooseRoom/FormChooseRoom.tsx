import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import styles from './FormChooseRoom.module.scss';
import {PropsFormChooseRoom} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import WrapperForm from '~/components/utils/WrapperForm';
import {Input} from '~/components/common/Form';
import DataWrapper from '~/components/utils/DataWrapper';
import {convertCoin, price} from '~/common/funcs/convertCoin';
import {useEffect, useState} from 'react';
import {IRoom} from '../../FormCreateApartment';

function FormChooseRoom({rooms, setRooms, loading, onClose}: PropsFormChooseRoom) {
	const [roomsTerm, setRoomsTerm] = useState<IRoom[]>(rooms);

	useEffect(() => {
		setRoomsTerm(rooms);
	}, [rooms]);

	const handleChangeCount = (uuid: string, value: string | number) => {
		const numeric = Number(price(value));

		const updatedRooms = roomsTerm.map((room) =>
			room.assetUuid === uuid ? {...room, count: numeric ? convertCoin(numeric) : '0'} : room
		);

		setRoomsTerm(updatedRooms);
	};

	return (
		<WrapperFormPostion
			width={800}
			title='Chọn phòng'
			actions={
				<FlexLayout row gap-8>
					<Button p_8_24 rounded_8 white bold onClick={onClose}>
						Hủy bỏ
					</Button>

					<Button
						p_8_24
						rounded_8
						bright-cyan
						bold
						onClick={() => {
							setRooms(roomsTerm);
							onClose();
						}}
					>
						Lưu lại
					</Button>
				</FlexLayout>
			}
		>
			<WrapperForm title='Danh sách phòng'>
				<DataWrapper data={roomsTerm} loading={loading} title='Phòng trống!' note='Danh sách phòng hiện đang trống!'>
					<FlexLayout column gap-8>
						<div className={styles.grid}>
							<label className={styles.label}>
								<span>
									Loại phòng <span style={{color: 'red'}}>* </span>
								</span>
							</label>
							<label className={styles.label}>
								<span>
									Số lượng <span style={{color: 'red'}}>* </span>
								</span>
							</label>
						</div>
						{roomsTerm?.map((room) => (
							<div key={room?.assetUuid} className={styles.grid}>
								<Input
									name='name'
									type='text'
									placeholder='Nhập loại phòng'
									value={room?.name}
									readOnly={true}
									showError={false}
								/>
								<div>
									<Input
										name='count'
										type='text'
										placeholder='Nhập số lượng'
										value={room?.count}
										isBlur={false}
										showError={false}
										onChangeValue={(val) => handleChangeCount(room?.assetUuid, val)}
									/>
								</div>
							</div>
						))}
					</FlexLayout>
				</DataWrapper>
			</WrapperForm>
		</WrapperFormPostion>
	);
}

export default FormChooseRoom;

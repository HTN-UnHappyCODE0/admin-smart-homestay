import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import styles from './FormChooseFurniture.module.scss';
import {PropsFormChooseFurniture} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import WrapperForm from '~/components/utils/WrapperForm';
import {Input} from '~/components/common/Form';
import DataWrapper from '~/components/utils/DataWrapper';
import {convertCoin, price} from '~/common/funcs/convertCoin';
import {useEffect, useState} from 'react';
import {IRoom} from '../../FormCreateApartment';

function FormChooseFurniture({furnitures, setFurnitures, loading, onClose}: PropsFormChooseFurniture) {
	const [furnituresTerm, setFurnituresTerm] = useState<IRoom[]>(furnitures);

	useEffect(() => {
		setFurnituresTerm(furnitures);
	}, [furnitures]);

	const handleChangeCount = (uuid: string, value: string | number) => {
		const numeric = Number(price(value));

		const updatedRooms = furnituresTerm.map((room) =>
			room.assetUuid === uuid ? {...room, count: numeric ? convertCoin(numeric) : '0'} : room
		);

		setFurnituresTerm(updatedRooms);
	};

	return (
		<WrapperFormPostion
			width={800}
			title='Chọn nội thất'
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
							setFurnitures(furnituresTerm);
							onClose();
						}}
					>
						Lưu lại
					</Button>
				</FlexLayout>
			}
		>
			<WrapperForm title='Danh sách nội thất'>
				<DataWrapper data={furnituresTerm} loading={loading} title='Nội thất trống!' note='Danh sách nội thất hiện đang trống!'>
					<FlexLayout column gap-8>
						<div className={styles.grid}>
							<label className={styles.label}>
								<span>
									Tên nội thất <span style={{color: 'red'}}>* </span>
								</span>
							</label>
							<label className={styles.label}>
								<span>
									Số lượng <span style={{color: 'red'}}>* </span>
								</span>
							</label>
						</div>
						{furnituresTerm?.map((furniture) => (
							<div key={furniture?.assetUuid} className={styles.grid}>
								<Input
									name='name'
									type='text'
									placeholder='Nhập loại phòng'
									value={furniture?.name}
									readOnly={true}
									showError={false}
								/>
								<div>
									<Input
										name='count'
										type='text'
										placeholder='Nhập số lượng'
										value={furniture?.count}
										isBlur={false}
										showError={false}
										onChangeValue={(val) => handleChangeCount(furniture?.assetUuid, val)}
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

export default FormChooseFurniture;

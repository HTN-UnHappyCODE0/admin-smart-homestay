import {useState} from 'react';
import styles from './FormDetailCostType.module.scss';
import {PropsFormDetailCostType} from './interfaces';
import WrapperFormPostion from '~/components/utils/WrapperFormPostion';
import FlexLayout from '~/components/layouts/FlexLayout';
import Button from '~/components/common/Button';
import Form from '~/components/common/Form';
import WrapperForm from '~/components/utils/WrapperForm';
import GridColumn from '~/components/layouts/GridColumn';
import StateActive from '~/components/utils/StateActive';

function FormDetailCostType({}: PropsFormDetailCostType) {
	const [form, setForm] = useState<{name: string; description: string}>({name: '', description: ''});

	return (
		<WrapperFormPostion
			width={1040}
			title='Chi tiết loại phòng'
			actions={
				<FlexLayout row gap-8>
					<Button p_8_24 rounded_8 white bold>
						Đóng
					</Button>
					<Button p_8_24 rounded_8 red bold>
						Khóa danh mục
					</Button>
					<Button p_8_24 rounded_8 green bold>
						Mở khóa danh mục
					</Button>
					<Button p_8_24 rounded_8 bright-cyan bold>
						Chỉnh sửa
					</Button>
				</FlexLayout>
			}
		>
			<Form form={form} setForm={setForm}>
				<WrapperForm title='Thông tin chi tiết '>
					<div>
						<GridColumn col_2>
							<div className={styles.info}>
								<p>Trạng thái</p>
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
							</div>
							<div className={styles.info}>
								<p>Tên loại phòng</p>
								<p>loại phòng ABC</p>
							</div>
							<div className={styles.info}>
								<p>Ghi chú</p>
								<p>---</p>
							</div>
						</GridColumn>
					</div>
				</WrapperForm>
			</Form>
		</WrapperFormPostion>
	);
}

export default FormDetailCostType;

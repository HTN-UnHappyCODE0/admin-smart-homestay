import FlexLayout from '~/components/layouts/FlexLayout';
import styles from './MainHome.module.scss';
import {PropsMainHome} from './interfaces';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';
import Header from '~/components/utils/Header';
import Button from '~/components/common/Button';
import {AddCircle} from 'iconsax-react';
import SearchBlock from '~/components/utils/SearchBlock';
import {useState} from 'react';
import FilterCustom from '~/components/common/FilterCustom';
import {TYPE_DATE} from '~/constants/config/enum';
import FilterDateRange from '~/components/common/FilterDateRange';

function MainHome({}: PropsMainHome) {
	const [keyword, setKeyword] = useState<string>('');
	const [status, setStatus] = useState<number | null>(null);
	const [typeDate, setTypeDate] = useState<TYPE_DATE>(TYPE_DATE.ALL);
	const [date, setDate] = useState<{from: Date | null; to: Date | null} | null>(null);

	const resetFilter = () => {
		setKeyword('');
		setStatus(null);
		setTypeDate(TYPE_DATE.ALL);
		setDate(null);
	};

	return (
		<FlexLayout column gap-12>
			<Header
				title='Thống kê tổng quan'
				actions={
					<FlexLayout row gap-6>
						<Button icon={<AddCircle />} p_8_24 rounded_40 bright-cyan bold>
							Thêm mới
						</Button>
					</FlexLayout>
				}
			/>
			<SearchBlock
				keyword={keyword}
				setKeyword={setKeyword}
				placeholder='Tìm kiếm theo họ tên, email, số điện thoại'
				action={
					<FlexLayout row gap-8 fit-height>
						<FlexItem flex-1 overflow-y scrollbar>
							<FlexLayout row gap-8>
								<FilterCustom
									name='Trạng thái'
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
								<FilterDateRange date={date} setDate={setDate} typeDate={typeDate} setTypeDate={setTypeDate} />
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
				<div className={styles.content}></div>
			</FlexItem>
		</FlexLayout>
	);
}

export default MainHome;

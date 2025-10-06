import useWindowWidth from '~/common/hooks/useWindowWidth';
import styles from './WrapperFormPostion.module.scss';
import {PropsWrapperFormPostion} from './interfaces';
import FlexLayout from '~/components/layouts/FlexLayout';
import FlexItem from '~/components/layouts/FlexLayout/FlexItem';

function WrapperFormPostion({width, title, actions, children}: PropsWrapperFormPostion) {
	const widthWindow = useWindowWidth({debounceMs: 100});

	return (
		<div style={{width: widthWindow <= width ? '100vw' : `${width}px`}} className={styles.wrapper_form_postion}>
			<FlexLayout column gap-12>
				<div className={styles.head}>
					<h4 className={styles.title}>{title}</h4>
					{actions && actions}
				</div>
				<FlexItem flex-1 overflow-x>
					{children}
				</FlexItem>
			</FlexLayout>
		</div>
	);
}

export default WrapperFormPostion;

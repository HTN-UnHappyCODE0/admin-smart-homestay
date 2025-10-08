import styles from './WrapperForm.module.scss';
import {PropsWrapperForm} from './interfaces';

function WrapperForm({title, actions, children}: PropsWrapperForm) {
	return (
		<div className={styles.wrapper_form}>
			<div className={styles.head}>
				<h4>{title}</h4>
				{actions && actions}
			</div>
			<div className={styles.main_wrapper_form}>{children}</div>
		</div>
	);
}

export default WrapperForm;

import styles from './Header.module.scss';
import {PropsHeader} from './interfaces';

function Header({title, actions}: PropsHeader) {
	return (
		<header className={styles.header}>
			<h4>{title}</h4>
			{actions && actions}
		</header>
	);
}

export default Header;

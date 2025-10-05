import RequiredLogout from '~/components/protected/RequiredLogout';
import styles from './LayoutAuth.module.scss';
import {PropsLayoutAuth} from './interfaces';

function LayoutAuth({children}: PropsLayoutAuth) {
	return (
		<RequiredLogout>
			<div className={styles.container}>
				<div className={styles.background}></div>
				<main className={styles.main}>
					{children}
					<div className={styles.copyright}>
						<p>Bản quyền © 2025 - Mobiplus - 0983487772</p>
						<p>Xanh Stay Admin</p>
					</div>
				</main>
			</div>
		</RequiredLogout>
	);
}

export default LayoutAuth;

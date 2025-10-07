import RequireAuth from '~/components/protected/RequiredAuth';
import styles from './BaseLayout.module.scss';
import Navbar from './components/Navbar';
import {PropsBaseLayout} from './interfaces';

function BaseLayout({children}: PropsBaseLayout) {
	return (
		<RequireAuth>
			<div className={styles.container}>
				<Navbar />
				<main>{children}</main>
			</div>
		</RequireAuth>
	);
}

export default BaseLayout;

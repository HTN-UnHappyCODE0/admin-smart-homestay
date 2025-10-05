import styles from './BaseLayout.module.scss';
import Navbar from './components/Navbar';
import {PropsBaseLayout} from './interfaces';

function BaseLayout({children}: PropsBaseLayout) {
	return (
		<div className={styles.container}>
			<Navbar />
			<main>{children}</main>
		</div>
	);
}

export default BaseLayout;

import Header from '~/components/utils/Header';
import FlexLayout from '../FlexLayout';
import styles from './LayoutMainPage.module.scss';
import {PropsLayoutMainPage} from './interfaces';
import Link from 'next/link';
import FlexItem from '../FlexLayout/FlexItem';
import {useRouter} from 'next/router';
import {useCallback} from 'react';
import clsx from 'clsx';

function LayoutMainPage({title, actions, tabs, children}: PropsLayoutMainPage) {
	const router = useRouter();

	const checkActive = useCallback(
		(pathname: string) => {
			const currentRoute = router.pathname;

			return pathname == currentRoute;
		},
		[router]
	);

	return (
		<FlexLayout column gap-12>
			<Header title={title} actions={actions} />

			<div className={styles.tabs}>
				{tabs?.map((tab, index) => (
					<Link key={index} href={tab.path} className={clsx(styles.tab, {[styles.active]: checkActive(tab.path)})}>
						{tab.title}
					</Link>
				))}
			</div>

			<FlexItem flex-1 overflow-x>
				{children}
			</FlexItem>
		</FlexLayout>
	);
}

export default LayoutMainPage;

import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainLocks from '~/components/pages/locks/MainLocks';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Danh sách khóa</title>
				<meta name='description' content='Danh sách khóa' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainLocks />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout>{Page}</BaseLayout>;
};

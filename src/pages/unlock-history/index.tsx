import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainUnlockHistory from '~/components/pages/unlock-history/MainUnlockHistory';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Lịch sử mở khóa</title>
				<meta name='description' content='Lịch sử mở khóa' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainUnlockHistory />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout>{Page}</BaseLayout>;
};

import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainMeter from '~/components/pages/meter/MainMeter';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Danh sách thiết bị</title>
				<meta name='description' content='Danh sách thiết bị' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainMeter />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout>{Page}</BaseLayout>;
};

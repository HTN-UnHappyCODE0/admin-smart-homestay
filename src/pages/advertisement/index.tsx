import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainAdvertisement from '~/components/pages/advertisement/MainAdvertisement';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Bài đăng & quảng cáo</title>
				<meta name='description' content='Bài đăng & quảng cáo' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainAdvertisement />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout>{Page}</BaseLayout>;
};

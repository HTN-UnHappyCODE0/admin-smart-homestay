import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import DetailElectricWater from '~/components/pages/electric-water/DetailElectricWater';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Quản lý điện nước chi tiết</title>
				<meta name='description' content='Quản lý điện nước chi tiết' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<DetailElectricWater />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout>{Page}</BaseLayout>;
};

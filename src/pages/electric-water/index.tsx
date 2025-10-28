import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainElectricWater from '~/components/pages/electric-water/MainElectricWater';

export default function PageApartmentOwner() {
	return (
		<Fragment>
			<Head>
				<title>Quản lý điện nước</title>
				<meta name='description' content='Quản lý điện nước' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainElectricWater />
		</Fragment>
	);
}

PageApartmentOwner.getLayout = function (Page: ReactElement) {
	return <BaseLayout>{Page}</BaseLayout>;
};

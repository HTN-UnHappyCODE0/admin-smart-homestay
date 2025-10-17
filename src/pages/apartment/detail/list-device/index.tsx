import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainListDeviceApartment from '~/components/pages/apartment/MainListDeviceApartment';
import MainRequestRepairApartment from '~/components/pages/apartment/MainRequestRepairApartment';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Danh sách phòng</title>
				<meta name='description' content='Danh sách phòng' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainListDeviceApartment />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout>{Page}</BaseLayout>;
};

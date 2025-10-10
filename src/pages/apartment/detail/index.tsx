import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainInfoApartment from '~/components/pages/apartment/MainInfoApartment';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Thông tin căn hộ</title>
				<meta name='description' content='Thông tin căn hộ' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainInfoApartment />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout>{Page}</BaseLayout>;
};

import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainPageApartmentOwner from '~/components/pages/apartment-owner/MainPageApartmentOwner';

export default function PageApartmentOwner() {
	return (
		<Fragment>
			<Head>
				<title>Chủ căn hộ</title>
				<meta name='description' content='Chủ căn hộ' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainPageApartmentOwner />
		</Fragment>
	);
}

PageApartmentOwner.getLayout = function (Page: ReactElement) {
	return <BaseLayout>{Page}</BaseLayout>;
};

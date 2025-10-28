import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainApartmentVisit from '~/components/pages/apartment-visit/MainApartmentVisit';

export default function PageApartmentOwner() {
	return (
		<Fragment>
			<Head>
				<title>Yêu cầu xem nhà</title>
				<meta name='description' content='Yêu cầu xem nhà' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainApartmentVisit />
		</Fragment>
	);
}

PageApartmentOwner.getLayout = function (Page: ReactElement) {
	return <BaseLayout>{Page}</BaseLayout>;
};

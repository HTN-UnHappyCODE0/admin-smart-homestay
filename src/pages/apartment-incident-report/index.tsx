import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainApartmentIncidentReport from '~/components/pages/apartment-incident-report/MainApartmentIncidentReport';

export default function PageApartmentOwner() {
	return (
		<Fragment>
			<Head>
				<title>Yêu cầu sửa chữa</title>
				<meta name='description' content='Yêu cầu sửa chữa' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainApartmentIncidentReport />
		</Fragment>
	);
}

PageApartmentOwner.getLayout = function (Page: ReactElement) {
	return <BaseLayout>{Page}</BaseLayout>;
};

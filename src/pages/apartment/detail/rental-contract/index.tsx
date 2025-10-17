import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import RentalContractApartment from '~/components/pages/apartment/RentalContractApartment';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Hợp đồng thuê</title>
				<meta name='description' content='Hợp đồng thuê' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<RentalContractApartment />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout>{Page}</BaseLayout>;
};

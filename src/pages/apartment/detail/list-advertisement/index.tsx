import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import ListAdvertisementApartment from '~/components/pages/apartment/MainDetailApartment/components/ListAdvertisementApartment';
import ListMeterApartment from '~/components/pages/apartment/MainDetailApartment/components/ListMeterApartment';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Danh sách quảng cáo</title>
				<meta name='description' content='Danh sách quảng cáo' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<ListAdvertisementApartment />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout>{Page}</BaseLayout>;
};

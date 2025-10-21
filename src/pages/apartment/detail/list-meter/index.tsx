import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import ListMeterApartment from '~/components/pages/apartment/MainDetailApartment/components/ListMeterApartment';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Danh sách thiết bị</title>
				<meta name='description' content='Danh sách thiết bị' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<ListMeterApartment />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout>{Page}</BaseLayout>;
};

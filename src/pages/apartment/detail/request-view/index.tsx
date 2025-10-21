import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import RequestViewApartment from '~/components/pages/apartment/MainDetailApartment/components/RequestViewApartment';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Yêu cầu xem căn hộ</title>
				<meta name='description' content='Yêu cầu xem căn hộ' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<RequestViewApartment />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout>{Page}</BaseLayout>;
};

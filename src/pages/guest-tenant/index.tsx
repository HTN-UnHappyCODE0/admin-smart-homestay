import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainGuestTenant from '~/components/pages/guest-tenant/MainGuestTenant';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Tài khoản khách thuê</title>
				<meta name='description' content='Tài khoản khách thuê' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainGuestTenant />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout>{Page}</BaseLayout>;
};

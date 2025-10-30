import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainPaymentAccount from '~/components/pages/payment-account/MainPaymentAccount';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Tài khoản thanh toán</title>
				<meta name='description' content='Tài khoản thanh toán' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainPaymentAccount />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout>{Page}</BaseLayout>;
};

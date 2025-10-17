import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainRequestRepairApartment from '~/components/pages/apartment/MainRequestRepairApartment';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Yêu cầu sửa chữa</title>
				<meta name='description' content='Yêu cầu sửa chữa' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainRequestRepairApartment />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout>{Page}</BaseLayout>;
};

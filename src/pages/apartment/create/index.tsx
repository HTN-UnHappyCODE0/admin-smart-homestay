import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import FormCreateApartment from '~/components/pages/apartment/FormCreateApartment';
import MainPageApartment from '~/components/pages/apartment/MainPageApartment';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Thêm mới căn hộ</title>
				<meta name='description' content='Thêm mới căn hộ' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<FormCreateApartment />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout>{Page}</BaseLayout>;
};

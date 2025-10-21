import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import FormUpdateApartment from '~/components/pages/apartment/FormUpdateApartment';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Chỉnh sửa căn hộ</title>
				<meta name='description' content='Chỉnh sửa căn hộ' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<FormUpdateApartment />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout>{Page}</BaseLayout>;
};

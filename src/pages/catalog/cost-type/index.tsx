import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainCostType from '~/components/pages/catalog/MainCostType';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Loại chi phí</title>
				<meta name='description' content='Loại chi phí' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainCostType />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout>{Page}</BaseLayout>;
};

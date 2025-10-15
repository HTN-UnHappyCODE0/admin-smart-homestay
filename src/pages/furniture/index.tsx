import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainFurniture from '~/components/pages/furniture/MainFurniture';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Danh sách nội thất</title>
				<meta name='description' content='Danh sách nội thất' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainFurniture />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout>{Page}</BaseLayout>;
};

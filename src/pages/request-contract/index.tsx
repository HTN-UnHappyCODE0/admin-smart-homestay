import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainRequestContract from '~/components/pages/request-contract/MainRequestContract';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Yêu cầu lập hợp đồng</title>
				<meta name='description' content='Yêu cầu lập hợp đồng' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainRequestContract />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout>{Page}</BaseLayout>;
};

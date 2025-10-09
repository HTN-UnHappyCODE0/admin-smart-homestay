import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainRoomType from '~/components/pages/catalog/MainRoomType';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Loại phòng</title>
				<meta name='description' content='Loại phòng' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainRoomType />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout>{Page}</BaseLayout>;
};

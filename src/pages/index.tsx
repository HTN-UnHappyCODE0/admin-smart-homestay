import Head from 'next/head';
import {Fragment} from 'react';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Trang chủ</title>
				<meta name='description' content='Trang chủ' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<h1>Home pgae</h1>
		</Fragment>
	);
}

// Page.getLayout = function (Page: ReactElement) {
// 	return <BaseLayout>{Page}</BaseLayout>;
// };

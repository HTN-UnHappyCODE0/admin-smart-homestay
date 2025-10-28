import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import MainEmployeeProfile from '~/components/pages/employee-profile/MainEmployeeProfile';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Quản lý hồ sơ nhân viên</title>
				<meta name='description' content='Quản lý hồ sơ nhân viên' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<MainEmployeeProfile />
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout>{Page}</BaseLayout>;
};

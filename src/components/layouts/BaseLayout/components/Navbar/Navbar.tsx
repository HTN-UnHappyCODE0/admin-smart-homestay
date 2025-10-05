import React, {useCallback, useEffect, useState} from 'react';

import {PropsNavbar} from './interfaces';
import styles from './Navbar.module.scss';
import Link from 'next/link';
import {Menus, PATH} from '~/constants/config';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import {useRouter} from 'next/router';
import clsx from 'clsx';
import Tippy from '@tippyjs/react';
import useWindowWidth from '~/common/hooks/useWindowWidth';
import {Notification, UserEdit} from 'iconsax-react';
import {IoLogOutOutline} from 'react-icons/io5';

function Navbar({}: PropsNavbar) {
	const router = useRouter();
	const width = useWindowWidth({debounceMs: 150});

	const [small, setSmall] = useState<boolean>(false);

	const checkActive = useCallback(
		(pathname: string) => {
			const currentRoute = router.pathname.split('/')[1];

			return pathname == `/${currentRoute}`;
		},
		[router]
	);

	useEffect(() => {
		if (width <= 1200) setSmall(true);
	}, [width]);

	return (
		<div className={clsx(styles.container, {[styles.small]: small})}>
			<div className={styles.head}>
				<Link href={PATH.Home} className={styles.logo}>
					<Image alt='Logo' src={icons.logo} width={44} height={44} />
				</Link>
				<div className={styles.menu_line} onClick={() => setSmall(!small)}>
					<Image alt='Menu line' src={icons.menuLine} width={24} height={24} />
				</div>
			</div>

			<div className={styles.menus}>
				{Menus.map((menu, i) => (
					<div key={i} className={styles.menu}>
						<h5>{menu.title}</h5>
						{menu.group.map((tab, y) => (
							<Tippy key={y} content={tab.title} disabled={!small}>
								<Link href={tab.path} className={clsx(styles.tab, {[styles.active]: checkActive(tab.pathActive)})}>
									<tab.icon size={22} className={styles.icon} />
									<p>{tab.title}</p>
								</Link>
							</Tippy>
						))}
					</div>
				))}
			</div>

			<div className={styles.line}></div>
			<div className={styles.actions}>
				<Tippy content='Trang cá nhân'>
					<div className={styles.action}>
						<UserEdit size={22} className={styles.action_icon} />
					</div>
				</Tippy>
				<div
					className={styles.action_line}
					style={{width: small ? '20px' : '1px', height: small ? '1px' : '16px', background: '#f4f5f6'}}
				></div>
				<Tippy content='Thông báo'>
					<div className={styles.action}>
						<Notification size={22} className={styles.action_icon} />
						<div className={styles.noti}>99</div>
					</div>
				</Tippy>
			</div>
			<Tippy content='Đăng xuất'>
				<div className={styles.profile}>
					<div className={styles.info}>
						<Image
							alt='Avatar'
							src={icons.avatar}
							width={small ? 32 : 40}
							height={small ? 32 : 40}
							style={{borderRadius: '50%', border: '1px solid #20C874'}}
						/>
						<div className={styles.name}>
							<h5>Nguyễn Văn A</h5>
							<p>Admin</p>
						</div>
					</div>
					<IoLogOutOutline size={24} color='#EE0033' />
				</div>
			</Tippy>
		</div>
	);
}

export default Navbar;

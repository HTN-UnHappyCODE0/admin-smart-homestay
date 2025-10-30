import FlexLayout from '~/components/layouts/FlexLayout';
import styles from './InfoDetail.module.scss';
import {PropsInfoDetail} from './interfaces';
import Image from 'next/image';

import lgShare from 'lightgallery/plugins/share';
import lgHash from 'lightgallery/plugins/hash';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import {useRef} from 'react';
import clsx from 'clsx';

function InfoDetail({name, value, textColor, images = [], actions, isMarginTop}: PropsInfoDetail) {
	const refLightGallery = useRef<any>(null);

	return (
		<div className={clsx(styles.info_detail, {[styles.margin_top]: isMarginTop})}>
			<p className={styles.name}>{name}</p>

			{images?.length > 0 ? (
				<LightGallery
					plugins={[lgZoom, lgShare, lgHash]}
					selector={'.slick__slide'}
					speed={500}
					onInit={(detail: any) => {
						refLightGallery.current = detail.instance;
					}}
				>
					<FlexLayout row gap-6 wrap>
						{images?.map((image, index) => (
							<a key={index} className={'slick__slide'} data-src={image}>
								<Image
									alt={`Ảnh chi tiết ${index + 1}`}
									src={image}
									width={80}
									height={80}
									style={{cursor: 'pointer', borderRadius: '8px', objectFit: 'cover'}}
								/>
							</a>
						))}
					</FlexLayout>
				</LightGallery>
			) : (
				<div style={{color: !!textColor && !actions ? textColor : ''}} className={styles.value}>
					{actions || value || '---'}
				</div>
			)}
		</div>
	);
}

export default InfoDetail;

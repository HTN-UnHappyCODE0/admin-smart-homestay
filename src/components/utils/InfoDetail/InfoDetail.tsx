import FlexLayout from '~/components/layouts/FlexLayout';
import styles from './InfoDetail.module.scss';
import {PropsInfoDetail} from './interfaces';
import Image from 'next/image';

import lgShare from 'lightgallery/plugins/share';
import lgHash from 'lightgallery/plugins/hash';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import {useRef} from 'react';

function InfoDetail({name, value, images = []}: PropsInfoDetail) {
	const refLightGallery = useRef<any>(null);

	return (
		<div className={styles.info_detail}>
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
									objectFit='cover'
									style={{cursor: 'pointer', borderRadius: '8px'}}
								/>
							</a>
						))}
					</FlexLayout>
				</LightGallery>
			) : (
				<div className={styles.value}>{value}</div>
			)}
		</div>
	);
}

export default InfoDetail;

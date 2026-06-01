'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import type {NamespaceKeys} from "use-intl";

// Guest photos data
const guestPhotos = [
	{
		id: 1,
		image: '/images/home-reviews/review-1.png',
		alt: 'Happy guest at SEN SPA Da Nang',
		instagramUrl: 'https://www.instagram.com/senspadanang21/#'
	},
	{
		id: 2,
		image: '/images/home-reviews/review-2.png',
		alt: 'Guest enjoying spa treatment',
		instagramUrl: 'https://www.instagram.com/senspadanang21/#'
	},
	{
		id: 3,
		image: '/images/home-reviews/review-3.png',
		alt: 'Relaxed guest after massage',
		instagramUrl: 'https://www.instagram.com/senspadanang21/#'
	},
	{
		id: 4,
		image: '/images/home-reviews/review-4.png',
		alt: 'Happy friends at spa',
		instagramUrl: 'https://www.instagram.com/senspadanang21/#'
	},
	{
		id: 5,
		image: '/images/home-reviews/review-5.png',
		alt: 'Happy experience at spa',
		instagramUrl: 'https://www.instagram.com/senspadanang21/#'
	}
];

const Guests: React.FC = () => {
	const t = useTranslations('guests' as NamespaceKeys<string, string> );

	return (
		<div className="s sH s6">
			<div className="container">
				<div className="s_h">
					<h2 className="s_t">{t('title')}</h2>
					<p className="s_p">{t('subtitle')}</p>
				</div>

				<div className="s6_m">
					{guestPhotos.map((photo, index) => (
						<Link
							key={photo.id}
							href={photo.instagramUrl}
							className="s6_i"
							target="_blank"
							rel="nofollow"
						>
							<Image
								src={photo.image}
								alt={photo.alt}
								width={300}
								height={300}
								loading={index < 2 ? 'eager' : 'lazy'}
								sizes="(max-width: 768px) 50vw, 300px"
								className="guest-photo"
							/>
							<span className="s6_a fa fa-instagram"></span>
						</Link>
					))}
				</div>

				<div className="s6_f fl fl-2">
					<Link
						className="btn btn-2 s6_fa"
						href="https://www.google.com/maps/place/SEN+SPA+Da+Nang/@16.0622069,108.1608071,14509m/data=!3m1!1e3!4m8!3m7!1s0x314219ab5d9436d3:0x3a78e723f58964c7!8m2!3d16.0648855!4d108.2230748!9m1!1b1!16s%2Fg%2F11vpd2vhbm?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D" 
						rel="nofollow"
						target="_blank"
					>
						{t('seeMoreReview')}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Guests;



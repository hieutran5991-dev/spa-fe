'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'
import type { NamespaceKeys } from 'use-intl'
import type { SpaLocation } from '@/types/api'
import BookingForm from './BookingForm'
import People from "@/components/home/People";
import Guests from "@/components/home/Guests";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { Product } from "@/types/common";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

interface HomeContentProps {
  spaLocations: SpaLocation[]
  products: Product[]
  isBookingNow: boolean
}

const HomeContent = ({ spaLocations, products, isBookingNow }: HomeContentProps) => {
  const t = useTranslations('home' as NamespaceKeys<any, any>)
  const tCommon = useTranslations('common' as NamespaceKeys<any, any>)
  const heroBanners = [
    {
      id: 1,
      src: '/images/home-swiper/Swiper.jpg',
      alt: 'SEN SPA Da Nang Banner'
    },
    {
      id: 2,
      src: '/images/home-swiper/Swiper-1.jpg',
      alt: 'SEN SPA Da Nang Banner 2'
    },
    {
      id: 3,
      src: '/images/home-swiper/Swiper-2.jpg',
      alt: 'SEN SPA Da Nang Banner 3'
    },
    {
      id: 4,
      src: '/images/home-swiper/Swiper-3.jpg',
      alt: 'SEN SPA Da Nang Banner 4'
    },
    {
      id: 5,
      src: '/images/home-swiper/Swiper-4.jpg',
      alt: 'SEN SPA Da Nang Banner 5'
    }
  ]

  const heroContent = {
    tagline: t('hero.tagline'),
    title: t('hero.title'),
    subtitle: t('hero.subtitle')
  }

  const aboutContent = {
    description: t('about.description')
  }

  const whyChooseUsSection = {
    title: t('whyChooseUs.title'),
    subtitle: t('whyChooseUs.subtitle'),
    features: [
      {
        id: 1,
        icon: 'ic ic-group',
        title: t('whyChooseUs.features.couples.title'),
        description: t('whyChooseUs.features.couples.description')
      },
      {
        id: 2,
        icon: 'ic ic-location',
        title: t('whyChooseUs.features.location.title'),
        description: t('whyChooseUs.features.location.description')
      },
      {
        id: 3,
        icon: 'ic ic-service',
        title: t('whyChooseUs.features.service.title'),
        description: t('whyChooseUs.features.service.description')
      }
    ]
  }

  return (
    <>
      <div className='s a1'>
        <div className='a1_s'>
          <Swiper
            className='a1_sw swiper swiper-fade'
            modules={[Autoplay, EffectFade, Pagination]}
            effect='fade'
            loop={false}
            rewind
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
            }}
            pagination={{
              el: '.a1_sn',
              clickable: true,
            }}
          >
            {heroBanners.map((banner) => (
              <SwiperSlide key={banner.id}>
                <div className='a1_i'>
                  <Image
                    src={banner.src}
                    alt={banner.alt}
                    width={1200}
                    height={600}
                    sizes='100vw'
                    priority={banner.id === 1}
                    loading={banner.id === 1 ? undefined : 'lazy'}
                    fetchPriority={banner.id === 1 ? 'high' : 'auto'}
                    quality={banner.id === 1 ? 90 : 85}
                  />
                </div>
              </SwiperSlide>
            ))}
            <div className='a1_sn swiper-pagination' />
          </Swiper>
        </div>
        <div className='a1_l text-center'>{heroContent.tagline}</div>
        <div className='a1_c text-center'>
          <h1 className='a1_ct'>{heroContent.title}</h1>
          <p className='a1_cp'>{heroContent.subtitle}</p>
        </div>

        <div className='s1'>
          <BookingForm spaLocations={spaLocations}>
            <div className='s1_t hidden-lg hidden-md'>
              <strong>{t('title')}</strong>
              <i className='s1_z ic ic-close'></i>
            </div>
          </BookingForm>
        </div>
        {isBookingNow
          ? <span className='a1_a btn hidden-lg hidden-md'>{t('bookNow')}</span>
          : <a className='a1_a btn hidden-lg hidden-md tw:text-white' href='/menu-prices'>{t('bookNow')}</a>
        }        
      </div>

      <div className='s sH s2'>
        <div className='container'>
          <div className='s2_o text-center'>
            <p>
              {aboutContent.description.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < aboutContent.description.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
          <div className='text-center hidden-lg hidden-md'>
            <span className='s2_v'>{tCommon('common.viewAll')}</span>
          </div>
        </div>
      </div>

      <FeaturedProducts spaLocations={spaLocations} products={products} />

      <People />

      <Guests />

      {/* Why Choose Us Section */}
      <div className='s sH s7'>
        <div className='container'>
          <div className='s_h'>
            <h2 className='s_t'>{whyChooseUsSection.title}</h2>
            <p className='s_p'>{whyChooseUsSection.subtitle}</p>
          </div>
          <div className='s7_m'>
            <div className='s_g x3'>
              {whyChooseUsSection.features.map((feature) => (
                <div key={feature.id} className='s_gc'>
                  <div className='s7_i'>
                    <div className='s7_a'>
                      <i className={feature.icon}></i>
                    </div>
                    <div className='s7_c'>
                      <h3 className='s7_t' dangerouslySetInnerHTML={{ __html: feature.title }}></h3>
                      <p className='s7_p'>{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeContent

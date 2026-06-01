import "@/css/home.css";
import Layout from "@/components/layout/Layout";
import HomeContent from "@/components/HomeContent";
import Script from "next/script";
import { getListProducts, getListSpa } from "@/api/common";
import { CONFIG, DOMAIN_URL } from "@/utils/constants";
import { Metadata } from "next";
import { getJSFileWithCacheBusting } from "@/utils/cacheBusting";

export const metadata: Metadata = {
  title: "SEN SPA Da Nang | Best Spa Da Nang for Massage & Relaxation",
  description:
    "Discover SEN SPA – the best spa Da Nang for massage, relaxation & wellness. Experience luxury treatments in Da Nang's most trusted spa.",
  robots:
    "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  alternates: {
    canonical: `${DOMAIN_URL}/`,
  },
  openGraph: {
    title: "SEN SPA Da Nang | Best Spa Da Nang for Massage & Relaxation",
    description:
      "Discover SEN SPA – the best spa Da Nang for massage, relaxation & wellness. Book your spa experience today.",
    type: "website",
    url: `${DOMAIN_URL}/`,
    images: [
      {
        url: `${DOMAIN_URL}/images/seo/home.jpg`,
        width: 1200,
        height: 630,
        alt: "SEN SPA Da Nang",
      },
    ],
    siteName: "SEN SPA Da Nang",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEN SPA Da Nang | Best Spa Da Nang for Massage & Relaxation",
    description:
      "Discover SEN SPA – the best spa Da Nang for massage, relaxation & wellness. Book your spa experience today.",
    images: [`${DOMAIN_URL}/images/seo/home.jpg`],
  },
  other: {
    "geo.region": "VN-ĐN",
    "geo.placename": "Da Nang",
    "geo.position": "16.0648855;108.2230748",
    ICBM: "16.0648855, 108.2230748",
  },
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ booking_now?: string }>;
}) {
  const { booking_now } = await searchParams;
  const isBookingNow = booking_now !== "menu";

  const spaLocationRes = await getListSpa();
  const spaLocations = spaLocationRes?.data || [];

  const productRes = await getListProducts({ is_featured: true });
  const products = productRes?.data || [];

  return (
    <>
      <Layout className="home-container" spaLocations={spaLocations}>
        <HomeContent
          spaLocations={spaLocations}
          products={products}
          isBookingNow={isBookingNow}
        />
      </Layout>

      {/* JSON-LD: LocalBusiness (Spa) */}
      <Script
        id="spa-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Spa",
            name: CONFIG.SPA_NAME,
            url: `${DOMAIN_URL}/`,
            image: `${DOMAIN_URL}/images/seo/home.jpg`,
            description:
              "SEN SPA – the best spa Da Nang for massage, relaxation & wellness. Luxury treatments for couples and families.",
            telephone: CONFIG.PHONE_WITH_COUNTRY_CODE,
            email: CONFIG.MAIL,
            priceRange: "$$",
            currenciesAccepted: "VND",
            paymentAccepted: "Cash, Credit Card",
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "21 Thai Phien Street, Phuoc Ninh Ward, Hai Chau District",
              addressLocality: "Da Nang",
              addressCountry: "VN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 16.0648855,
              longitude: 108.2230748,
            },
            areaServed: "Da Nang",
            sameAs: [
              "https://maps.app.goo.gl/xrjA7b8YpQhA3q1b9",
              "https://www.facebook.com/profile.php?id=61554952904145",
              "https://www.instagram.com/senspadanang21",
            ],
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ],
              opens: "10:00",
              closes: "21:00",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Spa & Massage Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Aroma Massage",
                    areaServed: "Da Nang",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Hot Stone Massage",
                    areaServed: "Da Nang",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Thai Stretch (No Oil)",
                    areaServed: "Da Nang",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Couple Massage",
                    areaServed: "Da Nang",
                  },
                },
              ],
            },
          }),
        }}
      />

      {/* JSON-LD: FAQPage */}
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Where is SEN SPA Da Nang located?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "SEN SPA Da Nang is located at 21 Thai Phien Street, Phuoc Ninh Ward, Hai Chau District, Da Nang, Vietnam.",
                },
              },
              {
                "@type": "Question",
                name: "What are the opening hours?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We are open daily from 10:00 AM to 09:00 PM.",
                },
              },
              {
                "@type": "Question",
                name: "How can I contact SEN SPA?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `You can call us at ${CONFIG.PHONE_WITH_COUNTRY_CODE} or email ${CONFIG.MAIL}.`,
                },
              },
              {
                "@type": "Question",
                name: "Does SEN SPA offer couple massage?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, we provide private couple massage rooms, perfect for couples and families.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need to book in advance?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We recommend booking in advance via website or phone, especially during weekends and peak tourist season.",
                },
              },
              {
                "@type": "Question",
                name: "What payment methods are accepted?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We accept both cash and major credit/debit cards.",
                },
              },
              {
                "@type": "Question",
                name: "Is there parking near SEN SPA?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, there is nearby motorbike parking and public car parking within walking distance. Contact reception for directions.",
                },
              },
            ],
          }),
        }}
      />

      <Script src={getJSFileWithCacheBusting('common.js')} strategy="afterInteractive" />
    </>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useTranslations } from "next-intl";
import type { NamespaceKeys } from "use-intl";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Ben Joseph Evangelista",
    location: "USA",
    date: "May 2025",
    rating: 5,
    image: "/images/fb/1.png",
    review:
      "This was such an amazing experience from start to finish. Massage quality is great with the perfect pressure applied. Very good location and there is a discount of 10% during mornings. Highly recommended for rejuvenation and Vietnamese hospitality",
    reviewLink: "https://maps.app.goo.gl/LMHV3hnKKM3Hh9VY9",
  },
  {
    id: 2,
    name: "Tessa Sng",
    location: "Seoul, South Korea",
    date: "May 2025",
    rating: 5,
    image: "/images/fb/2.png",
    review:
      "I booked 90-minute body massages for me and my friends. It was lovely, and they released our tension, and we all managed to relax and even doze off during the session. We were greeted with warm towels to freshen up and brought to our room for the massage. The room is very clean and we had a wonderful time. The location is near Han market, which makes it attractive to pop by after your shopping. Price is attractive, too. I'm definitely recommending this place!",
    reviewLink: "https://maps.app.goo.gl/5WERh37HPrRgZDJZ9",
  },
  {
    id: 3,
    name: "Mae Ramos",
    location: "Philippines",
    date: "May 2025",
    rating: 5,
    image: "/images/fb/3.png",
    review:
      "We went to this spa to relax while waiting for our evening flight in Da Nang. This is near our hotel and the ambiance looks really nice. The staffs are all nice, providing some tea and snacks while we wait and also after our massage. We feel so relaxed and great afterwards. I highly recommend this spa.",
    reviewLink: "https://maps.app.goo.gl/cmY3bjjSwLfyPcqc9",
  },
  {
    id: 4,
    name: "Katrina Lewis",
    location: "Australia",
    date: "May 2025",
    rating: 5,
    image: "/images/fb/4.png",
    review:
      'The best massage in Vietnam!! Super friendly, great English and was a beautiful facilities. Would highly recommend!! A++ (thank you to the therapist "Van" you were amazing)) :-)',
    reviewLink: "https://maps.app.goo.gl/zLVPDDhgXcDBaPh27",
  },
  {
    id: 5,
    name: "Patricia H.",
    location: "Hamburg, Germany",
    date: "February 2025",
    rating: 5,
    image: "/images/fb/5.png",
    review:
      "Wonderful Experience at Sen Spa! I had the Back and Shoulder Therapy at Sen Spa in Da Nang, and it was amazing! The staff were warm and professional, and the atmosphere was incredibly relaxing. The massage was perfect—great pressure, skilled techniques, and total relaxation. A lovely touch was the delicious tea served before and after the treatment. I left feeling refreshed and completely tension-free. Highly recommend! I will definitely be back.",
    reviewLink: "https://maps.app.goo.gl/choVqM7vZFqVufLb8",
  },
  {
    id: 6,
    name: "Ting Fung Lam",
    location: "Hong Kong",
    date: "March 2025",
    rating: 5,
    image: "/images/fb/6.png",
    review:
      "The experience was amazing! Therapist was great and the foot massage we had was refreshing! Highly recommend to those we want to relax after a whole day walk.",
    reviewLink: "https://maps.app.goo.gl/rAhcbrVqRH9m5yis6",
  },
  {
    id: 7,
    name: "Agnieszka Chrusciel",
    location: "Peru",
    date: "March 2025",
    rating: 5,
    image: "/images/fb/7.png",
    review:
      "It was such a nice time spent there... I was warmly welcome and could think what I need and want with a nice tea in my hand. Then the lady who did the massage was paying attention to everything I've noted at my massage request and the pressure was just perfect! I needed to feel so cared for.. and after the massage I'm brand new person 😁",
    reviewLink: "https://maps.app.goo.gl/bYv3C9uhMHtk3ff39",
  },
  {
    id: 8,
    name: "Jamie Lee",
    location: "United Kingdom",
    date: "March 2025",
    rating: 5,
    image: "/images/fb/8.png",
    review:
      "What a great spa experience at Da Nang. Friendly and accommodating receptionist. The massage is just so comfortable. I really enjoyed it a lot.",
    reviewLink: "https://maps.app.goo.gl/CahN7DkRvb1RL9Rp6",
  },
  {
    id: 9,
    name: "Jessie Fa",
    location: "Australia",
    date: "December 2024",
    rating: 5,
    image: "/images/fb/9.png",
    review:
      "The ladies at the front desk were very attentive and helpful! Booking our massage packages over the phone and through WhatsApp was easy. They responded very promptly and also spoke fluent English. The place was very clean and relaxing. Massage was lovely and the massage therapists checked in frequently to make sure we were happy with the pressure. We felt very comfortable and enjoyed coming here 😊",
    reviewLink: "https://maps.app.goo.gl/AaBA4Qq6nAPpWVXn8",
  },
  {
    id: 10,
    name: "shreya mittal",
    location: "United Kingdom",
    date: "December 2024",
    rating: 5,
    image: "/images/fb/10.png",
    review:
      "Really enjoyed the experience. Very friendly and warm reception served with tea and cookies. Later the 30 minutes head and foot massage were heavenly after a long tiring day. Prices were justified with the quality of service we get there. Highly recommend.",
    reviewLink: "https://maps.app.goo.gl/sY4Uq1BbiYp9txfx6",
  },
];

const People: React.FC = () => {
  const tCommon = useTranslations("common" as NamespaceKeys<string, string>);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [autoplayEnabled, setAutoplayEnabled] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setAutoplayEnabled(entry.isIntersecting),
      { rootMargin: "100px", threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="s sH s5" ref={sectionRef}>
      <div className="container">
        <div className="s_h">
          <h2 className="s_t">{tCommon("testimonials.title")}</h2>
          <p className="s_p">{tCommon("testimonials.description")}</p>
        </div>

        <div className="s5_m">
          <div className="s5_mw">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              loop={false}
              rewind
              watchSlidesProgress
              autoplay={
                autoplayEnabled
                  ? { delay: 5000, disableOnInteraction: false }
                  : false
              }
              pagination={{ clickable: true, dynamicBullets: true }}
              breakpoints={{
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 40 },
              }}
              modules={[Pagination, Autoplay]}
              className="s5_sw"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="s5_i">
                    <div className="s5_iw">
                      <div className="s5_a">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={380}
                          height={300}
                          loading={index < 3 ? "eager" : "lazy"}
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
                        />
                      </div>

                      <div className="s5_b">
                        <div className="s5_r">
                          <div className="rv1">
                            <span
                              style={{
                                width: `${(testimonial.rating / 5) * 100}%`,
                              }}
                            ></span>
                          </div>
                        </div>

                        <figure className="s5_q">
                          <blockquote>
                            <p>{testimonial.review}</p>
                          </blockquote>
                          <figcaption>{testimonial.name}</figcaption>
                        </figure>

                        <p>
                          {testimonial.location} - {testimonial.date}
                        </p>

                        <a
                          href={testimonial.reviewLink}
                          target="_blank"
                          rel="nofollow"
                          className="tw:text-inherit tw:no-underline tw:hover:text-[var(--hover-color)] tw:cursor-pointer"
                        >
                          <Image
                            src="/images/google.svg"
                            alt="View on google maps"
                            width={100}
                            height={20}
                            loading="lazy"
                            className="tw:mx-auto"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default People;

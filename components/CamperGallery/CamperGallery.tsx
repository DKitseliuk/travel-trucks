'use client';

import styles from './CamperGallery.module.css';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import Image from 'next/image';
import { useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { GalleryImage } from '@/types/gallery-image';

type CamperGalleryProps = {
  gallery?: GalleryImage[];
};

const CamperGallery = ({ gallery }: CamperGalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>();

  if (!gallery)
    return (
      <div className={styles.galleryWrapper}>
        <p>No images</p>
      </div>
    );

  return (
    <div className={styles.galleryWrapper}>
      <Swiper
        loop={true}
        spaceBetween={32}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.mainImageSwiper}
      >
        {gallery.map((image) => (
          <SwiperSlide key={image.id}>
            <div className={styles.mainImageWrapper}>
              <Image
                src={image.original}
                alt={`Camper with id ${image.camperId}`}
                fill
                sizes="640px"
                loading="eager"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        loop={true}
        spaceBetween={32}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.navImageSwiper}
      >
        {gallery.map((image) => (
          <SwiperSlide key={image.id}>
            <div className={styles.navImageWrapper}>
              <Image
                src={image.original}
                alt={`Camper with id ${image.camperId}`}
                fill
                sizes="136px"
                loading="eager"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CamperGallery;

import styles from './page.module.css';
import { Metadata } from 'next';
import LinkButton from '@/components/LinkButton/LinkButton';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Travel Trucks',
  description:
    'Explore a wide range of camper vans and travel trucks for your next adventure. Find the perfect vehicle for comfortable and unforgettable road trips.',
  keywords: [
    'travel trucks',
    'camper rental',
    'RV rental',
    'van life',
    'camping vehicles',
    'road trip',
    'travel van',
    'camper vans',
    'outdoor travel',
  ],
  openGraph: {
    title: 'Travel Trucks',
    description:
      'Explore a wide range of camper vans and travel trucks for your next adventure. Find the perfect vehicle for comfortable and unforgettable road trips.',
    type: 'website',
    url: SITE_URL,
    siteName: 'Travel Trucks',
    images: [
      {
        url: `${SITE_URL}/img/banner.webp`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Trucks',
    description:
      'Explore a wide range of camper vans and travel trucks for your next adventure. Find the perfect vehicle for comfortable and unforgettable road trips.',
    images: [`${SITE_URL}/img/banner.webp`],
  },
};

const Home = () => {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.wrapper}`}>
        <h1 className={styles.title}>Campers of your dreams</h1>
        <p className={styles.description}>
          You can find everything you want in our catalog
        </p>
        <LinkButton href="/catalog">View now</LinkButton>
        <picture>
          <source
            media="(min-width: 1440px)"
            srcSet="/img/hero/hero-desktop@2x.webp 2x, /img/hero/hero-desktop@1x.webp 1x"
          />
          <img
            className={styles.image}
            width="1440"
            height="696"
            srcSet="/img/hero/hero-desktop@2x.webp 2x, /img/hero/hero-desktop@1x.webp 1x"
            src="/img/hero/hero-desktop@1x.webp"
            alt="Camping"
            fetchPriority="high"
          />
        </picture>
      </div>
    </section>
  );
};

export default Home;

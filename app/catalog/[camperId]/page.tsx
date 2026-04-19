import styles from './page.module.css';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCamper, getCamperReviews } from '@/lib/api/clientApi';
import CamperGallery from '@/components/CamperGallery/CamperGallery';
import CamperDetails from '@/components/CamperDetails/CamperDetails';
import ReviewsList from '@/components/ReviewsList/ReviewsList';
import BookingForm from '@/components/BookingForm/BookingForm';

type CamperDetailsPageProps = {
  readonly params: Promise<{ camperId: string }>;
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const generateMetadata = async ({
  params,
}: CamperDetailsPageProps): Promise<Metadata> => {
  const { camperId } = await params;
  const camper = await getCamper(camperId);

  if (!camper) {
    return {
      title: 'Camper not found | Travel Trucks',
      description: 'The requested camper could not be found.',
    };
  }

  const description =
    camper.description.length > 140
      ? camper.description
          .slice(0, 140)
          .split(' ')
          .slice(0, -1)
          .join(' ')
          .replace(/[.,!?;:]+$/, '') + '...'
      : camper.description;

  const image = camper?.gallery?.[0]?.original ?? `${SITE_URL}/img/banner.webp`;

  return {
    metadataBase: new URL(SITE_URL),
    title: `${camper.name} | Travel Trucks`,
    description,
    openGraph: {
      title: `${camper.name} | Travel Trucks`,
      description,
      type: 'article',
      url: `${SITE_URL}/catalog/${camperId}`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${camper.name} | Travel Trucks`,
      description,
      images: [image],
    },
  };
};

const CamperDetailsPage = async ({ params }: CamperDetailsPageProps) => {
  const { camperId } = await params;

  const [camper, reviews] = await Promise.all([
    getCamper(camperId),
    getCamperReviews(camperId),
  ]).catch(() => notFound());

  return (
    <>
      <section className={styles.top}>
        <div className={`container ${styles.details}`}>
          <CamperGallery gallery={camper.gallery} />
          <CamperDetails camper={camper} />
        </div>
      </section>
      <section className={styles.bottom}>
        <div className={`container ${styles.reviews}`}>
          <h2 className={styles.reviewTitle}>Reviews</h2>
          <ReviewsList reviews={reviews} />
          <BookingForm camperId={camperId} />
        </div>
      </section>
    </>
  );
};

export default CamperDetailsPage;

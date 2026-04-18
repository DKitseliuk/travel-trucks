import styles from './page.module.css';
import { notFound } from 'next/navigation';
import { getCamper, getCamperReviews } from '@/lib/api/clientApi';
import CamperGallery from '@/components/CamperGallery/CamperGallery';
import CamperDetails from '@/components/CamperDetails/CamperDetails';
import ReviewsList from '@/components/ReviewsList/ReviewsList';
import BookingForm from '@/components/BookingForm/BookingForm';
import { Metadata } from 'next';

type CamperDetailsPageProps = {
  readonly params: Promise<{ camperId: string }>;
};

const SITE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export const generateMetadata = async ({
  params,
}: CamperDetailsPageProps): Promise<Metadata> => {
  const { camperId } = await params;
  const camper = await getCamper(camperId);

  return {
    title: `Camper: ${camper.name}`,
    description: `${camper.description.slice(0, 27).trim()}...`,
    openGraph: {
      title: `Camper: ${camper.name}`,
      description: `${camper.description.slice(0, 27).trim()}...`,
      url: `${SITE_URL}/catalog/${camperId}`,
      images: [
        {
          url: `${SITE_URL}/img/banner.webp`,
          width: 1200,
          height: 630,
          alt: camper.name,
        },
      ],
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

import styles from './page.module.css';
import { notFound } from 'next/navigation';
import { getCamper, getCamperReviews } from '@/lib/api/clientApi';
import CamperGallery from '@/components/CamperGallery/CamperGallery';
import CamperDetails from '@/components/CamperDetails/CamperDetails';
import ReviewsList from '@/components/ReviewsList/ReviewsList';
import BookingForm from '@/components/BookingForm/BookingForm';

type CamperDetailsPageProps = {
  readonly params: Promise<{ camperId: string }>;
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

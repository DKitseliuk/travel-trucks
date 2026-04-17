import ReviewCard from '../ReviewCard/ReviewCard';
import styles from './ReviewsList.module.css';

import { Review } from '@/types/review';

type ReviewsListProps = {
  readonly reviews: Review[];
};

const ReviewsList = ({ reviews }: ReviewsListProps) => {
  return (
    <ul className={styles.reviewsList}>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </ul>
  );
};

export default ReviewsList;

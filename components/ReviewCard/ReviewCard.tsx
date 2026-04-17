import Rating from '../Rating/Rating';
import styles from './ReviewCard.module.css';
import { Review } from '@/types/review';

type ReviewCardProps = {
  readonly review: Review;
};

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <li className={styles.reviewItem}>
      <div className={styles.reviewer}>
        <p className={styles.reviewerImg}>
          {review.reviewer_name.charAt(0).toLocaleUpperCase()}
        </p>
        <div className={styles.reviewerInfo}>
          <h3 className={styles.reviewerName}>{review.reviewer_name}</h3>
          <Rating rate={review.reviewer_rating} size={16} />
        </div>
      </div>
      <p className={styles.comment}>{review.comment}</p>
    </li>
  );
};

export default ReviewCard;

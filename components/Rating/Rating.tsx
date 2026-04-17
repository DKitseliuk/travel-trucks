import styles from './Rating.module.css';
import { FaStar } from 'react-icons/fa';

type RatingProps = {
  readonly rate: number;
  readonly size: number;
};

const Rating = ({ rate, size }: RatingProps) => {
  return (
    <div className={styles.rate}>
      {[1, 2, 3, 4, 5].map((i) => (
        <FaStar
          key={i}
          fill={i <= rate ? 'var(--color-accent)' : 'var(--color-border)'}
          size={size}
        />
      ))}
    </div>
  );
};
export default Rating;

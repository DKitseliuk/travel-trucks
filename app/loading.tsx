import styles from './loading.module.css';
import { RotatingLines } from 'react-loader-spinner';

const Loading = () => {
  return (
    <section className={styles.loader}>
      <RotatingLines
        visible={true}
        height={80}
        width={80}
        color="var(--color-text-active)"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
      />
    </section>
  );
};

export default Loading;

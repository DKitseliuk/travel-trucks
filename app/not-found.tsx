import styles from './not-found.module.css';
import { Metadata } from 'next';
import LinkButton from '@/components/LinkButton/LinkButton';

export const metadata: Metadata = {
  title: '404 - Page not found',
  description: 'The page you are looking for does not exist.',
};

const NotFound = () => {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.wrapper}`}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Page not found</h2>
        <p className={styles.text}>
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>
        <LinkButton href="/">Go back home</LinkButton>
      </div>
    </section>
  );
};

export default NotFound;

'use client';

import styles from './error.module.css';
import { useEffect } from 'react';

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className={styles.section}>
      <div className={`container ${styles.wrapper}`}>
        <h1 className={styles.title}>Something went wrong</h1>

        <p className={styles.text}>
          We couldn’t load this page. Please try again.
        </p>

        <button onClick={() => reset()} className={styles.button}>
          Try again
        </button>
      </div>
    </section>
  );
};

export default Error;

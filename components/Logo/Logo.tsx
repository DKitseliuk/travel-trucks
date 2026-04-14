import styles from './Logo.module.css';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className={styles.link} aria-label="Travel Trucks home page">
      <svg width="136" height="16" className={styles.logo} aria-hidden="true">
        <use href="/img/logo.svg" />
      </svg>
    </Link>
  );
};

export default Logo;

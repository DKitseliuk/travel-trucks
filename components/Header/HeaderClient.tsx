'use client';

import styles from './Header.module.css';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const HeaderClient = () => {
  const pathname = usePathname();

  return (
    <ul className={styles.list}>
      <li className={styles.item}>
        <Link
          href="/"
          className={clsx(styles.link, pathname === '/' && styles.active)}
          aria-label="Travel Trucks home page"
        >
          Home
        </Link>
      </li>
      <li className={styles.item}>
        <Link
          href="/catalog"
          className={clsx(
            styles.link,
            pathname === '/catalog' && styles.active,
          )}
          aria-label="Travel Trucks catalog"
        >
          Catalog
        </Link>
      </li>
    </ul>
  );
};

export default HeaderClient;

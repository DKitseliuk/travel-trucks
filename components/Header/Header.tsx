import styles from './Header.module.css';
import Logo from '@/components/Logo/Logo';
import HeaderClient from './HeaderClient';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <nav className={styles.nav}>
          <Logo />
          <HeaderClient />
        </nav>
      </div>
    </header>
  );
};

export default Header;

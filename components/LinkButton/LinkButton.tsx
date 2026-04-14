import styles from './LinkButton.module.css';
import Link from 'next/link';

type LinkButtonProps = {
  href: string;
  children: React.ReactNode;
};

const LinkButton = ({ href, children }: LinkButtonProps) => {
  return (
    <Link href={href} className={styles.link}>
      {children}
    </Link>
  );
};

export default LinkButton;

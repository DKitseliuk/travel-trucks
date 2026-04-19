import styles from './LinkButton.module.css';
import Link from 'next/link';

type LinkButtonProps = {
  children: React.ReactNode;
  href: string;
  target?: string;
};

const LinkButton = ({ href, children, target = '_self' }: LinkButtonProps) => {
  return (
    <Link href={href} className={styles.link} target={target}>
      {children}
    </Link>
  );
};

export default LinkButton;

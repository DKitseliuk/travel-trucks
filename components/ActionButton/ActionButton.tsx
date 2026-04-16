import styles from './ActionButton.module.css';
import ButtonLoader from '../ButtonLoader/ButtonLoader';

type ActionButtonProps = {
  onClick: () => void;
  isDisabled: boolean;
  children: React.ReactNode;
};

const ActionButton = ({ onClick, isDisabled, children }: ActionButtonProps) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={isDisabled}>
      {isDisabled ? <ButtonLoader /> : children}
    </button>
  );
};

export default ActionButton;

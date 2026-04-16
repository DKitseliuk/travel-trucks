import styles from './CampersList.module.css';
import { Camper } from '@/types/camper';
import CamperCard from '../CamperCard/CamperCard';

type CampersListProps = {
  readonly campers: Camper[];
};

const CampersList = ({ campers }: CampersListProps) => {
  return (
    <ul className={styles.list}>
      {campers.map((camper) => (
        <CamperCard key={camper.id} camper={camper} />
      ))}
    </ul>
  );
};

export default CampersList;

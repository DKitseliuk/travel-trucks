import styles from './CamperDetails.module.css';

import { Camper } from '@/types/camper';
import { BsMap } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa6';
import { capitalize } from '@/helpers/capitalize';
import { divide } from '@/helpers/divide';
import { normalizeLocation } from '@/helpers/normalizeLocation';

type CamperDetailsProps = {
  readonly camper: Camper;
};

const CamperDetails = ({ camper }: CamperDetailsProps) => {
  return (
    <div className={styles.detailsWrapper}>
      <div className={styles.content}>
        <h1 className={styles.name}>{camper.name}</h1>
        <div className={styles.meta}>
          <div className={styles.reviews}>
            <FaStar fill="var(--color-accent)" size={16} />
            <span
              className={styles.reviewLabel}
            >{`${camper.rating}(${camper.totalReviews} Reviews)`}</span>
          </div>
          <div className={styles.location}>
            <BsMap fill="var(--color-text-primary)" size={16} />
            <span className={styles.locationLabel}>
              {normalizeLocation(camper.location)}
            </span>
          </div>
        </div>
        <p className={styles.price}>{`€${camper.price}`}</p>
        <p className={styles.description}>{camper.description}</p>
      </div>
      <div className={styles.characteristics}>
        <h2 className={styles.title}>Vehicle details</h2>
        <ul className={styles.amenitiesList}>
          {camper.amenities.map((amenity) => (
            <li key={amenity} className={styles.amenity}>
              {amenity.length < 3
                ? amenity.toLocaleUpperCase()
                : capitalize(amenity)}
            </li>
          ))}
        </ul>
        <div className={styles.hr} />
        <ul className={styles.characteristicsList}>
          <li className={styles.characteristicItem}>
            <p>Engine</p>
            <p>{capitalize(camper.engine)}</p>
          </li>
          <li className={styles.characteristicItem}>
            <p>Transmission</p>
            <p>{capitalize(camper.transmission)}</p>
          </li>
          <li className={styles.characteristicItem}>
            <p>Form</p>
            <p>{capitalize(camper.form)}</p>
          </li>

          <li className={styles.characteristicItem}>
            <p>Length</p>
            <p>{divide(camper.length)}</p>
          </li>
          <li className={styles.characteristicItem}>
            <p>Width</p>
            <p>{divide(camper.width)}</p>
          </li>
          <li className={styles.characteristicItem}>
            <p>Height</p>
            <p>{divide(camper.height)}</p>
          </li>
          <li className={styles.characteristicItem}>
            <p>Tank</p>
            <p>{divide(camper.tank)}</p>
          </li>
          <li className={styles.characteristicItem}>
            <p>Consumption</p>
            <p>{camper.consumption}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CamperDetails;

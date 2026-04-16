import Image from 'next/image';
import styles from './CamperCard.module.css';
import { Camper } from '@/types/camper';
import LinkButton from '../LinkButton/LinkButton';
import { FaStar } from 'react-icons/fa6';
import { BsMap } from 'react-icons/bs';
import { BsFuelPump } from 'react-icons/bs';
import { BsDiagram3 } from 'react-icons/bs';
import { IoMdCar } from 'react-icons/io';
import { capitalize } from '@/helpers/capitalize';
import { normalizeLocation } from '@/helpers/normalizeLocation';

type CamperCardProps = {
  readonly camper: Camper;
};

const CamperCard = ({ camper }: CamperCardProps) => {
  return (
    <li className={styles.card}>
      <div className={styles.image}>
        <Image
          src={camper?.coverImage || '/img/default_camper.webp'}
          alt={camper.name}
          fill
          sizes="(min-width: 1440px) 220px, 220px"
          loading="eager"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <h2 className={styles.name}>{camper.name}</h2>
            <p className={styles.price}>{`€${camper.price}`}</p>
          </div>
          <div className={styles.meta}>
            <div className={styles.reviews}>
              <FaStar
                fill="var(--color-accent)"
                stroke="var(--color-accent)"
                size={16}
              />
              <span
                className={styles.reviewLabel}
              >{`${camper.rating}(${camper.totalReviews} Reviews)`}</span>
            </div>
            <div className={styles.location}>
              <BsMap
                fill="var(--color-text-primary)"
                stroke="var(--color-text-primary)"
                size={16}
              />
              <span className={styles.locationLabel}>
                {normalizeLocation(camper.location)}
              </span>
            </div>
          </div>
        </div>
        <p className={styles.description}>
          {`${camper.description.slice(0, 60).trim()}...`}
        </p>
        <ul className={styles.infoList}>
          <li className={styles.infoItem}>
            <BsFuelPump
              fill="var(--color-text-primary)"
              stroke="var(--color-text-primary)"
              size={20}
            />
            <span className={styles.label}>{capitalize(camper.engine)}</span>
          </li>
          <li className={styles.infoItem}>
            <BsDiagram3
              fill="var(--color-text-primary)"
              stroke="var(--color-text-primary)"
              size={20}
            />
            <span className={styles.label}>
              {capitalize(camper.transmission)}
            </span>
          </li>
          <li className={styles.infoItem}>
            <IoMdCar
              fill="var(--color-text-primary)"
              stroke="var(--color-text-primary)"
              size={20}
            />
            <span className={styles.label}>{capitalize(camper.form)}</span>
          </li>
        </ul>
        <LinkButton href={`/catalog/${camper.id}`}>Show more</LinkButton>
      </div>
    </li>
  );
};

export default CamperCard;

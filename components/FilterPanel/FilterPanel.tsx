'use client';

import styles from './FilterPanel.module.css';
import { useState } from 'react';
import { BsMap } from 'react-icons/bs';
import { IoCloseOutline } from 'react-icons/io5';
import { GetAllCampersParams } from '@/types/camper';
import { DEFAULT_CATALOG_PAGINATION } from '@/constants/pagination';
import { cleanParams } from '@/helpers/cleanParams';
import { Filter } from '@/types/filter';
import { capitalize } from '@/helpers/capitalize';

type FilterPanelProps = {
  filters: Filter | undefined;
  updateParams: (newParams: GetAllCampersParams) => void;
};

const FilterPanel = ({ filters, updateParams }: FilterPanelProps) => {
  const initialFormValues: GetAllCampersParams = {
    location: '',
    form: '',
    engine: '',
    transmission: '',
  };
  const { page } = DEFAULT_CATALOG_PAGINATION;

  const [formValues, setFormValues] =
    useState<GetAllCampersParams>(initialFormValues);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    updateParams({
      ...cleanParams(formValues),
      page,
    });
  };

  const handleReset = () => {
    setFormValues(initialFormValues);
    updateParams({
      page,
    });
  };

  return (
    <aside className={styles.aside}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={`${styles.filterItem} ${styles.locationInputWrapper}`}>
          <p className={styles.groupLabel}>Location</p>
          <label className={styles.locationInputLabel}>
            <input
              className={styles.locationInput}
              type="text"
              name="location"
              value={formValues.location}
              id="location"
              placeholder="City"
              onChange={handleChange}
            />
            <BsMap
              className={styles.mapIcon}
              fill="var(--color-text-primary)"
              size={20}
            />
          </label>
        </div>

        {filters ? (
          <>
            <h2 className={styles.title}>Filters</h2>
            <ul className={styles.filterList}>
              <li className={styles.filterItem}>
                <p className={styles.groupLabel}>Camper form</p>
                <ul className={styles.variantList}>
                  {filters.forms.map((form) => (
                    <li className={styles.variantItem} key={form}>
                      <input
                        className={styles.radio}
                        type="radio"
                        id={form}
                        name="form"
                        value={form}
                        checked={formValues.form === form}
                        onChange={handleChange}
                      />
                      <label className={styles.label} htmlFor={form}>
                        {capitalize(form)}
                      </label>
                    </li>
                  ))}
                </ul>
              </li>
              <li className={styles.filterItem}>
                <p className={styles.groupLabel}>Engine</p>
                <ul className={styles.variantList}>
                  {filters.engines.map((engine) => (
                    <li className={styles.variantItem} key={engine}>
                      <input
                        className={styles.radio}
                        type="radio"
                        id={engine}
                        name="engine"
                        value={engine}
                        checked={formValues.engine === engine}
                        onChange={handleChange}
                      />
                      <label className={styles.label} htmlFor={engine}>
                        {capitalize(engine)}
                      </label>
                    </li>
                  ))}
                </ul>
              </li>
              <li className={styles.filterItem}>
                <p className={styles.groupLabel}>Transmission</p>
                <ul className={styles.variantList}>
                  {filters.transmissions.map((transmission) => (
                    <li className={styles.variantItem} key={transmission}>
                      <input
                        className={styles.radio}
                        type="radio"
                        id={transmission}
                        name="transmission"
                        value={transmission}
                        checked={formValues.transmission === transmission}
                        onChange={handleChange}
                      />
                      <label className={styles.label} htmlFor={transmission}>
                        {capitalize(transmission)}
                      </label>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </>
        ) : (
          <h2>Filter not loaded</h2>
        )}
        <div className={styles.boxBtn}>
          <button className={styles.submitBtn} type="submit">
            Search
          </button>
          <button
            className={styles.resetBtn}
            type="button"
            onClick={handleReset}
          >
            <IoCloseOutline
              fill="var(--color-text-primary)"
              stroke="var(--color-text-primary)"
              size={24}
            />
            <span>Clear filters</span>
          </button>
        </div>
      </form>
    </aside>
  );
};

export default FilterPanel;

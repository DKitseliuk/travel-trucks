'use client';

import styles from './BookingForm.module.css';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { bookingSchema } from '@/validations/bookingValidation';
import { BookingPayload } from '@/types/booking';
import { useState } from 'react';
import { sendBooking } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';
import ButtonLoader from '../ButtonLoader/ButtonLoader';

type BookingFormProps = {
  readonly camperId: string;
};

const BookingForm = ({ camperId }: BookingFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingPayload>({
    resolver: yupResolver(bookingSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });
  const onSubmit = async (formData: BookingPayload) => {
    try {
      setIsLoading(true);
      const message = await sendBooking(camperId, formData);
      reset();
      toast.success(message);
    } catch {
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Book your campervan now</h3>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label} htmlFor="name">
          <input
            className={styles.input}
            type="text"
            id="name"
            placeholder="Name*"
            {...register('name')}
          />
          <p className={styles.error}>{errors.name?.message as string}</p>
        </label>
        <label className={styles.label} htmlFor="email">
          <input
            className={styles.input}
            type="text"
            id="email"
            placeholder="Email*"
            {...register('email')}
          />
          <p className={styles.error}>{errors.email?.message as string}</p>
        </label>
        <button
          className={styles.submitBtn}
          type="submit"
          disabled={isLoading || Object.keys(errors).length > 0}
        >
          {isLoading ? (
            <ButtonLoader color="var(--color-white)" size={24} />
          ) : (
            'Send'
          )}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;

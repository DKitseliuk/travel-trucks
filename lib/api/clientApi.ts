import { api } from './api';
import {
  Camper,
  GetAllCampersParams,
  GetAllCampersResponse,
} from '@/types/camper';
import { Filter } from '@/types/filter';
import { Review } from '@/types/review';
import { BookingPayload, BookingResponse } from '@/types/booking';
import { cleanParams } from '@/helpers/cleanParams';
import { DEFAULT_CATALOG_PAGINATION } from '@/constants/pagination';

const DEFAULT_GET_ALL_CAMPERS_PARAMS: GetAllCampersParams =
  DEFAULT_CATALOG_PAGINATION;

const getFilters = async (): Promise<Filter> => {
  const { data } = await api.get<Filter>('/campers/filters');
  return data;
};

const getAllCampers = async (
  params?: GetAllCampersParams,
): Promise<GetAllCampersResponse> => {
  const cleanedParams = cleanParams(params ?? {});

  const finalParams: GetAllCampersParams = {
    ...DEFAULT_GET_ALL_CAMPERS_PARAMS,
    ...cleanedParams,
  };

  const { data } = await api.get<GetAllCampersResponse>('/campers', {
    params: finalParams,
  });
  return data;
};

const getCamper = async (camperId: string): Promise<Camper> => {
  const { data } = await api.get<Camper>(`/campers/${camperId}`);
  return data;
};

const getCamperReviews = async (camperId: string): Promise<Review[]> => {
  const { data } = await api.get<Review[]>(`/campers/${camperId}/reviews`);
  return data;
};

const sendBooking = async (
  camperId: string,
  payload: BookingPayload,
): Promise<string> => {
  const { data } = await api.post<BookingResponse>(
    `/campers/${camperId}/booking-requests`,
    payload,
  );
  return data.message;
};

export { getFilters, getAllCampers, getCamper, getCamperReviews, sendBooking };

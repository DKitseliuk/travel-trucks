import { DEFAULT_CATALOG_PAGINATION } from '@/constants/pagination';
import { api } from './api';
import { GetAllCampersParams, GetAllCampersResponse } from '@/types/camper';
import { Filter } from '@/types/filter';
import { cleanParams } from '@/helpers/cleanParams';

const DEFAULT_GET_ALL_CAMPERS_PARAMS: GetAllCampersParams =
  DEFAULT_CATALOG_PAGINATION;

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

const getFilters = async (): Promise<Filter> => {
  const { data } = await api.get<Filter>('/campers/filters');

  return data;
};

export { getAllCampers, getFilters };

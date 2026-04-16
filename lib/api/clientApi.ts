import { DEFAULT_CATALOG_PAGINATION } from '@/constants/pagination';
import { api } from './api';
import { GetAllCampersParams, GetAllCampersResponse } from '@/types/camper';

const DEFAULT_GET_ALL_CAMPERS_PARAMS: GetAllCampersParams =
  DEFAULT_CATALOG_PAGINATION;

const getAllCampers = async (
  params?: GetAllCampersParams,
): Promise<GetAllCampersResponse> => {
  const cleanedParams = Object.fromEntries(
    Object.entries(params ?? {}).filter(([_k, v]) => v !== undefined),
  ) as GetAllCampersParams;

  const finalParams: GetAllCampersParams = {
    ...DEFAULT_GET_ALL_CAMPERS_PARAMS,
    ...cleanedParams,
  };

  const { data } = await api.get<GetAllCampersResponse>('/campers', {
    params: finalParams,
  });
  return data;
};

export { getAllCampers };

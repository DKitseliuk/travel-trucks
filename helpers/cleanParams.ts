import { GetAllCampersParams } from '@/types/camper';

const cleanParams = (obj: GetAllCampersParams) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_k, v]) => v !== undefined && v !== ''),
  ) as GetAllCampersParams;
};

export { cleanParams };

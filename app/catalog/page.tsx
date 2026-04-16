import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { GetAllCampersParams } from '@/types/camper';
import { DEFAULT_CATALOG_PAGINATION } from '@/constants/pagination';
import { getAllCampers, getFilters } from '@/lib/api/clientApi';
import CatalogClient from './Catalog.client';
import { cleanParams } from '@/helpers/cleanParams';

type CatalogProps = {
  readonly searchParams: Promise<GetAllCampersParams>;
};

const Catalog = async ({ searchParams }: CatalogProps) => {
  const cleanedParams = cleanParams((await searchParams) ?? {});

  const params: GetAllCampersParams = {
    ...cleanedParams,
    page: Number(cleanedParams.page) || DEFAULT_CATALOG_PAGINATION.page,
    perPage:
      Number(cleanedParams.perPage) || DEFAULT_CATALOG_PAGINATION.perPage,
  };

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: ['campers', params],
      queryFn: () => getAllCampers(params),
      initialPageParam: DEFAULT_CATALOG_PAGINATION.page,
    }),
    queryClient.prefetchQuery({
      queryKey: ['filters'],
      queryFn: getFilters,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient initialSearchParams={params} />
    </HydrationBoundary>
  );
};

export default Catalog;

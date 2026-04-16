import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { GetAllCampersParams } from '@/types/camper';
import { DEFAULT_CATALOG_PAGINATION } from '@/constants/pagination';
import { getAllCampers } from '@/lib/api/clientApi';
import CatalogClient from './Catalog.client';

type CatalogProps = {
  readonly searchParams: Promise<GetAllCampersParams>;
};

const Catalog = async ({ searchParams }: CatalogProps) => {
  const cleanedParams = Object.fromEntries(
    Object.entries((await searchParams) ?? {}).filter(
      ([_k, v]) => v !== undefined,
    ),
  ) as GetAllCampersParams;

  const params: GetAllCampersParams = {
    ...cleanedParams,
    page: Number(cleanedParams.page) || DEFAULT_CATALOG_PAGINATION.page,
    limit: Number(cleanedParams.limit) || DEFAULT_CATALOG_PAGINATION.limit,
  };

  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['campers', params],
    queryFn: () => getAllCampers(params),
    initialPageParam: DEFAULT_CATALOG_PAGINATION.page,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient initialSearchParams={params} />
    </HydrationBoundary>
  );
};

export default Catalog;

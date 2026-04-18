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
import { Metadata } from 'next';

type CatalogProps = {
  readonly searchParams: Promise<GetAllCampersParams>;
};

const SITE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Catalog',
  description:
    'Simple and efficient application designed for search ideal camper',
  openGraph: {
    title: 'Catalog',
    description:
      'Simple and efficient application designed for search ideal camper',
    url: `${SITE_URL}/catalog`,
    images: [
      {
        url: `${SITE_URL}/img/banner.webp`,
        width: 1200,
        height: 630,
        alt: 'Campers catalog',
      },
    ],
  },
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

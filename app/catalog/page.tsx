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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const metadata: Metadata = {
  title: 'Catalog | Travel Trucks',
  description:
    'Explore our catalog of camper vans and travel trucks. Find and filter the perfect vehicle for your next trip.',
  openGraph: {
    title: 'Catalog | Travel Trucks',
    description:
      'Explore our catalog of camper vans and travel trucks. Find and filter the perfect vehicle for your next trip.',
    type: 'website',
    url: `${SITE_URL}/catalog`,
    siteName: 'Travel Trucks',
    images: [
      {
        url: `${SITE_URL}/img/banner.webp`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Catalog | Travel Trucks',
    description:
      'Explore our catalog of camper vans and travel trucks. Find and filter the perfect vehicle for your next trip.',
    images: [`${SITE_URL}/img/banner.webp`],
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

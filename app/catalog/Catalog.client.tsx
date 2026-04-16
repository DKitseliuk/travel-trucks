'use client';

import styles from './page.module.css';
import ActionButton from '@/components/ActionButton/ActionButton';
import CampersList from '@/components/CampersList/CampersList';
import FilterPanel from '@/components/FilterPanel/FilterPanel';
import { getAllCampers, getFilters } from '@/lib/api/clientApi';
import { GetAllCampersParams } from '@/types/camper';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

type CatalogClientProps = {
  readonly initialSearchParams: GetAllCampersParams;
};

const CatalogClient = ({ initialSearchParams }: CatalogClientProps) => {
  const [params, setParams] =
    useState<GetAllCampersParams>(initialSearchParams);

  const { data: filters } = useQuery({
    queryKey: ['filters'],
    queryFn: getFilters,
    refetchOnMount: false,
  });

  const {
    isLoading,
    isError,
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['campers', params],
    queryFn: ({ pageParam = 1 }) =>
      getAllCampers({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined;
    },
  });

  const campers = data?.pages.flatMap((elem) => elem.campers) ?? [];

  return (
    <section className={styles.section}>
      <div className={`${styles.wrapper} container`}>
        <FilterPanel filters={filters} updateParams={setParams} />
        <div className={styles.content}>
          {isError ? (
            <>Something went wrong. Please try again</>
          ) : isLoading ? (
            <>Loading...</>
          ) : campers.length === 0 ? (
            <>Data not found. Please try another filters</>
          ) : (
            <>
              <CampersList campers={campers} />
              {hasNextPage && (
                <ActionButton
                  onClick={() => fetchNextPage()}
                  isDisabled={isFetchingNextPage}
                >
                  Load more
                </ActionButton>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CatalogClient;

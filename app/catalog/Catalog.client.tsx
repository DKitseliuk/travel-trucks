'use client';

import styles from './page.module.css';
import ActionButton from '@/components/ActionButton/ActionButton';
import CampersList from '@/components/CampersList/CampersList';
import { DEFAULT_CATALOG_PAGINATION } from '@/constants/pagination';
import { getAllCampers } from '@/lib/api/clientApi';
import { GetAllCampersParams } from '@/types/camper';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

type CatalogClientProps = {
  readonly initialSearchParams: GetAllCampersParams;
};

const CatalogClient = ({ initialSearchParams }: CatalogClientProps) => {
  const [params, setParams] =
    useState<GetAllCampersParams>(initialSearchParams);

  const perPage = DEFAULT_CATALOG_PAGINATION.limit;

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
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.length * perPage;
      return loaded < lastPage.total ? allPages.length + 1 : undefined;
    },
  });

  const campers = data?.pages.flatMap((elem) => elem.items) ?? [];

  return (
    <section className={styles.section}>
      <div className={`${styles.wrapper} container`}>
        <aside className={styles.aside}>Filter panel</aside>
        <div className={styles.content}>
          {isError ? (
            <>Something went wrong. Please try again</>
          ) : isLoading ? (
            <>Loading...</>
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

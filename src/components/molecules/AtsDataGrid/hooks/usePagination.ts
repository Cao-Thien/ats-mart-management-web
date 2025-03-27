'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { ResponseMeta } from 'constants/ats/response';

const usePagination = (): [onNextPage: (meta: Pick<ResponseMeta, 'currentPage' | 'pageSize'>) => void] => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onNextPage = ({ currentPage, pageSize }: Pick<ResponseMeta, 'currentPage' | 'pageSize'>) => {
    const params = new URLSearchParams(searchParams);

    params.set('currentPage', `${currentPage}`);
    params.set('pageSize', `${pageSize}`);

    replace(`${pathname}?${params.toString()}`);
  };

  return [onNextPage];
};

export default usePagination;

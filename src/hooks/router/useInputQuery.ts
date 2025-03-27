import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const useInputQuery = (
  field: string,
  emptyValue: string | number | null = null
): [string | number | null, (value?: string | number) => void] => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const changeValue = (value?: string | number) => {
    const params = new URLSearchParams(searchParams);
    if (typeof value == 'string' && value?.length < 1) {
      params.delete(field);
    } else {
      if (value || value === 0) {
        params.set(field, `${value}`);
      } else if (emptyValue) {
        params.set(field, `${emptyValue}`);
      } else {
        params.delete(field);
      }
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return [searchParams.get(field) || emptyValue, changeValue];
};

export default useInputQuery;

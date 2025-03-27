import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

// eslint-disable-next-line
type Any = any;

type ChangeValue<Values extends Record<string, Any>> = <Key extends keyof Values>(key: Key, value: Values[Key]) => void;

type ApplyChanges = () => void;

const useValuesQuery = <Values extends Record<string, Any>>(
  fields: (keyof Values)[],
  defaultValues?: Values,
  valuesOptions?: Partial<
    Record<
      keyof Values,
      {
        parser?: (value: Any) => Any;
        formatter?: (value: Any) => string | number;
      }
    >
  >
): [Values, ChangeValue<Values>, ApplyChanges] => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [values, setValues] = useState<Values>(() => {
    const params = new URLSearchParams(searchParams);
    const values: Values = {} as Values;

    for (const field of fields) {
      // @ts-ignore
      const value = params.get(field) || defaultValues?.[field];

      if (value) {
        // @ts-ignore
        values[field] = valuesOptions?.[field]?.parser ? valuesOptions[field].parser(value) : value;
      }
    }
    return values;
  });

  const changeValue = <Key extends keyof Values>(key: Key, value: Values[Key]) => {
    setValues(prevState => ({
      ...prevState,
      // @ts-ignore
      [key]: valuesOptions?.[key]?.parser ? valuesOptions[key].parser(value) : value,
    }));
  };

  const applyChanges = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('currentPage');
    params.delete('pageSize');

    // return;
    for (const field in values) {
      if (values[field]) {
        params.set(
          field,
          // @ts-ignore
          valuesOptions?.[field]?.formatter ? valuesOptions[field].formatter(values[field]) : `${values[field]}`
        );
      } else {
        params.delete(field);
      }
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return [values, changeValue, applyChanges];
};

export default useValuesQuery;

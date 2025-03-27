import { useRef, useCallback, MutableRefObject } from 'react';

type Nullable<Value> = Value | null | undefined;

type ValueMap<Value> = Record<number | string, Nullable<Value>>;

type SetValueFn<Value> = (field: number | string, newValue: Nullable<Value>) => void;

type ClearValueMapFn = () => void;

// Use in OUTER components, to store multiple input values format without triggering re-renders
// Values format:  { [field]: value }
const useValuesRef = <Values>(
  defaultValue: ValueMap<Values>
): [MutableRefObject<ValueMap<Values>>, SetValueFn<Values>, ClearValueMapFn] => {
  const valueMapRef = useRef<ValueMap<Values>>(defaultValue ?? {});

  const setValue: SetValueFn<Values> = useCallback((field, value) => {
    valueMapRef.current[field] = value;
  }, []);

  const clearValueMap: ClearValueMapFn = useCallback(() => {
    valueMapRef.current = {};
  }, []);

  return [valueMapRef, setValue, clearValueMap];
};

export default useValuesRef;

import { useRef, useCallback, MutableRefObject } from 'react';

const useValueRef = <Value>(defaultValue: Value): [MutableRefObject<Value>, (newValue: Value) => void] => {
  const valueRef = useRef<Value>(defaultValue);

  const setValue = useCallback((value: Value) => {
    valueRef.current = value;
  }, []);

  return [valueRef, setValue];
};

export default useValueRef;

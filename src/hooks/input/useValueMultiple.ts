import { ChangeEvent, useState } from 'react';

import { Any, CoreValue } from 'constants/types';
import { OnChangeMultiple } from 'constants/elements';
import { SelectOption } from 'constants/elements';

type Return<Value extends CoreValue> = {
  value: Value[];
  onChange: (event: Any, ...args: Any) => Promise<void> | void;
  onCheckAll: () => void;
};

type Props<Value extends CoreValue> = {
  targetType?: 'checked' | 'autocomplete';
  isNumber?: boolean;
  defaultValue?: Value[];
  value?: Value[];
  onChange?: OnChangeMultiple<Value>;
  options?: SelectOption[];
};

// Make value controllable instead of using DOM value
// Standardize onChange event to use value as first param
const useValueMultiple = <Value extends CoreValue = CoreValue>({
  targetType,
  isNumber,
  defaultValue,
  value,
  onChange,
  options,
}: Props<Value> = {}): Return<Value> => {
  const [stateValue, setStateValue] = useState<Value[]>(() => (defaultValue ? defaultValue : []));

  const inputValue = value ?? stateValue;

  const handleChange = (event: Any, ...args: Any[]) => {
    let newValues = [];

    // Case of Checkbox
    if (targetType === 'checked') {
      newValues = [...inputValue];

      const newValue = (
        isNumber
          ? +(event as ChangeEvent<HTMLInputElement>).target.value
          : (event as ChangeEvent<HTMLInputElement>).target.value
      ) as Value;

      if ((event as ChangeEvent<HTMLInputElement>).target.checked) {
        newValues.push(newValue);
      } else {
        newValues = newValues.filter(prevValue => prevValue != newValue);
      }
    }
    // todo: more args
    else if (targetType === 'autocomplete') {
      newValues = args[0];
    } else {
      // todo: make sure handle all cases
      newValues = (event.target.value ?? '').split(',');
    }

    setStateValue(newValues);

    if (onChange) {
      onChange(newValues, inputValue);
    }
  };

  const handleCheckAll = () => {
    let newVals: Value[] = [];

    if (stateValue.length !== (options || []).length) {
      newVals = (options || []).map(option => option.value);
    }

    setStateValue(newVals);

    if (onChange) {
      onChange(newVals, inputValue);
    }
  };

  return { value: inputValue, onChange: handleChange, onCheckAll: handleCheckAll };
};

export default useValueMultiple;

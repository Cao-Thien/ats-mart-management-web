import { useState, ReactElement } from 'react';
import cl from 'clsx';

// COMPONENTS
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

// CONSTANTS
import { Any, ID, Value } from 'constants/types';

type Option<D = Any> = { label: Any; value: D };

export type SelectOption<D = Any> = Option<D> & {
  disabled?: boolean;
  readonly?: boolean;
  icon?: ReactElement;
  treeDataPath?: ID[];
};

type ButtonSelectProps = {
  className?: string;
  name?: string;
  value?: Value[];
  defaultValue?: Value[] | null;
  onChange?: (newValue: Value[]) => void;
  options?: SelectOption[];
} & ButtonSelectUtilityProps;

const ButtonMultiSelect = ({ className, value, defaultValue, onChange, options, fullWidth }: ButtonSelectProps) => {
  const [stateValue, setStateValue] = useState<Value[]>(() => (defaultValue ? defaultValue : []));

  const selectedValue = value === undefined ? stateValue : value;

  const handleChange = (newValue: Value) => {
    const newMultiValue = selectedValue.includes(newValue)
      ? selectedValue.filter(v => v !== newValue)
      : [...selectedValue, newValue];

    if (value === undefined) setStateValue(newMultiValue);
    if (onChange) onChange(newMultiValue);
  };

  return (
    <Stack className={cl(className, getUtilityClassNames({ fullWidth }))} direction="row" gap={1} flexWrap="wrap">
      {(options || []).map((option, index) => (
        <Button
          key={index}
          color="primary"
          size="large"
          variant={selectedValue.includes(option.value) ? 'contained' : 'outlined'}
          disabled={option.disabled}
          onClick={() => handleChange(option.value)}
          disableRipple
          disableElevation
        >
          {option.label}
        </Button>
      ))}
    </Stack>
  );
};

type ButtonSelectUtilityProps = {
  fullWidth?: boolean;
};

const getUtilityClassNames = ({ fullWidth }: ButtonSelectUtilityProps) => {
  const classNames: string[] = [];
  if (fullWidth) {
    classNames.push('Box-fullWidth');
  }

  return classNames;
};

export default ButtonMultiSelect;

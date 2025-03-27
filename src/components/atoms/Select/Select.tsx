import { ReactNode, useEffect, useState } from 'react';

// COMPONENTS
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import MuiSelect, { SelectChangeEvent, SelectProps as MuiSelectProps } from '@mui/material/Select';
import { SelectOption } from 'constants/inputConstants';
import IconButton from '@mui/material/IconButton';

// CONSTANTS
import { NullableCoreValue } from 'constants/types';

type SelectSingleProps = {
  multiple?: false;
  value?: NullableCoreValue;
  defaultValue?: NullableCoreValue;
  onChange?: (value: NullableCoreValue) => void;
};

// type SelectMultipleProps = {
//   multiple: true;
//   value?: NullableCoreValue[];
//   defaultValue?: NullableCoreValue[];
//   onChange?: (value: NullableCoreValue[]) => void;
// };

export type SelectProps = Pick<
  MuiSelectProps,
  | 'label'
  | 'id'
  | 'autoWidth'
  | 'variant'
  | 'displayEmpty'
  | 'startAdornment'
  | 'endAdornment'
  | 'color'
  | 'disabled'
  | 'name'
> &
  Pick<FormControlProps, 'fullWidth' | 'error' | 'size'> & {
    options?: SelectOption[];
    fullWidth?: FormControlProps['fullWidth'];
    helperText?: ReactNode;
    emptyLabel?: string;
    optionType?: 'check';
    required?: boolean;
  } & SelectSingleProps;

const Select = ({
  id,
  helperText,
  label,
  value,
  defaultValue,
  onChange,
  fullWidth,
  optionType,
  options,
  size,
  endAdornment,
  disabled,
  ...restProps
}: SelectProps) => {
  const [inputValue, setInputValue] = useState<NullableCoreValue>(defaultValue || '');

  useEffect(() => {
    if (options?.length && defaultValue != null) {
      setInputValue(defaultValue);
    }
  }, [options, defaultValue]);

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;

    if (value === undefined) {
      setInputValue(newValue);
    }

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <FormControl fullWidth={fullWidth} size={size} error={restProps.error}>
      {label && <InputLabel id={id}>{label}</InputLabel>}

      <MuiSelect
        labelId={id}
        label={label}
        value={(value ?? inputValue) as string | undefined}
        onChange={handleChange}
        size={size}
        renderValue={optionType ? val => (val ? options?.find(option => option.value === val)?.label : '') : undefined}
        IconComponent={
          endAdornment
            ? props => (
                <IconButton color="primary" size={size} variant="contained" shape="rounded" edge="end" {...props}>
                  {endAdornment}
                </IconButton>
              )
            : undefined
        }
        disabled={disabled || !options?.length}
        {...restProps}
      >
        {options?.map(option => (
          <MenuItem key={option.value} value={option.value} className={`SelectOption-${optionType}`}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>

      {helperText && <FormHelperText error={restProps.error}>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default Select;

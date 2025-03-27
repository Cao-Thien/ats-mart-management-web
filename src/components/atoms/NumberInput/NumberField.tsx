import React, { useState } from 'react';

// COMPONENTS
import InputAdornment from '@mui/material/InputAdornment';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import IconButton from '@mui/material/IconButton';

import TextField, { TextFieldProps } from '@mui/material/TextField';

// ICONS
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export type NumberFieldProps = Omit<TextFieldProps, 'type' | 'InputProps'> & {
  // value: NumericFormatProps['value'];
  // defaultValue: NumericFormatProps['defaultValue'];
  numberProps?: Omit<
    NumericFormatProps,
    'value' | 'defaultValue' | 'customInput' | 'type' | 'displayType' | 'isAllowed' | 'color' | 'size'
  > & {
    min?: number;
    max?: number;
  };
};

const NumberField = ({
  value,
  defaultValue,
  onChange,
  numberProps: { min, max, ...numberProps } = {},
  ...restProps
}: NumberFieldProps) => {
  const [stateValue, setStateValue] = useState<NumericFormatProps['value']>(
    () => defaultValue as string | number | null | undefined
  );

  const isAllowed: NumericFormatProps['isAllowed'] =
    min != null || max != null
      ? ({ floatValue }) => {
          if (floatValue !== undefined) {
            if (min !== undefined && floatValue < min) return false;
            if (max !== undefined && floatValue > max) return false;
          }

          return true;
        }
      : undefined;

  const currentValue = value !== undefined ? value : stateValue;

  const handleChangeValue = (type: 'add' | 'minus') => {
    const val = currentValue ? +currentValue : 0;

    const nextValue = type === 'add' ? val + 1 : val - 1;

    // @ts-ignore
    if (isAllowed && !isAllowed({ floatValue: nextValue })) {
      return;
    }

    if (value === undefined) setStateValue(nextValue);

    if (onChange !== undefined) {
      // @ts-ignore
      onChange({ target: { name: restProps.name || '', value: `${nextValue}` } });
    }
  };

  return (
    <NumericFormat
      customInput={TextField}
      isAllowed={isAllowed}
      value={currentValue as NumericFormatProps['value']}
      defaultValue={defaultValue as NumericFormatProps['defaultValue']}
      onChange={onChange}
      min={0}
      InputProps={{
        inputProps: {
          sx: { padding: '8px 10px' },
        },
        endAdornment: (
          <InputAdornment position="end" sx={{ flexDirection: 'column', p: 0, gap: 0, mt: -5 }}>
            <IconButton size="small" onClick={() => handleChangeValue('add')} sx={{ p: 0 }}>
              <KeyboardArrowUpIcon fontSize="small" sx={{ height: 16 }} />
            </IconButton>
            <IconButton size="small" onClick={() => handleChangeValue('minus')} sx={{ p: 0 }}>
              <KeyboardArrowDownIcon fontSize="small" sx={{ height: 16 }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...numberProps}
      {...restProps}
    />
  );
};

export default NumberField;

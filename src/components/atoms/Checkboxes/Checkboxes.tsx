import { ReactNode } from 'react';

// COMPONENTS
import FormGroup, { FormGroupProps } from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import { SelectOption } from 'constants/elements';
import FormLabel from '@mui/material/FormLabel';

// HOOKS
import { useValueMultiple } from 'hooks/input';

// CONSTANTS
import { CoreValue } from 'constants/types';
import { OnChangeMultiple } from 'constants/elements';

export type CheckboxesProps = Omit<FormGroupProps, 'defaultValue' | 'defaultChecked' | 'onChange'> &
  Pick<FormControlProps, 'error' | 'fullWidth' | 'required' | 'disabled'> & {
    label?: ReactNode;
    isNumber?: boolean;
    options: SelectOption[];
    value?: CoreValue[];
    defaultValue?: CoreValue[];
    onChange?: OnChangeMultiple;
  } & Pick<FormControlProps, 'size'>;

const Checkboxes = ({
  label,
  isNumber,
  options,
  error,
  fullWidth,
  required,
  disabled,
  value,
  defaultValue,
  onChange,
  size,
  ...restProps
}: CheckboxesProps) => {
  const valueProps = useValueMultiple({ targetType: 'checked', isNumber, value, defaultValue, onChange, options });

  if (!label) {
    return (
      <FormGroup {...restProps} onChange={valueProps.onChange}>
        {options.map(option => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                disabled={disabled}
                checked={value !== undefined ? valueProps.value?.includes(option.value) : undefined}
                defaultChecked={defaultValue !== undefined ? defaultValue?.includes(option.value) : undefined}
                size={size}
              />
            }
            {...option}
          />
        ))}
      </FormGroup>
    );
  }

  return (
    <FormControl error={error} fullWidth={fullWidth} disabled={disabled}>
      <FormLabel id={restProps.id} error={error} required={required}>
        {label}
      </FormLabel>
      <FormGroup {...restProps} onChange={valueProps.onChange}>
        {options.map(option => (
          <FormControlLabel
            defaultChecked={defaultValue?.includes(option.value)}
            key={option.value}
            control={
              <Checkbox
                disabled={disabled}
                checked={value !== undefined ? value.some(item => item == option.value) : undefined}
                defaultChecked={defaultValue !== undefined ? defaultValue?.includes(option.value) : undefined}
                size={size}
              />
            }
            {...option}
          />
        ))}

        {/* <FormControlLabel
          key="all"
          control={<Checkbox checked={valueProps.value.length == options.length} />}
          label="All"
          value="all"
        /> */}
      </FormGroup>
      <FormControlLabel
        onChange={() => valueProps.onCheckAll()}
        control={<Checkbox checked={valueProps.value.length == options.length} />}
        label="All"
        value="all"
      />
    </FormControl>
  );
};

export default Checkboxes;

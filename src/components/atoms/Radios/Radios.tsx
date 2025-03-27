import { ReactNode } from 'react';

// COMPONENTS
import Radio from '@mui/material/Radio';
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl, { FormControlProps } from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { SelectOption } from 'constants/elements';
import FormHelperText from '@mui/material/FormHelperText';

export type RadiosProps = Omit<RadioGroupProps, 'color'> &
  Pick<FormControlProps, 'error' | 'fullWidth' | 'required' | 'disabled' | 'color'> & {
    label?: ReactNode;
    options: SelectOption[];
    helperText?: ReactNode;
  };

const Radios = ({
  label,
  color,
  options,
  error,
  helperText,
  fullWidth,
  required,
  disabled,
  ...restProps
}: RadiosProps) => {
  if (!label) {
    return (
      <RadioGroup {...restProps}>
        {options.map(option => (
          <FormControlLabel key={option.value} control={<Radio disabled={disabled} color={color} />} {...option} />
        ))}
        {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
      </RadioGroup>
    );
  }

  return (
    <FormControl error={error} fullWidth={fullWidth} disabled={disabled}>
      <FormLabel id={restProps.id} error={error} required={required}>
        {label}
      </FormLabel>
      <RadioGroup {...restProps}>
        {options.map(option => (
          <FormControlLabel key={option.value} control={<Radio disabled={disabled} color={color} />} {...option} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default Radios;

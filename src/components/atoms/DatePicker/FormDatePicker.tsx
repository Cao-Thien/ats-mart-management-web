// COMPONENTS

import { Controller, Control } from 'react-hook-form';
import DatePicker, { DatePickerProps } from './DatePicker';
import { AtsTextFieldProps } from 'components/AtsTextField';
import dayjs from 'dayjs';

export type FormDatePickerProps = AtsTextFieldProps &
  Omit<DatePickerProps, 'onChange' | 'value'> & {
    control?: Control;
    fullWidth?: boolean;
    name?: string;
  };

const FormDatePicker = ({ name, slotProps, ...restProps }: FormDatePickerProps) => {
  return (
    <Controller
      name={name!}
      render={({ field }) => {
        return <DatePicker {...field} value={field.value ? dayjs(field.value) : dayjs()} slotProps={slotProps} />;
      }}
      {...restProps}
    />
  );
};

export default FormDatePicker;

// COMPONENTS

import { Controller, Control } from 'react-hook-form';
import { TimePickerProps } from './TimePicker';
import { AtsTextFieldProps } from 'components/AtsTextField';
import dayjs from 'dayjs';
import TimePicker from './TimePicker';

export type FormDatePickerProps = AtsTextFieldProps &
  Omit<TimePickerProps, 'onChange' | 'value'> & {
    control?: Control;
    fullWidth?: boolean;
    name?: string;
  };

const FormDatePicker = ({ name, slotProps, ...restProps }: FormDatePickerProps) => {
  return (
    <Controller
      name={name!}
      render={({ field }) => {
        return <TimePicker {...field} value={field.value ? dayjs(field.value) : dayjs()} slotProps={slotProps} />;
      }}
      {...restProps}
    />
  );
};

export default FormDatePicker;

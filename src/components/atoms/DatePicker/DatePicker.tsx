'use client';

import { forwardRef } from 'react';
import { DatePicker as MuiDatePicker, DatePickerProps as MuiDatePickerProps } from '@mui/x-date-pickers/DatePicker';
import IconButton from '@mui/material/IconButton';
import { TextFieldProps } from '@mui/material/TextField';
import dayjs from 'locales/dayjs';

// ICONS
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export type DatePickerProps = Pick<TextFieldProps, 'size' | 'label' | 'name'> &
  // @ts-ignore
  Pick<
    MuiDatePickerProps<dayjs.Dayjs>,
    | 'value'
    | 'defaultValue'
    | 'onChange'
    | 'readOnly'
    | 'minDate'
    | 'maxDate'
    | 'views'
    | 'format'
    | 'shouldDisableYear'
    | 'shouldDisableDate'
    | 'shouldDisableMonth'
    | 'slotProps'
  > & {
    fullWidth?: boolean;
  };

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  ({ fullWidth, size = 'medium', label, slotProps, ...restProps }, ref) => {
    return (
      <MuiDatePicker
        ref={ref}
        slots={{ openPickerButton: IconButton, openPickerIcon: CalendarMonthIcon }}
        slotProps={{
          textField: { fullWidth, size, label },
          // @ts-ignore
          openPickerButton: { size, variant: 'contained', color: 'primary', shape: 'rounded' },
          ...slotProps,
        }}
        {...restProps}
      />
    );
  }
);

DatePicker.displayName = 'DatePicker';

export default DatePicker;

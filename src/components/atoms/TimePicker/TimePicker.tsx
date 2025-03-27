'use client';

import { forwardRef } from 'react';
import IconButton from '@mui/material/IconButton';
import { TextFieldProps } from '@mui/material/TextField';
import dayjs from 'locales/dayjs';
import { TimePicker as MUITimePicker, TimePickerProps as MuiTimePickerProps } from '@mui/x-date-pickers/TimePicker';

// ICONS
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export type TimePickerProps = Pick<TextFieldProps, 'size' | 'label' | 'name'> &
  // @ts-ignore
  Pick<MuiTimePickerProps<dayjs.Dayjs>> & {
    fullWidth?: boolean;
  };

const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
  ({ fullWidth, size = 'medium', label, slotProps, ...restProps }, ref) => {
    return (
      <MUITimePicker
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

TimePicker.displayName = 'TimePicker';

export default TimePicker;

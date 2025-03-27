'use client';

import {
  DateCalendar as MuiDateCalendar,
  DateCalendarProps as MuiDateCalendarProps,
} from '@mui/x-date-pickers/DateCalendar';

import dayjs from 'locales/dayjs';

export type DateCalendarProps = Pick<
  MuiDateCalendarProps<dayjs.Dayjs>,
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'readOnly'
  | 'minDate'
  | 'maxDate'
  | 'views'
  | 'shouldDisableDate'
  | 'shouldDisableMonth'
  | 'shouldDisableYear'
>;

const DateCalendar = ({ ...props }: DateCalendarProps) => <MuiDateCalendar {...props} />;

export default DateCalendar;

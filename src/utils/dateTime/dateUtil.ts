import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export const today = dayjs();

export const formatDate = (date?: string) => dayjs(date || undefined).format('YYYY-MM-DD');

export const getYear = (date?: string) => dayjs(date).format('YYYY');

export const getCurrentDateTime = () => dayjs().format('YYYY-MM-DD HH:mm:ss');

export const checkBetweenHour = (currentDate: Dayjs, startDate: Dayjs, endDate: Dayjs) =>
  currentDate.isBetween(startDate, endDate, 'hour', '[)');

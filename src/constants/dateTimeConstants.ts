import { SelectOption } from 'constants/elements';

export const DAY_OF_WEEK_OPTIONS: SelectOption[] = [
  { label: '월', value: 1 },
  { label: '화', value: 2 },
  { label: '수', value: 3 },
  { label: '목', value: 4 },
  { label: '금', value: 5 },
  { label: '토', value: 6 },
  { label: '일', value: 0 },
];

export const DAY_OF_WEEK_MAP: Record<number, string> = {
  1: '월',
  2: '화',
  3: '수',
  4: '목',
  5: '금',
  6: '토',
  0: '일',
};

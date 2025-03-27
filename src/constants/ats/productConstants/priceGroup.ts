import { BaseDto } from '../base';
import { ID } from '../_types';
import { ProductType } from './price';

export type PriceGroupDto<Server extends boolean = false> = {
  name: string;
  productType: ProductType;
  priority: number;
  dayOfWeek: number[] | null;
  startDate: string;
  endDate: string;
  description: string | null;
  cabanaIds?: ID[];
} & BaseDto<Server>;

export type PriceGroupBody = {
  name: string;
  productType: ProductType;
  priority: number; // priority >= 1
  dayOfWeek?: number[] | null;
  startDate: string;
  endDate: string;
  description?: string;
  cabanaIds?: ID[];
};

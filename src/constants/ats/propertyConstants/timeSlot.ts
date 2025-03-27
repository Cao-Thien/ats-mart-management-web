import { BaseDto } from '../base';
import { ProductType } from '../productConstants';

export type TimeSlotDto<Server extends boolean = false> = {
  name: string;
  naverName: string | null;
  productType: ProductType;
  printerNumber: number | null;
  startTime: string;
  endTime: string;
  appliedStartDate: string | null;
  appliedEndDate: string | null;
  description: string | null;
  printedName?: string;
  veryDayBookableLimitTime: string;
} & BaseDto<Server>;

export type TimeSlotBody = {
  name: string;
  naverName?: string;
  productType: ProductType;
  printerNumber?: number;
  startTime: string;
  endTime: string;
  appliedStartDate?: string;
  appliedEndDate?: string;
  description?: string;
  clientId?: string | number;
  printedName?: string;
  veryDayBookableLimitTime?: string;
};

import { BaseDto } from '../base';
import { ID } from '../_types';
import { TimeSlotDto, AgeRangeDto, CabanaSizeDto } from '../propertyConstants';
import { PriceGroupDto } from './priceGroup';

export enum ProductType {
  Unclassified = 'UNCLASSIFIED',
  AdmissionTicket = 'ADMISSION-TICKET',
  Cabana = 'CABANA',
}

export type PriceDto<Server extends boolean = false> = {
  name: string | null;
  productType: ProductType;
  amount: number;
  priority: number;
  isDefault: boolean;
  // associations
  groupId: ID | null;
  group?: PriceGroupDto<Server>;
  timeSlotId: ID | null;
  timeSlot?: TimeSlotDto<Server>;
  ageRangeId: ID | null;
  ageRange?: AgeRangeDto<Server>;
  cabanaSizeId: ID | null;
  cabanaSize?: CabanaSizeDto<Server>;
  //field for ticket data
  price?: number | null;
} & BaseDto<Server>;

export type TicketPriceBody = {
  amount: number;
  isDefault: boolean;
  priority?: number; // 0 is default
  groupId?: ID;
  timeSlotId: ID;
  ageRangeId: ID;
};

export type CabanaPriceBody = {
  amount: number;
  isDefault: boolean;
  priority?: number; // 0 is default
  groupId?: ID;
  timeSlotId: ID;
  cabanaSizeId: ID;
};

import { BaseDto } from '../base';
import { ProductStatus } from '../productConstants/baseProduct';

export type MiscellaneousItemDto<Server extends boolean = false> = {
  name: string;
  price: number;
  description: string | null;
  registrationName: string | null;
  productId: string | null;
  status?: ProductStatus | null;
} & BaseDto<Server>;

export type MiscellaneousItemBody = {
  name: string;
  price: number;
  description?: string;
  registrationName: string;
  status?: ProductStatus;
};

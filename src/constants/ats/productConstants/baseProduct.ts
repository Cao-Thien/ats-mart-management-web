import { BaseDto } from '../base';
import { ID } from '../_types';

export enum ProductStatus {
  Normal = 'NORMAL',
  Disable = 'DISABLE',
  Hide = 'HIDE',
}

export type BaseProductDto<Server extends boolean = false> = {
  name: string;
  price: number;
  image: string | null;
  description: string | null;
  registrationName: string | null;
  saleStartDate: string | null;
  saleEndDate: string | null;
  productId: ID | null;
} & BaseDto<Server>;

export type BaseProductBody = {
  name: string;
  price: number;
  image: string;
  description?: string;
  registrationName: string;
  saleStartDate?: string | null;
  saleEndDate?: string | null;
  imageUploadId: ID;
};

import { ID } from 'constants/types';
import { BaseProductBody, BaseProductDto, ProductStatus } from './baseProduct';
import { MartProductCategoryDto } from './martProductCategory';

export enum MartProductType {
  MartProduct = 'MART-PRODUCT',
  RentalItem = 'RENTAL-ITEM',
}

export type MartProductDto<Server extends boolean = false> = {
  quantity: number;
  barcode: string | null;
  purchasePrice: number;
  clientId?: number | string;
  type: MartProductType;
  brandName?: string | null;
  category: MartProductCategoryDto<Server>;
  vendor?: string | null;
  isScaleProduct: boolean;
  status?: ProductStatus;
} & BaseProductDto<Server>;

export type AdminMartProductDto<Server extends boolean = false> = {
  quantity: number;
  barcode: string | null;
  purchasePrice: number;
  clientId?: number | string;
  taxFree: boolean;
  type: MartProductType;
  brandName?: string | null;
  category: MartProductCategoryDto<Server>;
  vendor?: string | null;
  isScaleProduct: boolean;
  status?: ProductStatus;
} & BaseProductDto<Server>;

export type MartProductBody = {
  quantity: number;
  barcode: string;
  taxFree: boolean;
  purchasePrice: number;
  clientId?: number | string;
  type: MartProductType;
  categoryId?: ID;
  brandName?: string;
  vendor?: string;
  isScaleProduct: boolean;
  status?: ProductStatus;
} & BaseProductBody;

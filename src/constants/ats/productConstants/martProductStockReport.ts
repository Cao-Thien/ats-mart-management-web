import type { ID } from '../_types';
import type { BaseDto } from '../base';
import type { AdminMartProductDto } from './martProduct';

export enum MartProductStockReportStatus {
  Active = 'ACTIVE',
  Cancel = 'CANCEL',
}
export type MartProductStockReportDto<Server extends boolean = false> = {
  /** Barcode to scan */
  quantityBefore: number;
  quantityAfter: number;
  quantityStocked: number;
  stockDate: string;
  status: MartProductStockReportStatus;

  // ASSOCIATIONS
  productId: ID;
  product?: AdminMartProductDto<Server>;
} & BaseDto<Server>;

export type MartProductStockReportBody = {
  quantityBefore?: number;
  quantityAfter?: number;
  quantityStocked: number;
  stockDate: string;
  status?: MartProductStockReportStatus;
  productId?: ID;
};

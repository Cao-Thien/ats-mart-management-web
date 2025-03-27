import { BaseDto } from '../base';
import { ID } from '../_types';

export enum DiscountMethod {
  /**
   * Discount by fixed amount
   */
  FixedAmount = 'FIXED-AMOUNT',

  /**
   * Discount by percentage of price
   */
  Percentage = 'PERCENTAGE',
}

export enum DiscountStatus {
  /**
   * ATS has issued Discount Code but it is not delivered to anyone nor exported to excel file
   */
  Issued = 'ISSUED',

  /**
   * The Discount Code is delivered to a customer by ATS or it is exported to excel file
   */
  Distributed = 'DISTRIBUTED',

  /**
   * The customer has used the Discount Code.
   * ATS must not accept the Discount Code again unless the Discount Code is multi-use type.
   */
  Used = 'USED',

  /**
   * The Discount Code is out of date
   */
  Expired = 'EXPIRED',

  /**
   * The Discount Code is Canceled
   */
  Cancelled = 'CANCELLED',
}

export enum DiscountProductType {
  AdmissionTicket = 'ADMISSION-TICKET',
  Cabana = 'CABANA',
  Restaurant = 'RESTAURANT', // FOOD COURT
  FoodCourt = 'FOOD-COURT', // F AND B
  RentalItem = 'RENTAL-ITEM',
  MartProduct = 'MART-PRODUCT',
}

export enum DiscountUsageType {
  /**
   * Use one time
   */
  SingleUse = 'SINGLE-USE',

  /**
   * Can use multiple times
   */
  MultiUse = 'MULTI-USE',
}

export enum DiscountDistributionType {
  Normal = 'NORMAL',
  Excel = 'EXCEL',
}

export const DiscountDistributionTypeLabel = {
  [DiscountDistributionType.Normal]: 'ATS',
  [DiscountDistributionType.Excel]: '엑셀',
};

export type DiscountProduct = {
  timeSlotIds: ID[] | true;
  cabanaSizeIds: ID[] | true;
  ageRangeIds: ID[] | true;
  productIds: ID[] | true;
};
// | {
//     timeSlotId: ID;
//     cabanaSizeId: ID;
//   }
// | {
//     timeSlotId: ID;
//     ageRangeId: ID;
//   }
// | {
//     productId: ID;
//   };

export type DiscountDto<Server extends boolean = false> = {
  /**
   * Voucher Code
   */
  code: string;

  /**
   * Product type which the Discount Code is applicable
   * Null is for all products
   */
  productType: DiscountProductType | null;

  discountMethod: DiscountMethod;

  discountPercentage: number | null;

  discountFixedAmount: number | null;

  issuedDate: string;

  expiryDate: string;

  usageType: DiscountUsageType;

  /**
   * @default {@link DiscountDistributionType.Normal}
   */
  distributionType: DiscountDistributionType;

  /**
   * Status of the Discount Code
   */
  status: DiscountStatus;

  /**
   * Product IDs which the Discount Code is applicable.
   * Product ID will depend on the Product Type to get the product list.
   * Null is for all products in the Product Type
   */
  products: DiscountProduct | null;
  customerName: string | null;
  customerPhone: string | null;
  notes: string | null;
} & BaseDto<Server>;

export type DiscountBody = {
  code: string;
  productType: DiscountProductType;
  discountMethod: DiscountMethod;
  // discountPercentage: number;
  discountAmount: number;
  issuedDate: string;
  expiryDate: string;
  usageType: DiscountUsageType;
  distributionType: DiscountDistributionType;
  status: DiscountStatus;
  products: DiscountProduct;
  quantity: number;
};

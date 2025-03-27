import DataModel from '../base/DataModel';

// CONSTANTS
import { Attributes, Obj } from 'constants/types';

// UTILS

//Parse Time
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import {
  MartProductStockReportBody,
  MartProductStockReportDto,
  MartProductStockReportStatus,
} from 'constants/ats/productConstants/martProductStockReport';
import { AdminMartProductDto } from './MartProduct';
import dayjs from 'dayjs';

dayjs.extend(utc);
dayjs.extend(timezone);

class MartProductStock extends DataModel<MartProductStock> {
  quantityBefore?: number = undefined;

  quantityAfter?: number = undefined;

  quantityStocked?: number = undefined;

  stockDate?: string = undefined;

  status?: MartProductStockReportStatus = undefined;

  productId?: number = undefined;

  product?: AdminMartProductDto = undefined;

  constructor(obj?: Obj, loadDataMethod?: 'fromResDto') {
    super();

    if (obj) {
      if (loadDataMethod === 'fromResDto') {
        this.fromResDto(obj as MartProductStockReportDto);
      } else {
        this.init(obj);
      }
    }
  }

  static fields = {
    quantityBefore: 'quantityBefore',
    quantityAfter: 'quantityAfter',
    quantityStocked: 'quantityStocked',
    stockDate: 'stockDate',
    status: 'status',
    productId: 'productId',
    name: 'name',
    registrationName: 'registrationName',
    product: 'product',

    //Field to display in BarCode
    productName: 'productName',
    productIdDisplay: 'productIdDisplay',
    barCodeDisplay: 'barCodeDisplay',

    //Field ProductId Search
    productIdSearch: 'productIdSearch',
  };

  fromResDto(dto: MartProductStockReportDto): this {
    this._fromBaseResDto(dto);
    this._assignFromObject(dto, {
      quantityBefore: 'quantityBefore',

      quantityAfter: 'quantityAfter',

      quantityStocked: 'quantityStocked',

      stockDate: 'stockDate',

      status: 'status',

      productId: 'productId',

      product: 'product',
    });
    this.stockDate = this.stockDate ? this.formatDate(this.stockDate) : '';

    return this;
  }

  toReqBody(): MartProductStockReportBody {
    return {
      productId: this.productId,
      quantityStocked: this.quantityStocked!,
      stockDate: this.stockDate ? this.formatDate(this.stockDate) : '',
    };
  }

  private formatDate(value: string) {
    return dayjs.utc(value).format('YYYY-MM-DD HH:mm:ss');
  }

  // New for list of items
  static many(attrsList: MartProductStockAttrs[]): MartProductStock[] {
    return attrsList.map(attrs => new MartProductStock(attrs));
  }
}

export type { MartProductStockReportDto };

export type MartProductStockAttrs = Attributes<MartProductStock>; //Only property in Class , not instance

export default MartProductStock;

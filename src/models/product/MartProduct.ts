import DataModel from '../base/DataModel';

// CONSTANTS
import { Attributes, ID, Obj } from 'constants/types';
import { AdminMartProductDto, MartProductBody, MartProductDto } from 'constants/ats/productConstants/martProduct';

// UTILS
import { formatDate } from 'utils/dateTime/dateUtil';
import { MartProductType } from 'actions/martProductActions';
import { MartProductCategoryDto } from 'constants/ats/productConstants';
import { ProductStatus } from 'constants/ats/productConstants/baseProduct';

class MartProduct extends DataModel<MartProduct> {
  name?: string = undefined;

  registrationName?: string = undefined;

  saleStartDate?: string = undefined;

  saleEndDate?: string = undefined;

  price?: number = undefined;

  category?: MartProductCategoryDto = undefined;

  image?: string = undefined;

  description?: string = undefined;

  barcode?: string = undefined;

  quantity?: number = undefined;

  purchasePrice?: number = undefined;

  imageUploadId?: ID = undefined;

  type?: MartProductType = undefined;

  productId?: ID = undefined;

  categoryId?: ID = undefined;

  taxFree?: boolean = undefined;

  isScaleProduct?: boolean = undefined;

  status?: ProductStatus = undefined;

  constructor(obj?: Obj, loadDataMethod?: 'fromResDto') {
    super();

    if (obj) {
      if (loadDataMethod === 'fromResDto') {
        this.fromResDto(obj as AdminMartProductDto);
      } else {
        this.init(obj);
      }
    }
  }

  static fields = {
    name: 'name',
    registrationName: 'registrationName',
    saleStartDate: 'saleStartDate',
    saleEndDate: 'saleEndDate',
    price: 'price',
    category: 'category',
    image: 'image',
    description: 'description',
    barcode: 'barcode',
    quantity: 'quantity',
    purchasePrice: 'purchasePrice',
    imageUploadId: 'imageUploadId',
    type: 'type',
    productId: 'productId',
    categoryId: 'categoryId',
    taxFree: 'taxFree',
    scaleProduct: 'isScaleProduct',
  };

  get salePeriod() {
    if (!this.saleStartDate && !this.saleEndDate) {
      return null;
    }

    const endDate = this.saleEndDate ? formatDate(this.saleEndDate) : 'Infinity';

    return `${formatDate(this.saleStartDate)} ~ ${endDate}`;
  }

  get categoryName() {
    return this.category?.name;
  }

  get taxFreeLabel() {
    return this.taxFree ? '비과세' : '과세';
  }

  get scaleProductLabel() {
    return this.isScaleProduct ? 'SCALE' : 'NON-SCALE';
  }

  fromResDto(dto: AdminMartProductDto): this {
    this._fromBaseResDto(dto);

    this._assignFromObject(dto, {
      name: 'name',
      registrationName: 'registrationName',
      price: 'price',
      purchasePrice: 'purchasePrice',
      saleStartDate: 'saleStartDate',
      saleEndDate: 'saleEndDate',
      category: 'category',
      image: 'image',
      description: 'description',
      barcode: 'barcode',
      quantity: 'quantity',
      // imageUploadId: 'imageUploadId',
      productId: 'productId',
      taxFree: 'taxFree',
      isScaleProduct: 'isScaleProduct',
      status: 'status',
      // categoryId: 'categoryId',
    });

    this.categoryId = this.category?.id;
    this.saleEndDate = this.saleEndDate && formatDate(this.saleEndDate);
    this.saleStartDate = this.saleStartDate && formatDate(this.saleStartDate);

    return this;
  }

  toReqBody(): MartProductBody {
    return {
      name: this.name!,
      price: this.price || 0,
      categoryId: this.categoryId!,
      image: this.image!,
      description: this.description!,
      barcode: this.barcode!,
      quantity: this.quantity || 0,
      registrationName: this.registrationName!,
      purchasePrice: this.purchasePrice || 0,
      imageUploadId: this.imageUploadId!,
      type: this.type!,
      saleStartDate: this.saleStartDate ? formatDate(this.saleStartDate) : null,
      saleEndDate: this.saleEndDate ? formatDate(this.saleEndDate) : null,
      taxFree: this.taxFree ?? false,
      isScaleProduct: this.isScaleProduct ?? false,
      status: this.status!,
    };
  }

  // New for list of items
  static many(attrsList: MartProductAttrs[]): MartProduct[] {
    return attrsList.map(attrs => new MartProduct(attrs));
  }
}

export type { MartProductDto, AdminMartProductDto };

export type MartProductAttrs = Attributes<MartProduct>;

export default MartProduct;

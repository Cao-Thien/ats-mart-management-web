// MODELS
import MartProduct, { MartProductDto } from 'models/product/MartProduct';

// UTILS
import createFetchApi from './utils/createFetchApi';

// CONSTANTS
import { GetListResponse } from 'constants/ats/response';
import { env } from 'constants/env';
import { MartProductBody } from 'constants/ats/productConstants/martProduct';
import { ID, Obj } from 'constants/types';

const propertyApi = createFetchApi({
  baseUrl: `${env.TICKET_SERVER_URL}/products`,
});

export enum MartProductType {
  MartProduct = 'MART-PRODUCT',
  RentalItem = 'RENTAL-ITEM',
}

export const fetchMartProductList = async (
  type: MartProductType,
  categoryId?: ID,
  taxFree?: number,
  barCode?: string | number,
  productId?: ID
) => {
  const { data, meta } = await propertyApi.get<GetListResponse<MartProductDto>>(`/${type.toLocaleLowerCase()}`, {
    query: {
      categoryId,
      taxFree,
      barcode: barCode,
      id: productId,
    },
  });

  return {
    list: (data || []).map(payload => new MartProduct(payload, 'fromResDto')),
    meta,
  };
};

export const createMartProduct = async (payload: MartProductBody) => {
  const { data } = await propertyApi.post<GetListResponse<MartProductDto>>('/mart-products', payload);

  return data;
};

export const updateMartProduct = async (id: ID, payload: Partial<MartProductBody>) => {
  const { data } = await propertyApi.patch<GetListResponse<MartProductDto>>(`/mart-products/${id}`, payload);

  return data;
};

export const batchMartProduct = async (
  action: 'create' | 'update' | 'delete',
  payload: (ID | MartProductBody)[] | Obj
) => {
  const { data } = await propertyApi.post<GetListResponse<MartProductDto>>('/mart-products/batch', {
    [action]: payload,
  });

  return data;
};

// MODELS
import MartProductStock, { MartProductStockReportDto } from 'models/product/MartProductStockReport';

// UTILS
import createFetchApi from './utils/createFetchApi';

// CONSTANTS
import { AppResponse, GetDetailResponse, GetListResponse } from 'constants/ats/response';
import { env } from 'constants/env';
import { ID } from 'constants/types';

const martStockApi = createFetchApi({
  baseUrl: `${env.TICKET_SERVER_URL}/mart`,
});

export const fetchMartStockProducts = async (productName?: string) => {
  const { data, meta } = await martStockApi.get<GetListResponse<MartProductStockReportDto>>(`/product-stocks`, {
    query: {
      productName,
    },
  });

  return {
    list: (data || []).map(payload => new MartProductStock(payload, 'fromResDto')),
    meta,
  };
};

export const fetchMartStockProductById = async (id: ID) => {
  const { data } = await martStockApi.get<GetDetailResponse<MartProductStockReportDto>>(`/product-stocks/${id}`);

  return new MartProductStock(data, 'fromResDto');
};

export const createMartStockProduct = async (payload: Partial<MartProductStockReportDto>) => {
  const { data } = await martStockApi.post<GetListResponse<MartProductStockReportDto>>(`/product-stocks`, payload);

  return data;
};

export const updateMartStockProduct = async (id: ID, payload: Partial<MartProductStockReportDto>) => {
  const { data } = await martStockApi.patch<GetListResponse<MartProductStockReportDto>>(
    `/product-stocks/${id}`,
    payload
  );

  return data;
};

export const deleteMartStockProduct = async (id: ID) => {
  const { data } = await martStockApi.delete<AppResponse<MartProductStockReportDto>>(`/product-stocks/${id}`);

  return data;
};

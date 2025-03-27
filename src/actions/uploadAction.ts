// MODELS

// UTILS
import createFetchApi from './utils/createFetchApi';

// CONSTANTS
import { GetListResponse } from 'constants/ats/response';
import { env } from 'constants/env';
import { ID } from 'constants/types';

export enum ResourceType {
  MartProduct = 'MartProduct',
  FoodItem = 'FoodItem',
}

const propertyApi = createFetchApi({
  baseUrl: `${env.TICKET_SERVER_URL}/upload`,
});

type UploadResponse = {
  id: ID;
  filename: string;
  mimetype: string;
  size: number;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
};

export const uploadFile = async (formData: FormData) => {
  const { data } = await propertyApi.upload<GetListResponse<UploadResponse>>('', formData);

  return data ? data[0] : null;
};

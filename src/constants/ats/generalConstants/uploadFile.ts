import { BaseDto } from '../base';

export enum UploadResourceType {
  MartProduct = 'MartProduct',
  FoodItem = 'FoodItem',
}

export enum UploadFileStatus {
  Pending = 'PENDING', // uploaded to temporary location
  Active = 'ACTIVE', // copied to permanent location and assign to a resource
  Inactive = 'INACTIVE', // inactive, can restore
  Unavailable = 'UNAVAILABLE', // url unavailable for any reason
  Deleted = 'DELETED', // deleted permanent files
  Expired = 'EXPIRED', // deleted temporary files
}

export type UploadFileDto<Server extends boolean = false> = {
  filename: string;
  mimetype: string;
  size: number;
  fileUrl: string | null;
  status: UploadFileStatus;
} & Omit<BaseDto<Server>, 'deletedAt'>;

export type UploadFileBody<Server extends boolean = false> = {
  resourceType: UploadResourceType;
} & Omit<BaseDto<Server>, 'deletedAt'>;

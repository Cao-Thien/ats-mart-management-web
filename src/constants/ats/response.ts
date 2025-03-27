import { Any, Obj, ID } from './_types';

// Copy from 'constants/request'
// todo: set bit dependent by colorverse.shared/constants/request

/**
 * RESPONSE STATUS
 */
export enum SuccessStatus {
  Ok = 'OK',
}

export enum WarningStatus {
  ResourceNotEnough = 'OK_WARNING_RESOURCE_NOT_ENOUGH',
  ResourceIdNotMatch = 'OK_WARNING_RESOURCE_ID_NOT_MATCH',
}

// Common errors
export enum ErrorStatus {
  // System errors
  PathNotFound404 = 'ERROR_PATH_NOT_FOUND',
  ServerError500 = 'ERROR_INTERNAL_SERVER_ERROR',
  DatabaseError500 = 'ERROR_DATABASE_ERROR',

  // Client errors
  BadRequest400 = 'ERROR_BAD_REQUEST',
  Unauthorized401 = 'ERROR_UNAUTHORIZED',
  Forbidden403 = 'ERROR_FORBIDDEN',
  NotFound404 = 'ERROR_RESOURCE_NOT_FOUND',
  Conflict409 = 'ERROR_CONFLICT',
  DatabaseConflict409 = 'ERROR_DATABASE_CONFLICT',
  UniqueConflict409 = 'ERROR_UNIQUE_CONFLICT',
  AuthorizationConflict409 = 'ERROR_AUTHORIZATION_CONFLICT',
  ValidationFailed422 = 'ERROR_VALIDATION_FAILED',
  CreateFail = 'ERROR_CREATE_FAIL',
  UpdateFail = 'ERROR_UPDATE_FAIL',
  DeleteFail = 'ERROR_DELETE_FAIL',
}

/**
 * RESPONSE PAYLOADS
 */
export type AppResponse<Data = Any, ExtraData extends Obj = never> = {
  status: SuccessStatus | WarningStatus;
  message?: string;
  data: Data;
  extra?: ExtraData;
};

export type ErrorResponse<Status extends ErrorStatus | string = ErrorStatus, Error = Obj> = {
  status: Status;
  message: string;
  errors?: Error[];
  debug?: Any;
};

export type ResponseMeta = {
  count: number;
  pageSize?: number;
  currentPage?: number;
  totalPages?: number;
};

export type GetListResponse<Data = Any, ExtraData extends Obj = never> = AppResponse<Data[], ExtraData> & {
  meta: ResponseMeta;
};

export type GetDetailResponse<Data = Any, ExtraData extends Obj = never> = AppResponse<Data, ExtraData>;

export type BatchCRUDBody<BodyData> = {
  create?: Omit<BodyData, 'id'>[];
  update?: Record<ID, Partial<Omit<BodyData, 'id'>>>;
  delete?: ID[];
};

export type BatchCRUDResponse<Data> = AppResponse<{
  created?: Data[];
  updated?: Data[];
  deleted?: ID[];
}>;

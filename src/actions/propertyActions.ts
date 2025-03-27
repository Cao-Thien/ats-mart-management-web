// MODELS
import TimeSlot, { TimeSlotDto, TimeSlotBody } from 'models/property/TimeSlot';
import AgeRange, { AgeRangeDto } from 'models/property/AgeRange';
import CabanaSize, { CabanaSizeDto } from 'models/property/CabanaSize';

// UTILS
import createFetchApi from './utils/createFetchApi';

// CONSTANTS
import { GetListResponse, BatchCRUDResponse, AppResponse } from 'constants/ats/response';
import { env } from 'constants/env';
import { ID } from 'constants/types';
import { BatchCRUDProcessParams } from 'constants/actionConstants';
import { ProductType } from 'constants/ats/productConstants';

const propertyApi = createFetchApi({
  baseUrl: `${env.TICKET_SERVER_URL}/properties`,
});

/**
 * TIME SLOT
 */
type TimeSlotListParams = {
  productType: ProductType;
  availableByDate?: string;
};

export const fetchTimeSlotList = async ({ productType, ...restParams }: TimeSlotListParams) => {
  const { data, meta } = await propertyApi.get<GetListResponse<TimeSlotDto>>(`/time-slots`, {
    query: { productType, ...restParams },
  });

  return {
    list: (data || []).map(payload => new TimeSlot(payload, 'fromResDto')),
    meta,
  };
};

export const updateTimeSlot = async (timeSlot: TimeSlot) => {
  const { data } = await propertyApi.patch<AppResponse<TimeSlotDto>>(
    `/time-slots/${timeSlot.id}`,
    timeSlot.toReqBody(true)
  );

  return {
    item: new TimeSlot(data, 'fromResDto'),
  };
};

export const batchCRUDProcessTimeSlots = async ({
  create: creatingItems,
  update: updatingItems,
  delete: deletingIds,
}: BatchCRUDProcessParams<TimeSlot>) => {
  const { data, status, message } = await propertyApi.post<BatchCRUDResponse<TimeSlotDto>>('/time-slots/batch', {
    create: creatingItems?.map(item => item.toReqBody()),
    update: updatingItems
      ?.filter(item => item.hasChanged)
      ?.reduce(
        (acc, item) => {
          acc[item.id] = item.toReqBody(true);
          return acc;
        },
        {} as Record<ID, Partial<TimeSlotBody>>
      ),
    delete: deletingIds,
  });

  if (status.startsWith('ERROR')) {
    throw new Error(`Time slots batch update failed: ${message}`);
  }

  return {
    created: data?.created?.map(payload => new TimeSlot(payload, 'fromResDto')),
    updated: data?.updated?.map(payload => new TimeSlot(payload, 'fromResDto')),
    deleted: data?.deleted,
  };
};

/**
 * AGE RANGE
 */
type AgeRangeListParams = {
  noPublic?: boolean;
};

export const fetchAgeRangeList = async (params?: AgeRangeListParams) => {
  const { data, meta } = await propertyApi.get<GetListResponse<AgeRangeDto>>('/age-ranges', {
    query: params,
  });

  return {
    list: (data || []).map(payload => new AgeRange(payload, 'fromResDto')),
    meta,
  };
};

export const updateAgeRange = async (ageRange: AgeRange) => {
  const { data } = await propertyApi.patch<AppResponse<AgeRangeDto>>(
    `/age-ranges/${ageRange.id}`,
    ageRange.toReqBody(true)
  );

  return {
    item: new AgeRange(data, 'fromResDto'),
  };
};

export const batchCRUDProcessAgeRanges = async ({
  create: creatingItems,
  update: updatingItems,
  delete: deletingIds,
}: BatchCRUDProcessParams<AgeRange>) => {
  const { data, status, message } = await propertyApi.post<BatchCRUDResponse<AgeRangeDto>>('/age-ranges/batch', {
    create: creatingItems?.map(item => item.toReqBody()),
    update: updatingItems
      ?.filter(item => item.hasChanged)
      ?.reduce(
        (acc, item) => {
          acc[item.id] = item.toReqBody(true);
          return acc;
        },
        {} as Record<ID, Partial<AgeRangeDto>>
      ),
    delete: deletingIds,
  });

  if (status.startsWith('ERROR')) {
    throw new Error(`Age ranges batch update failed: ${message}`);
  }

  return {
    created: data?.created?.map(payload => new AgeRange(payload, 'fromResDto')),
    updated: data?.updated?.map(payload => new AgeRange(payload, 'fromResDto')),
    deleted: data?.deleted,
  };
};

/**
 * CABANA SIZES
 */

export const fetchCabanaSizeList = async () => {
  const { data, meta } = await propertyApi.get<GetListResponse<CabanaSize>>('/cabana-sizes');

  return {
    list: (data || []).map(payload => new CabanaSize(payload, 'fromResDto')),
    meta,
  };
};

export const batchCRUDProcessCabanaSizes = async ({
  create: creatingItems,
  update: updatingItems,
  delete: deletingIds,
}: BatchCRUDProcessParams<CabanaSize>) => {
  const { data, status, message } = await propertyApi.post<BatchCRUDResponse<CabanaSizeDto>>('/cabana-sizes/batch', {
    create: creatingItems?.map(item => item.toReqBody()),
    update: updatingItems
      ?.filter(item => item.hasChanged)
      ?.reduce(
        (acc, item) => {
          acc[item.id] = item.toReqBody(true);
          return acc;
        },
        {} as Record<ID, Partial<CabanaSizeDto>>
      ),
    delete: deletingIds,
  });

  if (status.startsWith('ERROR')) {
    throw new Error(`Cabana size batch update failed: ${message}`);
  }

  return {
    created: data?.created?.map(payload => new CabanaSize().fromResDto(payload)),
    updated: data?.updated?.map(payload => new CabanaSize().fromResDto(payload)),
    deleted: data?.deleted,
  };
};

import DataModel from '../base/DataModel';

// CONSTANTS
import { Obj, ID } from 'constants/types';

type CabanaOccupanciesDto = {
  id?: ID;
  cabanaId?: ID;
  cabanaItemId?: ID;
  endTime?: Date | string;
  startTime?: Date | string;
  status: CabanaOccupanciesStatus;
};

export type CabanaOccupanciesBody = {
  cabanaItemId: ID;
  date: Date | string;
  status: CabanaOccupanciesStatus;
};

export enum CabanaOccupanciesStatus {
  CheckedIn = 'CHECKED-IN',
  Reserved = 'RESERVED',
  InCart = 'IN-CART',
}

class CabanaOccupancy extends DataModel<CabanaOccupancy> {
  cabanaItemId?: ID = undefined;

  cabanaId?: ID = undefined;

  startTime?: Date | string = undefined;

  endTime?: Date | string = undefined;

  status?: CabanaOccupanciesStatus = undefined;

  constructor(obj?: Obj, loadDataMethod?: 'fromResDto') {
    super();

    if (obj) {
      if (loadDataMethod === 'fromResDto') {
        this.fromResDto(obj as CabanaOccupanciesDto);
      } else {
        this.init(obj);
      }
    }
  }

  fromResDto(dto: CabanaOccupanciesDto): this {
    this._fromBaseResDto(dto);

    this._assignFromObject(dto, {
      cabanaItemId: 'cabanaItemId',
      cabanaId: 'cabanaId',
      startTime: 'startTime',
      endTime: 'endTime',
      status: 'status',
    });

    return this;
  }
}

export type { CabanaOccupanciesDto };

export default CabanaOccupancy;

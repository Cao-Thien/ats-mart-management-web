import { pick } from 'lodash';
import DataModel from '../base/DataModel';

// CONSTANTS
import { TimeSlotDto, TimeSlotBody } from 'constants/ats/propertyConstants';
import { Attributes, ConstructorAttributes } from 'constants/types';
import { ProductType } from 'constants/ats/productConstants';

class TimeSlot extends DataModel<TimeSlot> {
  name?: string = undefined;

  naverName?: string | null = undefined;

  productType?: ProductType = undefined;

  startTime?: string = undefined;

  endTime?: string = undefined;

  appliedStartDate?: string | null = undefined;

  appliedEndDate?: string | null = undefined;

  description?: string | null = undefined;

  printedName?: string = undefined;

  veryDayBookableLimitTime?: string = undefined;

  constructor(obj?: ConstructorAttributes<TimeSlot>, loadDataMethod?: 'fromResDto') {
    super();

    if (obj) {
      if (loadDataMethod === 'fromResDto') {
        this.fromResDto(obj as TimeSlotDto);
      } else {
        this.init(obj);
      }
    }
  }

  get nameDisplay() {
    return `${this.name} (${this.startTime?.slice(0, -3)} - ${this.endTime?.slice(0, -3)})`;
  }

  fromResDto(dto: TimeSlotDto): this {
    this._fromBaseResDto(dto);

    this._assignFromObject(dto, {
      name: 'name',
      naverName: 'naverName',
      productType: 'productType',
      startTime: 'startTime',
      endTime: 'endTime',
      appliedStartDate: 'appliedStartDate',
      appliedEndDate: 'appliedEndDate',
      description: 'description',
      clientId: 'clientId',
      printedName: 'printedName',
      veryDayBookableLimitTime: 'veryDayBookableLimitTime',
    });

    return this;
  }

  toReqBody<Changed extends boolean | undefined>(
    changedOnly?: Changed
  ): Changed extends true ? Partial<TimeSlotBody> : TimeSlotBody {
    const body: TimeSlotBody = {
      name: this.name!,
      naverName: this.naverName!,
      productType: this.productType!,
      startTime: this.startTime!,
      endTime: this.endTime!,
      appliedStartDate: this.appliedStartDate!,
      appliedEndDate: this.appliedEndDate!,
      description: this.description!,
      clientId: this.clientId,
      printedName: this.printedName,
      veryDayBookableLimitTime: this.veryDayBookableLimitTime!,
    };

    if (changedOnly) {
      return pick(body, [...this.changedFields, 'clientId']) as Changed extends true
        ? Partial<TimeSlotBody>
        : TimeSlotBody;
    }

    return body;
  }

  // New for list of items
  static many(attrsList: TimeSlotAttrs[]): TimeSlot[] {
    return attrsList.map(attrs => new TimeSlot(attrs));
  }
}

export type TimeSlotAttrs = Attributes<TimeSlot>;

export type { TimeSlotDto, TimeSlotBody };

export { ProductType };

export default TimeSlot;

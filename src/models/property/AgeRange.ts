import { pick } from 'lodash';
import DataModel from '../base/DataModel';

// CONSTANTS
import { AgeRangeDto, AgeRangeBody } from 'constants/ats/propertyConstants';
import { Attributes, ConstructorAttributes } from 'constants/types';

class AgeRange extends DataModel<AgeRange> {
  name?: string = undefined;

  naverName?: string | null = undefined;

  fromAge?: number = undefined;

  toAge?: number = undefined;

  imageUrl?: string | null = undefined;

  appliedStartDate?: string | null = undefined;

  appliedEndDate?: string | null = undefined;

  description?: string | null = undefined;

  noPublic?: boolean | null = undefined;

  printedName?: string = undefined;

  constructor(obj?: ConstructorAttributes<AgeRange>, loadDataMethod?: 'fromResDto') {
    super();

    if (obj) {
      if (loadDataMethod === 'fromResDto') {
        this.fromResDto(obj as AgeRangeDto);
      } else {
        this.init(obj);
      }
    }
  }

  fromResDto(dto: AgeRangeDto): this {
    this._fromBaseResDto(dto);

    this._assignFromObject(dto, {
      name: 'name',
      naverName: 'naverName',
      fromAge: 'fromAge',
      toAge: 'toAge',
      imageUrl: 'imageUrl',
      appliedStartDate: 'appliedStartDate',
      appliedEndDate: 'appliedEndDate',
      description: 'description',
      clientId: 'clientId',
      noPublic: 'noPublic',
      printedName: 'printedName',
    });

    return this;
  }

  toReqBody(changedOnly?: boolean) {
    const body: AgeRangeBody = {
      name: this.name!,
      naverName: this.naverName!,
      fromAge: this.fromAge!,
      toAge: this.toAge!,
      // imageUrl: this.imageUrl,
      appliedStartDate: this.appliedStartDate!,
      appliedEndDate: this.appliedEndDate!,
      description: this.description!,
      clientId: this.clientId,
      noPublic: this.noPublic!,
      printedName: this.printedName,
    };

    if (changedOnly) {
      return pick(body, this.changedFields);
    }

    return body;
  }

  static many(attrsList: AgeRangeAttrs[]): AgeRange[] {
    return attrsList.map(attrs => new AgeRange(attrs));
  }
}

export type AgeRangeAttrs = Attributes<AgeRange>;

export type { AgeRangeDto, AgeRangeBody };

export default AgeRange;

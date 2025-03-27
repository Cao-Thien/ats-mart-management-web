import DataModel from '../base/DataModel';

// CONSTANTS
import { ConstructorAttributes, Attributes } from 'constants/types';
import { CabanaSizeBody, CabanaSizeDto } from 'constants/ats/propertyConstants';
import { pick } from 'lodash';
import { ID } from 'constants/ats/_types';

class CabanaSize extends DataModel<CabanaSize> {
  name?: string = undefined;

  color?: string | null = undefined;

  unavailableColor?: string | null = undefined;

  borderColor?: string | null = undefined;

  sizeRatio?: number = undefined;

  description?: string | null = undefined;

  parentId?: ID | null = undefined;

  childrenIds?: ID[] | null = undefined;

  children?: CabanaSize[] | null = undefined;

  constructor(obj?: ConstructorAttributes<CabanaSize>, loadDataMethod?: 'fromResDto') {
    super();

    if (obj) {
      if (loadDataMethod === 'fromResDto') {
        this.fromResDto(obj as CabanaSizeDto);
      } else {
        this.init(obj);
      }
    }
  }

  fromResDto(dto: CabanaSizeDto): this {
    this._fromBaseResDto(dto);

    this._assignFromObject(
      dto,
      {
        name: 'name',
        description: 'description',
        color: 'color',
        unavailableColor: 'unavailableColor',
        borderColor: 'borderColor',
        sizeRatio: 'sizeRatio',
        clientId: 'clientId',
        parentId: 'parentId',
        childrenIds: 'childrenIds',
        children: 'children',
      },
      {
        children: { type: 'array', transform: payload => new CabanaSize(payload, 'fromResDto') },
      }
    );

    return this;
  }

  toReqBody(changedOnly?: boolean) {
    const body: CabanaSizeBody = {
      name: this.name!,
      color: this.color!,
      unavailableColor: this.unavailableColor!,
      borderColor: this.borderColor!,
      sizeRatio: this.sizeRatio!,
      description: this.description!,
      clientId: this.clientId!,
    };

    if (changedOnly) {
      return pick(body, this.changedFields);
    }

    return body;
  }

  static many(attrsList: CabanaSizeAttrs[]): CabanaSize[] {
    return attrsList.map(attrs => new CabanaSize(attrs));
  }
}

export type CabanaSizeAttrs = Attributes<CabanaSize>;

export type { CabanaSizeDto, CabanaSizeBody };

export default CabanaSize;

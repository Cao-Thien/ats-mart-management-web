import DataModel from '../base/DataModel';

// CONSTANTS
import { CustomerDto, CustomerBody, Gender } from 'constants/ats/userConstants';
import { Attributes, ConstructorAttributes } from 'constants/types';

class Customer extends DataModel<Customer> {
  phone?: string = undefined;

  firstName?: string = undefined;

  gender?: Gender = undefined;

  email?: string = undefined;

  constructor(obj?: ConstructorAttributes<Customer>, loadDataMethod?: 'fromResDto') {
    super();

    if (obj) {
      if (loadDataMethod === 'fromResDto') {
        this.fromResDto(obj as CustomerDto);
      } else {
        this.init(obj);
      }
    }
  }

  fromResDto(dto: CustomerDto): this {
    this._fromBaseResDto(dto);

    this._assignFromObject(dto, {
      phone: 'phone',
      firstName: 'firstName',
      gender: 'gender',
    });

    return this;
  }

  toReqBody(): CustomerBody {
    return {
      phone: this.phone || '',
      firstName: this.firstName,
      gender: this.gender,
      email: this.email,
    };
  }
}

export type CustomerAttrs = Attributes<Customer>;

export type { CustomerDto };

export default Customer;

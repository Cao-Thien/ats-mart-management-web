import { ID } from '../_types';

export enum Gender {
  Male = 'M',
  Female = 'F',
}

export type JwtPayload = {
  staffAccountId?: ID;
  customerAccountId?: ID;
};

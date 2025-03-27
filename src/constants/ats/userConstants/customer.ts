import { Gender } from '.';
import { BaseDto } from '../base';

export type CustomerDto<Server extends boolean = false> = {
  phone: string;
  // email: string | null;
  firstName: string | null;
  lastName: string | null;
  gender: Gender | null;
  name: string | null;
} & BaseDto<Server>;

export type CustomerBody = {
  phone: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: Gender;
};

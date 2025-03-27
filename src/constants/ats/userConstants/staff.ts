import { Gender } from '.';
import { BaseDto } from '../base';

export type StaffDto<Server extends boolean = false> = {
  phone: string;
  firstName: string | null;
  username: string;
  lastName: string | null;
  gender: Gender | null;
  name: string | null;
} & BaseDto<Server>;

export type StaffBody = {
  username: string;
  newPassword: string;
  birthDay?: Date;
  phone?: string;
  firstName?: string;
  lastName?: string;
  gender?: Gender;
};

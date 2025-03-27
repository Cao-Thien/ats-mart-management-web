import { BaseDto } from '../base';

export type AdminDto<Server extends boolean = false> = {
  email: string;
  firstName: string | null;
  username: string;
  lastName: string | null;
  name: string | null;
} & BaseDto<Server>;

export type AdminBody = {
  username: string;
  email: string;
  newPassword: string;
  firstName?: string;
  lastName?: string;
};

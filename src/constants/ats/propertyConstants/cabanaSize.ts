import { BaseDto } from '../base';
import { ID } from '../_types';

export type CabanaSizeDto<Server extends boolean = false> = {
  name: string;
  color: string | null;
  unavailableColor: string | null;
  borderColor: string | null;
  sizeRatio: number;
  description: string | null;
  parentId: ID | null;
  childrenIds: ID[] | null;
  children?: CabanaSizeDto<Server>[] | null;
} & BaseDto<Server>;

export type CabanaSizeBody<IsNew extends boolean = false> = {
  name: string;
  color?: string;
  unavailableColor?: string;
  borderColor?: string;
  sizeRatio?: number;
  description?: string;
  clientId?: string | number;
} & (IsNew extends true ? { parentId?: ID } : NonNullable<unknown>);
